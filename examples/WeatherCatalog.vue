<script setup>
import { computed, ref } from 'vue'
import { exampleModules } from './modules.js'

const weatherModule = exampleModules.find((module) => module.id === 'weather')
const effects = [
  { id: 'rain', name: '降雨', code: 'RAIN', description: '屏幕空间雨线、风向和降雨强度控制。', parameters: ['强度', '风向', '速度'] },
  { id: 'snow', name: '降雪', code: 'SNOW', description: '雪花尺寸、密度、飘落方向与距离衰减。', parameters: ['密度', '粒径', '飘移'] },
  { id: 'fog', name: '雾', code: 'FOG', description: '按相机距离混合场景颜色，模拟能见度变化。', parameters: ['能见度', '颜色', '衰减'] },
  { id: 'sand', name: '沙尘', code: 'SAND', description: '暖色颗粒与低能见度组合的沙尘天气。', parameters: ['颗粒', '色调', '风速'] },
  { id: 'cloud', name: '云层', code: 'CLOUD', description: '面向大范围场景的动态云层与阴影接口。', parameters: ['云量', '高度', '流速'] },
  { id: 'lightning', name: '闪电', code: 'LIGHTNING', description: '短时曝光、闪烁节奏与区域触发控制。', parameters: ['频率', '亮度', '区域'] },
]

const activeId = ref(effects[0].id)
const activeEffect = computed(() => effects.find((item) => item.id === activeId.value) || effects[0])
</script>

