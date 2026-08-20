<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { BaseMaps, BMapViewer, PickTools } from '../src/sdk/index.js'
import CodeExampleEditor from './CodeExampleEditor.vue'
import { pickExamples } from './picks/index.js'

const HOME_CAMERA = {
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 7600,
  pitch: -56,
  minHeight: 40,
  maxHeight: 800000,
}

const publicRoot = new URL(import.meta.env.BASE_URL, window.location.href)
const tileUrl = new URL('tiles/{z}/{x}/{reverseY}.png', publicRoot).href
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const mapRef = ref(null)
const viewerReady = ref(false)
const isCodePanelOpen = ref(false)
const activeId = ref(pickExamples[0].id)
const code = ref(pickExamples[0].code)
const runState = ref('idle')
const runMessage = ref('等待 Cesium 初始化')
const resultText = ref('尚未返回坐标')

let viewer = null
let baseMap = null
let activeCleanup = null
let runVersion = 0
let resizeTimer = null

const activeExample = computed(() => pickExamples.find((item) => item.id === activeId.value) || pickExamples[0])
const isModified = computed(() => code.value !== activeExample.value.code)
const stateLabel = computed(() => ({
  idle: '等待初始化',
  running: '正在启动',
  active: '等待操作',
  done: '已返回坐标',
  error: '运行失败',
}[runState.value]))

function takeEntitySnapshot() {
  return new Set(viewer?.entities?.values || [])
}

function restoreCameraControls() {
  if (!viewer || viewer.isDestroyed()) return
  const controller = viewer.scene.screenSpaceCameraController
  controller.enableRotate = true
  controller.enableTranslate = true
  controller.enableZoom = true
  document.body.style.cursor = 'default'
}

async function disposeActive() {
  if (!activeCleanup) return
  const cleanup = activeCleanup
  activeCleanup = null
  try {
    await cleanup()
  } finally {
    restoreCameraControls()
  }
}

function handleResult(coordinates) {
  resultText.value = JSON.stringify(coordinates, null, 2)
  runState.value = 'done'
  const count = Array.isArray(coordinates?.[0]) ? coordinates.length : 1
  runMessage.value = `${activeExample.value.name} 已返回 ${count} 组坐标`
}

async function runCode() {
  if (!viewer || viewer.isDestroyed() || runState.value === 'running') return
  const currentRun = ++runVersion
  runState.value = 'running'
  runMessage.value = `正在启动 ${activeExample.value.name}`
  resultText.value = '等待地图操作…'

  await disposeActive()
  if (currentRun !== runVersion) return

  mapRef.value?.flyTo(HOME_CAMERA, 0)
  const entitySnapshot = takeEntitySnapshot()

  try {
    const execute = new AsyncFunction(
      'PickTools',
      'viewer',
      'onResult',
      `'use strict';\n${code.value}`,
    )
    const result = await execute(PickTools, viewer, handleResult)
    const cleanup = async () => {
      if (typeof result === 'function') {
        await result()
      } else if (typeof result?.destroy === 'function') {
        result.destroy()
      }

      if (!viewer || viewer.isDestroyed()) return
      viewer.entities.values
        .filter((entity) => !entitySnapshot.has(entity))
        .forEach((entity) => viewer.entities.remove(entity))
    }

    if (currentRun !== runVersion) {
      await cleanup()
      return
    }

    activeCleanup = cleanup
    runState.value = 'active'
    runMessage.value = activeExample.value.instruction
  } catch (error) {
    restoreCameraControls()
    runState.value = 'error'
    runMessage.value = error?.message || String(error)
    console.error('PickTools 示例运行失败：', error)
  }
}

async function selectExample(example) {
  if (activeId.value === example.id) return
  runVersion += 1
  await disposeActive()
  activeId.value = example.id
  code.value = example.code
  resultText.value = '尚未返回坐标'
  runState.value = 'idle'
  await nextTick()
  runCode()
}

function resetCode() {
  code.value = activeExample.value.code
}

async function handleViewerReady(readyViewer) {
  viewer = readyViewer
  viewerReady.value = true
  baseMap = new BaseMaps.BaseMap(viewer, {
    type: 'offline',
    url: tileUrl,
    coordinateSystem: 'GCJ02',
    minimumLevel: 1,
    maximumLevel: 12,
    themeColor: '#34A4FF',
  })
  runMessage.value = '离线瓦片已就绪'
  await nextTick()
  runCode()
}

function handleMapError(error) {
  runState.value = 'error'
  runMessage.value = error?.message || 'Cesium 初始化失败'
}

