<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { BaseMaps, BMapViewer, PickTools } from '../src/sdk/index.js'
import { pickExamples } from './picks/index.js'

const HOME_CAMERA = {
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 7600,
  pitch: -56,
  minHeight: 40,
  maxHeight: 800000,
}

const queryId = new URLSearchParams(window.location.search).get('pick-preview')
const example = computed(() => pickExamples.find((item) => item.id === queryId) || pickExamples[0])
const publicRoot = new URL(import.meta.env.BASE_URL, window.location.href)
const tileUrl = new URL('tiles/{z}/{x}/{reverseY}.png', publicRoot).href
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const mapRef = ref(null)
let viewer = null
let baseMap = null
let activeTools = null

function restoreInteraction() {
  if (!viewer || viewer.isDestroyed()) return
  const controller = viewer.scene.screenSpaceCameraController
  controller.enableRotate = true
  controller.enableTranslate = true
  controller.enableZoom = true
  document.body.style.cursor = 'default'
}

function destroyTools() {
  try {
    activeTools?.destroy?.()
  } catch (error) {
    console.warn('拾取案例资源清理失败：', error)
  }
  activeTools = null
  restoreInteraction()
}

async function runExample() {
  if (!viewer || viewer.isDestroyed()) return
  destroyTools()
  mapRef.value?.flyTo(HOME_CAMERA, 0)

  try {
    const execute = new AsyncFunction(
      'PickTools',
      'viewer',
      'onResult',
      `'use strict';\n${example.value.code}`,
    )
    activeTools = await execute(PickTools, viewer, () => viewer?.scene?.requestRender())
  } catch (error) {
    restoreInteraction()
    console.error('拾取案例运行失败：', error)
  }
}

async function handleViewerReady(readyViewer) {
  viewer = readyViewer
  baseMap = new BaseMaps.BaseMap(viewer, {
    type: 'offline',
    url: tileUrl,
    coordinateSystem: 'GCJ02',
    minimumLevel: 1,
    maximumLevel: 12,
    themeColor: '#34A4FF',
  })
  await nextTick()
  runExample()
}

function handleViewerError(error) {
  console.error('Cesium 初始化失败：', error)
}

onBeforeUnmount(() => {
  destroyTools()
  baseMap?.destroy()
  baseMap = null
  viewer = null
})
</script>

<template>
  <main class="case-preview">
    <BMapViewer
      id="pick-case-map"
      ref="mapRef"
      :camera="HOME_CAMERA"
      :scene-mode="1"
      @ready="handleViewerReady"
      @error="handleViewerError"
    />
  </main>
</template>

<style scoped>
.case-preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #071118;
}
</style>
