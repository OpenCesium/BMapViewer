# IconClusterLayer 图标聚合图层

`IconClusterLayer` 用于展示数量较多、分布密集的点位。图层基于 `Cesium.CustomDataSource` 和 `EntityCluster` 实现：相邻图标会按照屏幕像素距离合并为带数量的聚合图标，放大地图后自动拆分为单个图标。

适合设备点位、事件位置、门店、车辆和监测站等大批量点数据。

## 组件案例

<LayerExamplePreview example="icon-cluster" title="IconClusterLayer 图标聚合" />

## 构造函数

```js
new MapLayers.IconClusterLayer(viewer, config)
```

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `viewer` | `Cesium.Viewer` | Cesium Viewer 实例 |
| `config` | `object` | 图标和聚合配置 |

### config 配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | 是否启用聚合 |
| `pixelRange` | `number` | `36` | 参与聚合的屏幕像素范围，数值越大越容易聚合 |
| `minimumClusterSize` | `number` | `2` | 形成聚合图标所需的最少点数 |
| `icon` | `string / Canvas / Image` | 内置定位图标 | 单个点位的默认图标 |
| `width` | `number` | `34` | 单个图标宽度 |
| `height` | `number` | `42` | 单个图标高度 |
| `color` | `string` | `#ffffff` | 单个图标的叠加颜色 |
| `offset` | `[number, number]` | `[0, 0]` | 单个图标的像素偏移 |
| `disableDepthTestDistance` | `number` | `Infinity` | 超过此距离后关闭深度测试 |
| `clusterStyles` | `Array` | 见下方 | 根据聚合数量设置尺寸与颜色 |
| `clusterTextColor` | `string` | `#ffffff` | 聚合数量文字颜色 |
| `clusterStrokeColor` | `string` | `#d9f8ffff` | 聚合图标描边颜色 |
| `clusterStrokeWidth` | `number` | `2` | 聚合图标描边宽度 |
| `clusterFontSize` | `number` | `15` | 聚合数量的基础字号 |

`clusterStyles` 按 `min` 从小到大匹配。例如聚合数量为 75 时，会使用 `min: 50` 对应的样式。

```js
clusterStyles: [
  { min: 2, size: 34, color: '#1c86d1dd' },
  { min: 50, size: 40, color: '#43b86add' },
  { min: 100, size: 46, color: '#f56c6cdd' },
  { min: 200, size: 52, color: '#e6a23cdd' },
]
```

为了兼容常见 Cesium 聚合案例，也可以使用 `colorArr`，其中的 `num` 等同于 `clusterStyles.min`。

## 数据格式

`setData` 接受 BMapViewer 点数据数组，也支持 GeoJSON `FeatureCollection`。单个点位的 `properties.icon`、`width`、`height`、`color` 和 `offset` 可以覆盖全局配置。

```js
layer.setData([
  {
    geometry: {
      type: 'Point',
      coordinates: [125.834, 44.147, 0],
    },
    properties: {
      id: 'device-001',
      name: '一号监测设备',
      color: '#8eeeff',
    },
  },
])
```

## 方法

### `setData(data)`

清空旧数据并批量加载点位。返回创建成功的 `Cesium.Entity[]`。

### `load(dataOrUrl)`

异步加载 GeoJSON 对象、URL 或 `Cesium.Resource`。

```js
await layer.load('/data/devices.geojson')
```

### `addLayer(options)`

添加单个点位并返回对应的 `Cesium.Entity`。

### `getLayerById(id)` / `removeLayerById(id)`

根据数据中的 `properties.id` 查询或移除点位。

### `setEnabled(enabled)`

动态开启或关闭聚合。关闭后显示全部单点图标。

### `updateConfig(config)`

更新 `pixelRange`、`minimumClusterSize`、`clusterStyles` 等配置，并立即触发重新聚合。

### `show()` / `hide()`

显示或隐藏整个数据源。

### `clearLayer()` / `destroy()`

清空数据，或销毁图层并解除聚合事件监听。

## 完整示例

```js
import { MapLayers } from 'b-map-viewer'

const layer = new MapLayers.IconClusterLayer(viewer, {
  icon: '/images/device-marker.png',
  width: 32,
  height: 40,
  pixelRange: 48,
  minimumClusterSize: 2,
  clusterStyles: [
    { min: 2, size: 34, color: '#1c86d1dd' },
    { min: 20, size: 42, color: '#43b86add' },
    { min: 80, size: 50, color: '#f56c6cdd' },
  ],
})

layer.setData(points)

// 页面卸载时
layer.destroy()
```
