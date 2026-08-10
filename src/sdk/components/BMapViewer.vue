<template>
  <div class="cesium-container">
    <div ref="cesiumContainer" class="cesium-viewer" :id="id"></div>
    <slot name="tool"></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as Cesium from 'cesium'
import { useCesium } from '../composables/useCesium'

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  camera: {
    type: Object,
    default: () => ({})
  },
  sceneMode:{
    type: Number,
    default: 0
  },
  baseColor:{
    type: String,
    default: '#112441'
  },
})

const emit = defineEmits(['ready', 'error', 'click'])

const cesiumContainer = ref(null)
let handler = null
let viewer = null
const {
  initCesium,
  destroyCesium,
  flyTo,
  getViewer,
} = useCesium()

// 初始化 Cesium
onMounted(async () => {
  await initMap(props.camera)
})

const initMap = async (mapConfig) =>{
  try {
    await nextTick() // 确保 DOM 已渲染
    destroyHandler()
    destroyCesium()
    viewer = await initCesium(cesiumContainer.value, {...props,mapConfig})
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

    // 关闭太阳月亮天空盒
    viewer.scene.moon.show =  false
    viewer.scene.fog.enabled = false
    viewer.scene.sun.show = false
    //抗锯齿
    // viewer.scene.fxaa = true;
    // viewer.scene.postProcessStages.fxaa.enabled = true;

    // 是否支持图像渲染像素化处理
    if(Cesium.FeatureDetection.supportsImageRenderingPixelated()){
      viewer.resolutionScale = window.devicePixelRatio;
    }
    startClick()
    emit('ready', viewer)
  } catch (err) {
    emit('error', err)
  }
}

//开启点击监听
const startClick = () =>{
  if (!handler || handler.isDestroyed()) return
  handler.setInputAction((e)=>{
    const clickPosition = viewer.scene.camera.pickEllipsoid(
      e.position,
      viewer.scene.globe.ellipsoid,
    )
    if (!clickPosition) return
    const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
    // 鼠标拾取
    const feature = viewer.scene.pick(e.position);
    if(Cesium.defined(feature)){
      emit('click', {
        lon: Cesium.Math.toDegrees(randiansPos.longitude),
        lat: Cesium.Math.toDegrees(randiansPos.latitude),
        feature: feature
      })
    }else{
      emit('click', {lon: Cesium.Math.toDegrees(randiansPos.longitude), lat: Cesium.Math.toDegrees(randiansPos.latitude)})
    }

  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
const stopClick = () =>{
  if (!handler || handler.isDestroyed()) return
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

const destroyHandler = () => {
  if (handler && !handler.isDestroyed()) handler.destroy()
  handler = null
}

// 清理资源
onUnmounted(() => {
  destroyHandler()
  destroyCesium()
  viewer = null
})

// 暴露方法给父组件
defineExpose({
  initMap,
  flyTo,
  getViewer,
  startClick,
  stopClick,
})
</script>

<style scoped>
.cesium-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cesium-viewer{
  width: 100%;
  height: 100%;
}
:deep(.cesium-viewer-bottom){
  display: none;
}

</style>
