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
  import {BMapViewer, MapLayers} from "b-map-viewer";
  import 'b-map-viewer/style.css'

  const cesiumRef = ref(null)
  const baseMapConfig = {
    url: 'http://192.168.31.216:8095/file/terrain/jiutai/{z}/{x}/{reverseY}.jpg',
    maximumLevel: 18,
    minimumLevel: 3,
    themeColor: '#2f62af'
  }
  const mapConfig = {
    longitude: 125.83372000975274,
    latitude: 44.14712267403385,
    height: 8000,
    pitch: 0
  }
  let baseMapLayer = null
  const ready = (viewer) => {
    console.log(viewer.scene, 'viewer')
    baseMapLayer = new MapLayers.BaseMapLayer(viewer, baseMapConfig)
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
import {MapLayers,useCesium} from "b-map-viewer";
import 'b-map-viewer/style.css'
const {initCesium,setMapCenter} = useCesium()
const baseMapConfig = {
  url:'http://192.168.31.216:8095/file/terrain/jiutai/{z}/{x}/{reverseY}.jpg',
  maximumLevel: 18,
  minimumLevel:3,
  themeColor:'#2f62af'
}
const mapConfig={
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 8000,
  pitch:0
}
let baseMapLayer = null
onMounted( ()=>{
  nextTick(async ()=>{
    let viewer= await initCesium('cesium-container',{
          sceneMode:0,
          mapConfig: mapConfig, 
    }) //创建地图容器
    baseMapLayer = new MapLayers.BaseMapLayer(viewer,baseMapConfig) //加载地图
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