async function toggleCodePanel() {
  isCodePanelOpen.value = !isCodePanelOpen.value
  await nextTick()
  viewer?.resize()
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => viewer?.resize(), 460)
}

onBeforeUnmount(() => {
  clearTimeout(resizeTimer)
  runVersion += 1
  disposeActive()
  baseMap?.destroy()
  baseMap = null
  viewer = null
})
</script>

<template>
  <div class="pick-lab">
    <header class="lab-header">
      <div class="brand-block">
        <div class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></div>
        <div>
          <div class="brand-line"><strong>PickTools</strong><span class="edition">INTERACTION LAB</span></div>
          <p>Cesium 鼠标拾取与几何绘制工作台</p>
        </div>
      </div>
      <div class="header-metrics" aria-label="运行状态">
        <div><span>拾取模式</span><strong>{{ pickExamples.length }}/{{ pickExamples.length }}</strong></div>
        <div><span>坐标规范</span><strong>WGS84</strong></div>
        <div class="runtime-dot" :class="runState"><i></i><strong>{{ stateLabel }}</strong></div>
      </div>
    </header>

    <main class="lab-grid" :class="{ 'code-panel-open': isCodePanelOpen }">
      <aside class="catalog-panel">
        <div class="panel-kicker">PICK INDEX</div>
        <div class="catalog-heading"><h1>拾取目录</h1><span>{{ pickExamples.length }}</span></div>
        <nav class="pick-nav" aria-label="拾取示例">
          <button
            v-for="(example, index) in pickExamples"
            :key="example.id"
            type="button"
            :class="{ active: activeId === example.id }"
            @click="selectExample(example)"
          >
            <span class="pick-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span><strong>{{ example.title }}</strong><small>{{ example.name }}</small></span>
            <b>›</b>
          </button>
        </nav>
        <div class="catalog-guide">
          <span>操作约定</span>
          <p>点位使用单击完成；线和多边形使用双击结束。保留后的节点可以拖拽编辑。</p>
        </div>
      </aside>

      <section class="code-panel" :class="{ collapsed: !isCodePanelOpen }" aria-label="拾取示例代码编辑器">
        <button
          type="button"
          class="code-panel-toggle"
          :aria-expanded="isCodePanelOpen"
          aria-controls="pick-code-panel-body"
          :title="isCodePanelOpen ? '收起示例代码' : '展开示例代码'"
          @click="toggleCodePanel"
        >
          <span class="toggle-arrow" :class="{ open: isCodePanelOpen }" aria-hidden="true">›</span>
          <span class="toggle-label">EDITABLE EXAMPLE</span>
        </button>

        <div id="pick-code-panel-body" class="code-panel-body" :aria-hidden="!isCodePanelOpen">
          <div class="panel-toolbar">
            <div><span class="panel-kicker">EDITABLE EXAMPLE</span><h2>{{ activeExample.name }}</h2></div>
            <span v-if="isModified" class="changed-badge">已修改</span>
          </div>
          <p class="example-summary">{{ activeExample.summary }}</p>
          <div class="scope-line"><span>可用变量</span><code>PickTools</code><code>viewer</code><code>onResult</code></div>

          <div class="editor-shell">
            <CodeExampleEditor
              v-model="code"
              accent="blue"
              aria-label="可编辑 PickTools JavaScript 示例代码"
              @run="runCode"
            />
          </div>

          <div class="run-console" :class="runState">
            <div><i></i><span>{{ runMessage }}</span></div>
          </div>

          <div class="result-panel">
            <div><span>CALLBACK RESULT</span><small>WGS84</small></div>
            <pre>{{ resultText }}</pre>
          </div>

          <div class="editor-actions">
            <button type="button" class="run-button" :disabled="!viewerReady || runState === 'running'" @click="runCode">
              <span>▶</span>{{ runState === 'active' || runState === 'done' ? '重新开始拾取' : '运行当前示例' }}
            </button>
            <button type="button" class="text-button" :disabled="!isModified" @click="resetCode">恢复代码</button>
            <kbd>Ctrl ↵</kbd>
          </div>
        </div>
      </section>

      <section class="map-panel" aria-label="PickTools Cesium 运行预览">
        <BMapViewer
          id="pick-tools-map"
          ref="mapRef"
          :camera="HOME_CAMERA"
          :scene-mode="1"
          @ready="handleViewerReady"
          @error="handleMapError"
        />
        <div class="map-title-card"><span>LIVE INTERACTION</span><strong>{{ activeExample.title }}</strong><small>{{ activeExample.name }}</small></div>
        <div class="map-instruction"><i></i><span>{{ activeExample.instruction }}</span></div>
        <div class="map-footer"><span><i></i> OFFLINE TILES · WGS84</span><span>{{ stateLabel }}</span></div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.pick-lab {
  --ink-0: #050b12;
  --ink-1: #08141e;
  --ink-2: #0b1d29;
  --line: rgba(113, 175, 208, 0.17);
  --muted: #718d9d;
  --text: #e1f2f7;
  --blue: #69b9ff;
  --cyan: #56e8e2;
  --amber: #ffc85c;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var(--text);
  background: var(--ink-0);
  font-family: "Bahnschrift", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.lab-header { position: relative; z-index: 10; height: 68px; padding: 0 22px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); background: linear-gradient(90deg, #07131e, #081925 60%, #07121a); }
.lab-header::after { position: absolute; right: 0; bottom: -1px; width: 36%; height: 1px; content: ""; background: linear-gradient(90deg, transparent, var(--blue)); }
.brand-block,
.brand-line,
.header-metrics,
.catalog-heading,
.panel-toolbar,
.scope-line,
.editor-actions,
.map-footer { display: flex; align-items: center; }
.brand-block { gap: 13px; }
.brand-mark { position: relative; width: 34px; height: 34px; transform: rotate(45deg); }
.brand-mark span { position: absolute; inset: 4px; border: 1px solid var(--blue); }
.brand-mark span:nth-child(2) { inset: 10px; opacity: 0.68; }
.brand-mark span:nth-child(3) { inset: 15px; background: var(--blue); box-shadow: 0 0 18px var(--blue); }
.brand-line { gap: 10px; }
.brand-line strong { font-size: 17px; letter-spacing: 0.04em; }
.edition { padding: 3px 6px; color: #06141f; background: var(--blue); font: 700 9px/1 "Cascadia Code", monospace; letter-spacing: 0.1em; }
.brand-block p { margin: 3px 0 0; color: var(--muted); font-size: 11px; letter-spacing: 0.07em; }
.header-metrics { align-self: stretch; }
.header-metrics > div { min-width: 122px; height: 100%; padding: 0 20px; display: flex; flex-direction: column; justify-content: center; border-left: 1px solid var(--line); }
.header-metrics span { margin-bottom: 4px; color: #5f7e90; font-size: 9px; letter-spacing: 0.12em; }
.header-metrics strong { color: #bdd6e2; font: 600 11px "Cascadia Code", monospace; }
.header-metrics .runtime-dot { min-width: 126px; flex-direction: row; align-items: center; gap: 9px; }
.runtime-dot i,
.run-console i,
.map-footer i { width: 6px; height: 6px; border-radius: 50%; background: #68808d; }
.runtime-dot.active i,
.run-console.active i,
.map-footer i { background: var(--blue); box-shadow: 0 0 10px var(--blue); }
.runtime-dot.done i,
.run-console.done i { background: var(--cyan); box-shadow: 0 0 10px var(--cyan); }
.runtime-dot.running i,
.run-console.running i { background: var(--amber); box-shadow: 0 0 10px var(--amber); animation: pulse 0.8s infinite alternate; }
.runtime-dot.error i,
.run-console.error i { background: #ff6863; box-shadow: 0 0 10px #ff6863; }

.lab-grid { height: calc(100% - 68px); display: grid; grid-template-columns: 218px 44px minmax(430px, 1fr); transition: grid-template-columns 240ms cubic-bezier(0.22, 1, 0.36, 1) 150ms; }
.lab-grid.code-panel-open { grid-template-columns: 218px 440px minmax(430px, 1fr); transition-delay: 0ms; }
.catalog-panel,
.code-panel { min-height: 0; border-right: 1px solid var(--line); background: var(--ink-1); }
.catalog-panel { padding: 22px 0 16px; display: flex; flex-direction: column; }
.panel-kicker { color: #4b7185; font: 700 9px/1 "Cascadia Code", monospace; letter-spacing: 0.18em; }
.catalog-panel > .panel-kicker,
.catalog-heading { margin-right: 18px; margin-left: 18px; }
.catalog-heading { margin-top: 8px; justify-content: space-between; }
.catalog-heading h1,
.panel-toolbar h2 { margin: 0; font-size: 18px; font-weight: 600; }
.catalog-heading span { color: var(--blue); font: 700 12px "Cascadia Code", monospace; }
.pick-nav { margin-top: 20px; display: grid; }
.pick-nav button { position: relative; min-height: 58px; padding: 8px 12px 8px 18px; display: grid; grid-template-columns: 28px 1fr 10px; align-items: center; gap: 7px; border: 0; border-left: 2px solid transparent; color: #819eac; text-align: left; background: transparent; cursor: pointer; }
.pick-nav button:hover { color: #e0f2f7; background: rgba(105, 185, 255, 0.05); }
.pick-nav button.active { border-left-color: var(--blue); color: white; background: linear-gradient(90deg, rgba(105, 185, 255, 0.14), transparent); }
.pick-nav button.active::after { position: absolute; right: 0; width: 1px; height: 60%; content: ""; background: var(--blue); box-shadow: 0 0 12px var(--blue); }
.pick-index { color: #456779; font: 9px "Cascadia Code", monospace; }
.pick-nav button > span:nth-child(2) { display: flex; flex-direction: column; }
.pick-nav strong { font-size: 12px; font-weight: 500; }
.pick-nav small { margin-top: 4px; color: #506e7e; font: 8px "Cascadia Code", monospace; }
.pick-nav b { color: #42677b; font-size: 17px; font-weight: 400; }
.catalog-guide { margin: auto 16px 0; padding: 14px; border: 1px solid #173342; background: #071721; }
.catalog-guide span { color: var(--blue); font: 8px "Cascadia Code", monospace; letter-spacing: 0.12em; }
.catalog-guide p { margin: 8px 0 0; color: #637f8e; font-size: 9px; line-height: 1.6; }

.code-panel { min-width: 0; display: grid; grid-template-columns: 44px minmax(0, 1fr); overflow: hidden; background: #07121a; }
.code-panel-toggle { position: relative; z-index: 2; width: 44px; min-height: 0; padding: 14px 0; display: flex; flex-direction: column; align-items: center; gap: 14px; border: 0; border-right: 1px solid #1b3b4d; color: #7394a6; background: linear-gradient(180deg, #0a1c28, #07121a); cursor: pointer; }
.code-panel-toggle:hover { color: var(--blue); background: #0b2130; }
.toggle-arrow { width: 26px; height: 26px; display: grid; place-items: center; border: 1px solid #285675; color: var(--blue); background: #081a26; font: 22px/1 "Cascadia Code", monospace; box-shadow: 0 0 16px rgba(105, 185, 255, 0.1); transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease; }
.toggle-arrow.open { transform: rotate(180deg); }
.toggle-label { writing-mode: vertical-rl; color: currentColor; font: 700 8px/1 "Cascadia Code", monospace; letter-spacing: 0.18em; }
.code-panel-body { min-width: 346px; min-height: 0; padding: 20px 18px 16px; display: flex; flex-direction: column; visibility: visible; opacity: 1; transform: translateX(0); transition: opacity 190ms ease 150ms, transform 230ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, visibility 0s linear 0s; }
.code-panel.collapsed .code-panel-body { visibility: hidden; opacity: 0; transform: translateX(-10px); pointer-events: none; transition: opacity 140ms ease 0ms, transform 160ms ease 0ms, visibility 0s linear 140ms; }
.panel-toolbar { min-height: 38px; justify-content: space-between; }
.panel-toolbar h2 { margin-top: 7px; font: 600 15px "Cascadia Code", monospace; }
.changed-badge { padding: 4px 7px; border: 1px solid rgba(255, 200, 92, 0.42); color: var(--amber); font: 9px "Cascadia Code", monospace; }
.example-summary { min-height: 34px; margin: 11px 0 8px; color: #7d99a7; font-size: 11px; line-height: 1.55; }
.scope-line { min-height: 27px; gap: 5px; }
.scope-line span { margin-right: 4px; color: #4e6b7a; font-size: 9px; }
.scope-line code { padding: 2px 5px; color: #72a8c8; background: #0c202c; font: 9px "Cascadia Code", monospace; }
.editor-shell { min-height: 190px; flex: 1; overflow: hidden; border: 1px solid #173241; background: #050d14; }
.run-console { min-height: 38px; margin-top: 9px; padding: 8px 10px; display: flex; align-items: center; border-left: 2px solid #294654; color: #7694a2; background: #091923; font: 10px "Cascadia Code", monospace; }
.run-console > div { min-width: 0; display: flex; align-items: center; gap: 9px; }
.run-console span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.run-console.active { border-left-color: var(--blue); color: #9ec7df; }
.run-console.done { border-left-color: var(--cyan); color: #9cdbd7; }
.run-console.error { border-left-color: #ff6863; color: #ffaaa6; }
.result-panel { height: 100px; margin-top: 9px; padding: 10px 12px; display: grid; grid-template-columns: 100px minmax(0, 1fr); overflow: hidden; border: 1px solid #16313f; background: #061018; }
.result-panel > div { display: flex; flex-direction: column; gap: 5px; }
.result-panel span { color: var(--blue); font: 8px "Cascadia Code", monospace; letter-spacing: 0.1em; }
.result-panel small { color: #4e6d7c; font: 8px "Cascadia Code", monospace; }
.result-panel pre { margin: 0; overflow: auto; color: #8db3c5; font: 9px/1.45 "Cascadia Code", monospace; }
.editor-actions { padding-top: 11px; gap: 8px; }
.run-button,
.text-button { height: 34px; border: 0; cursor: pointer; }
.run-button { padding: 0 15px; display: inline-flex; align-items: center; gap: 8px; color: #061622; background: var(--blue); font-size: 11px; font-weight: 700; }
.run-button:hover { background: #9bd2ff; }
.run-button:disabled { color: #526773; background: #17313d; cursor: not-allowed; }
.text-button { padding: 0 12px; border: 1px solid #1d3b4a; color: #7795a4; background: transparent; font-size: 10px; }
.text-button:disabled { opacity: 0.35; cursor: default; }
.editor-actions kbd { margin-left: auto; color: #496775; font: 9px "Cascadia Code", monospace; }

.map-panel { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: #031018; }
.map-panel::after { position: absolute; inset: 0; z-index: 2; pointer-events: none; content: ""; box-shadow: inset 0 0 90px rgba(0, 13, 22, 0.42); }
.map-title-card { position: absolute; z-index: 4; top: 20px; left: 20px; min-width: 186px; padding: 12px 15px 13px; border-left: 2px solid var(--blue); background: rgba(3, 17, 27, 0.84); backdrop-filter: blur(8px); }
.map-title-card span { display: block; color: var(--blue); font: 8px "Cascadia Code", monospace; letter-spacing: 0.17em; }
.map-title-card strong { display: block; margin-top: 8px; font-size: 17px; font-weight: 500; }
.map-title-card small { display: block; margin-top: 4px; color: #668494; font: 9px "Cascadia Code", monospace; }
.map-instruction { position: absolute; z-index: 4; right: 20px; bottom: 48px; left: 20px; min-height: 42px; padding: 0 13px; display: flex; align-items: center; gap: 10px; border-left: 2px solid var(--blue); color: #9ab8c8; background: rgba(4, 19, 29, 0.82); backdrop-filter: blur(8px); font-size: 10px; pointer-events: none; }
.map-instruction i { width: 7px; height: 7px; border: 1px solid var(--blue); transform: rotate(45deg); }
.map-footer { position: absolute; z-index: 4; right: 20px; bottom: 16px; left: 20px; justify-content: space-between; color: #668796; font: 8px "Cascadia Code", monospace; letter-spacing: 0.07em; pointer-events: none; }
.map-footer span:first-child { display: flex; align-items: center; gap: 8px; }
button:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
@keyframes pulse { from { opacity: 0.4; } to { opacity: 1; } }
@media (max-width: 1180px) {
  .lab-grid { grid-template-columns: 184px 44px minmax(390px, 1fr); }
  .lab-grid.code-panel-open { grid-template-columns: 184px 360px minmax(390px, 1fr); }
  .code-panel-body { min-width: 316px; }
  .header-metrics > div:nth-child(2) { display: none; }
}
@media (max-width: 900px) {
  .pick-lab { overflow: auto; }
  .lab-header { position: sticky; top: 0; height: 60px; padding: 0 14px; }
  .brand-block p,
  .header-metrics > div:not(.runtime-dot) { display: none; }
  .header-metrics .runtime-dot { min-width: auto; padding: 0 10px; }
  .lab-grid { height: auto; min-height: calc(100% - 60px); grid-template-columns: 150px 44px minmax(540px, 1fr); }
  .lab-grid.code-panel-open { grid-template-columns: 150px 360px minmax(540px, 1fr); }
  .code-panel-body { min-width: 306px; }
  .catalog-panel,
  .code-panel,
  .map-panel { min-height: calc(100vh - 60px); }
}

@media (prefers-reduced-motion: reduce) {
  .lab-grid,
  .code-panel-body,
  .toggle-arrow { transition: none; }
}
</style>
