<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import * as Cesium from 'cesium'
import { BaseMaps, BMapViewer, WeatherEffects } from '../src/sdk/index.js'
import { weatherExamples } from './weather/index.js'

const HOME_CAMERA = {
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 1800,
  pitch: -5,
  minHeight: 40,
  maxHeight: 800000,
}

const queryId = new URLSearchParams(window.location.search).get('weather-preview')
const example = computed(() => weatherExamples.find((item) => item.id === queryId) || weatherExamples[0])
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const mapRef = ref(null)
let viewer = null
let baseMap = null
let activeEffect = null

function destroyEffect() {
  try {
    if (typeof activeEffect === 'function') activeEffect()
    else if (typeof activeEffect?.destroy === 'function') activeEffect.destroy()
    else if (typeof activeEffect?.remove === 'function') activeEffect.remove()
  } catch (error) {
    console.warn('天气案例资源清理失败：', error)
  }
  activeEffect = null
}

async function runExample() {
  if (!viewer || viewer.isDestroyed()) return
  destroyEffect()
  mapRef.value?.flyTo(HOME_CAMERA, 0)

  try {
    const execute = new AsyncFunction(
      'WeatherEffects',
      'viewer',
      `'use strict';\n${example.value.codeText}`,
    )
    activeEffect = await execute(WeatherEffects, viewer)
  } catch (error) {
    console.error('天气案例运行失败：', error)
  }
}

async function handleViewerReady(readyViewer) {
  viewer = readyViewer
  viewer.scene.skyAtmosphere.show = true
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#8499a6')
  baseMap = new BaseMaps.BaseMap(viewer, {
    type: 'arcgis',
    url: BaseMaps.arcgisWorldImageryUrl,
    maximumLevel: 23,
  })
  await nextTick()
  runExample()
}

function handleViewerError(error) {
  console.error('Cesium 初始化失败：', error)
}

onBeforeUnmount(() => {
  destroyEffect()
  baseMap?.destroy()
  baseMap = null
  viewer = null
})
</script>

<template>
  <main class="case-preview">
    <BMapViewer
      id="weather-case-map"
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
  background: #8499a6;
}
</style>
