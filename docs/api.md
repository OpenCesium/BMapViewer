# BMapViewer API

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `id` | `String` | `undefined` | 可选的内部容器 id |
| `camera` | `Object` | `{}` | 初始相机参数 |
| `sceneMode` | `Number` | `0` | `0` 为 2D，其他值为 3D |
| `baseColor` | `String` | `#112441` | 无影像时的地球基础颜色 |

`camera` 支持以下字段：

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `longitude` | `116.40021930621751` | 经度 |
| `latitude` | `39.89823173640466` | 纬度 |
| `height` | `10000` | 相机高度 |
| `pitch` | `0` | 俯仰角（度） |
| `minHeight` | `1` | 最小相机高度 |
| `maxHeight` | `1500000` | 最大相机高度 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `ready` | `Cesium.Viewer` | Viewer 初始化完成 |
| `error` | `Error` | 初始化失败 |
| `click` | `{ lon, lat, feature? }` | 点击到地球表面时触发 |

## Exposed methods

通过组件 `ref` 调用：

| 方法 | 说明 |
| --- | --- |
| `initMap(camera?)` | 手动重新初始化 Viewer |
| `flyTo(destination, duration?)` | 飞行到经纬度位置 |
| `startClick()` | 开启左键拾取 |
| `stopClick()` | 关闭左键拾取 |
| `getViewer()` | 获取当前 `Cesium.Viewer` |

```js
mapRef.value.flyTo(
  { longitude: 116.3974, latitude: 39.9093, height: 8000, pitch: -45 },
  1.5,
)
```

## SDK 模块导出

| 导出 | 说明 |
| --- | --- |
| `BMapViewer` | Vue 3 Viewer 组件 |
| `useCesium` | Viewer 生命周期与相机 Hook |
| `BaseMaps` | 底图管理器、Provider、样式别名、投影与切片方案 |
| `MapLayers` | 点、线、面、气泡、热力图和三维业务图层 |
| `WeatherEffects` | 雨、雪、雾、沙尘、云层、闪电效果与统一天气管理器 |
| `PickTools` | 拾取与绘制工具 |
| `EarthColor` | 场景颜色处理工具 |
| `turf` | Turf 空间分析命名空间 |

## Slot

`tool` 插槽渲染在 Viewer 容器内部，可用于地图工具栏、图例或状态面板。
