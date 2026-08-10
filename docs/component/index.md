---
prev:
  text: '介绍'
  link: '/introduction/index'
next:
  text: 'useCesium'
  link: '/component/use-cesium'
---

# BMapViewer 组件

BMapViewer组件是基于vue3封装的Cesium加载组件,可以通过简单的参数传递即可实现地图加载。
## 示例
完整示例可参考[方式 1：Vue 组件加载](/introduction/hello#方式-1-vue-组件加载)。
```vue
<template>
  <BMapViewer 
      :sceneMode="0" 
      :camera="mapConfig" 
      @ready="ready" 
      @click="onClick" 
      ref="cesiumRef">
  </BMapViewer>
</template>
```

## API

#### Attributes-属性

|    属性名    |       说明       |   类型   |      默认       |      可选值      |
|:---------:|:--------------:|:------:|:-------------:|:-------------:|
|    id     |      可选容器 id      | string | undefined |               |
| sceneMode | 地图模式，平面2D和3D地球 | number |       0       | 0:2D模式 <br/>1:3D模式 |
|   camera  |      相机参数      | object |     `{}`      |      [参考 mapConfig](./use-cesium#initcesium-初始化cesium-viewer)       |
|  baseColor  |      地球颜色      | string |     #112441      |               |

#### Events-事件

|  事件名  |    说明     |    类型    |  callback参数   |
|:-----:|:---------:|:--------:|:-------------:|
| ready | 地图加载完成时触发 | Function | `viewer` (Cesium.Viewer) |
| error | 地图加载失败时触发 | Function | `err` (Error) |
| click  | 鼠标左键点击事件 | Function | `{ lon, lat, feature }` |

#### Exposes-暴露

|  名称  |      说明      |   类型   |  参数类型  |
|:-----:|:------------:|:--------:|:------:|
| initMap |    地图初始化     | Function | `mapConfig` (Object) |
| startClick | 开启点击事件(默认开启) | Function | - |
| stopClick |    关闭点击事件    | Function | - |
| flyTo |    相机飞行到指定位置    | Function | `destination, duration?` |
| getViewer |    获取当前 Cesium Viewer    | Function | - |

#### Slots-插槽

|  插槽名  |      说明      |
|:-----:|:------------:|
| tool | 用于在地图上层放置自定义工具栏、控件等 DOM 元素，配合相对/绝对定位使用 |