<template>
  <div class="weather-lab">
    <aside class="weather-index">
      <p>WEATHER INDEX</p>
      <div class="index-heading"><h1>天气目录</h1><span>{{ effects.length }}</span></div>
      <nav aria-label="天气粒子效果">
        <button
          v-for="(effect, index) in effects"
          :key="effect.id"
          type="button"
          :class="{ active: activeId === effect.id }"
          @click="activeId = effect.id"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ effect.name }}</strong>
          <small>{{ effect.code }}</small>
        </button>
      </nav>
    </aside>

    <section class="weather-stage">
      <div class="particle-field" aria-hidden="true">
        <i v-for="index in 20" :key="index" :style="{ '--i': index }"></i>
      </div>
      <div class="stage-grid" aria-hidden="true"></div>
      <div class="effect-state">
        <span>MODULE SCAFFOLD / {{ activeEffect.code }}</span>
        <h2>{{ activeEffect.name }}</h2>
        <p>{{ activeEffect.description }}</p>
        <ul>
          <li v-for="parameter in activeEffect.parameters" :key="parameter">{{ parameter }}</li>
        </ul>
        <div class="pending-note">
          <i></i>
          <div><strong>目录已预留</strong><small>接入粒子实现后，可在此加入可编辑代码与 Cesium 实时预览。</small></div>
        </div>
        <a :href="weatherModule.docs" target="_blank" rel="noreferrer">查看模块约定 ↗</a>
      </div>
      <div class="telemetry" aria-hidden="true">
        <span>WIND / 024°</span><span>VIS / 8.2 KM</span><span>FPS / --</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.weather-lab {
  --line: rgba(129, 184, 201, 0.16);
  --muted: #708d96;
  --text: #e4f3f2;
  --amber: #f3c96f;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  overflow: hidden;
  color: var(--text);
  background: #061018;
  font-family: "Bahnschrift", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.weather-index { min-height: 0; padding: 28px 0; border-right: 1px solid var(--line); background: #08141c; }
.weather-index > p { margin: 0 20px; color: #58727a; font: 8px "Cascadia Code", monospace; letter-spacing: 0.18em; }
.index-heading { margin: 9px 20px 24px; display: flex; align-items: center; justify-content: space-between; }
.index-heading h1 { margin: 0; font-size: 21px; font-weight: 550; }
.index-heading span { color: var(--amber); font: 700 12px "Cascadia Code", monospace; }
.weather-index nav { display: grid; }
.weather-index button { position: relative; min-height: 58px; padding: 8px 20px; display: grid; grid-template-columns: 28px 1fr; grid-template-rows: auto auto; align-items: center; border: 0; border-left: 2px solid transparent; color: #75919a; text-align: left; background: transparent; cursor: pointer; }
.weather-index button:hover { color: #cfdfdf; background: rgba(243, 201, 111, 0.04); }
.weather-index button.active { border-left-color: var(--amber); color: white; background: linear-gradient(90deg, rgba(243, 201, 111, 0.12), transparent); }
.weather-index button > span { grid-row: 1 / 3; color: #48636c; font: 9px "Cascadia Code", monospace; }
.weather-index button strong { font-size: 13px; font-weight: 500; }
.weather-index button small { color: #536f78; font: 8px "Cascadia Code", monospace; letter-spacing: 0.1em; }
.weather-stage { position: relative; min-width: 0; min-height: 0; overflow: hidden; background: radial-gradient(circle at 60% 35%, #183848 0, #0b202b 34%, #061018 72%); }
.stage-grid { position: absolute; inset: 0; opacity: 0.4; background: linear-gradient(rgba(131, 190, 198, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(131, 190, 198, 0.08) 1px, transparent 1px); background-size: 68px 68px; transform: perspective(500px) rotateX(58deg) scale(1.5) translateY(27%); transform-origin: bottom; }
.particle-field { position: absolute; inset: 0; overflow: hidden; }
.particle-field i { --delay: calc(var(--i) * -0.31s); position: absolute; top: -18%; left: calc(var(--i) * 4.7%); width: 1px; height: calc(28px + var(--i) * 2px); opacity: 0.34; background: linear-gradient(transparent, #a8d8dc); transform: rotate(14deg); animation: rain-line calc(1.25s + var(--i) * 0.02s) linear var(--delay) infinite; }
.effect-state { position: relative; z-index: 2; width: min(560px, calc(100% - 80px)); margin: clamp(80px, 13vh, 150px) 0 0 clamp(40px, 9vw, 130px); }
.effect-state > span { color: var(--amber); font: 8px "Cascadia Code", monospace; letter-spacing: 0.17em; }
.effect-state h2 { margin: 18px 0 12px; font-size: clamp(46px, 7vw, 92px); font-weight: 500; letter-spacing: -0.055em; }
.effect-state > p { max-width: 520px; margin: 0; color: #819da5; font-size: 14px; line-height: 1.8; }
.effect-state ul { margin: 24px 0 0; padding: 0; display: flex; gap: 8px; list-style: none; }
.effect-state li { padding: 6px 9px; border: 1px solid rgba(243, 201, 111, 0.18); color: #9b8c67; background: rgba(17, 27, 30, 0.5); font: 8px "Cascadia Code", monospace; }
.pending-note { max-width: 520px; margin-top: 42px; padding: 15px 17px; display: flex; align-items: center; gap: 13px; border-left: 2px solid var(--amber); background: rgba(6, 16, 24, 0.7); backdrop-filter: blur(10px); }
.pending-note > i { width: 8px; height: 8px; border: 1px solid var(--amber); transform: rotate(45deg); }
.pending-note strong,
.pending-note small { display: block; }
.pending-note strong { font-size: 11px; }
.pending-note small { margin-top: 4px; color: #657f87; font-size: 9px; line-height: 1.45; }
.effect-state > a { display: inline-block; margin-top: 18px; color: #9eaa9a; font-size: 10px; text-underline-offset: 5px; }
.effect-state > a:hover { color: var(--amber); }
.telemetry { position: absolute; right: 22px; bottom: 18px; left: 22px; display: flex; justify-content: space-between; color: #47656e; font: 8px "Cascadia Code", monospace; letter-spacing: 0.1em; }
button:focus-visible,
a:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
@keyframes rain-line { from { transform: translate3d(-80px, -20vh, 0) rotate(14deg); } to { transform: translate3d(100px, 125vh, 0) rotate(14deg); } }
@media (max-width: 720px) {
  .weather-lab { grid-template-columns: 110px minmax(0, 1fr); }
  .weather-index { padding-top: 18px; }
  .weather-index > p,
  .index-heading { margin-right: 10px; margin-left: 10px; }
  .index-heading h1 { font-size: 15px; }
  .weather-index button { padding: 8px 9px; grid-template-columns: 22px 1fr; }
  .effect-state { width: calc(100% - 36px); margin: 55px 18px 0; }
}
@media (prefers-reduced-motion: reduce) { .particle-field i { animation: none; } }
</style>
