# Hello World !
## 方式1 - vue组件加载
```vue
<template>
  <div class="map-box">
    <BMapViewer :sceneMode="0" :camera="mapConfig" @ready="ready" @click="onClick" ref="cesiumRef"></BMapViewer>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import {BaseMaps, BMapViewer} from "b-map-viewer";
  import 'b-map-viewer/style.css'

  const cesiumRef = ref(null)
  const baseMapConfig = {
    url: '/tiles/{z}/{x}/{reverseY}.png',
    maximumLevel: 12,
    minimumLevel: 1,
    themeColor: '#2f62af'
  }
  const mapConfig = {
    longitude: 125.83372000975274,
    latitude: 44.14712267403385,
    height: 8000,
    pitch: 0
  }
  let baseMap = null
  const ready = (viewer) => {
    console.log(viewer.scene, 'viewer')
    baseMap = new BaseMaps.BaseMap(viewer, {
      type: 'offline',
      coordinateSystem: 'GCJ02',
      ...baseMapConfig,
    })
  }
  const onClick = (e) => {
    console.log(e, 'e')
  }
</script>

<style scoped>
  .map-box {
    width: 100%;
    height: 100%;
  }
</style>

```

## 方式2 - hook方式
```vue
<template>
  <div class="map-box">
      <div id="cesium-container"></div>
  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import {BaseMaps, useCesium} from "b-map-viewer";
import 'b-map-viewer/style.css'
const {initCesium,setMapCenter} = useCesium()
const baseMapConfig = {
  url:'/tiles/{z}/{x}/{reverseY}.png',
  maximumLevel: 12,
  minimumLevel:1,
  themeColor:'#2f62af'
}
const mapConfig={
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 8000,
  pitch:0
}
let baseMap = null
onMounted( ()=>{
  nextTick(async ()=>{
    let viewer= await initCesium('cesium-container',{
          sceneMode:0,
          mapConfig: mapConfig, 
    }) //创建地图容器
    baseMap = new BaseMaps.BaseMap(viewer, {
      type: 'offline',
      coordinateSystem: 'GCJ02',
      ...baseMapConfig,
    })
  })
})
</script>

<style scoped>
.map-box{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#cesium-container{
  width: 100%;
  height: 100%;
}
:deep(.cesium-viewer-bottom){
  display: none;
}
</style>

```
