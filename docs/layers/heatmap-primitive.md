# HeatmapPrimitiveLayer Primitive 热力图

`HeatmapPrimitiveLayer` 将符合 BMapViewer 数据规范的点位权重绘制到离屏 Canvas，并通过 `RectangleGeometry` 和 `EllipsoidSurfaceAppearance` 把热力纹理贴合到 Cesium 椭球表面。默认使用 Primitive 渲染，适合点位较多、覆盖范围较大的专题分析场景。

## 组件案例

<LayerExamplePreview example="heatmap-primitive" title="HeatmapPrimitiveLayer Primitive 热力图" />

## 构造函数

```js
new MapLayers.HeatmapPrimitiveLayer(viewer, config)
```

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `renderType` | `'primitive' \| 'imagery' \| 'entity'` | `'primitive'` | Cesium 承载方式，推荐使用 Primitive |
| `radius` | `number` | `54` | Canvas 中热力点的默认影响半径，单位为像素 |
| `blur` | `number` | `0.82` | 热力点边缘模糊比例 |
| `gradient` | `object` | 蓝—绿—黄—红 | 热度颜色渐变配置 |
| `maxOpacity` | `number` | `0.88` | 热力纹理最大透明度 |
| `minOpacity` | `number` | `0` | 热力纹理最小透明度 |
| `canvasSize` | `number` | `1024` | 离屏 Canvas 最长边尺寸，范围 `256–2048` |
| `minCanvasSize` | `number` | `320` | 离屏 Canvas 最短边的最小尺寸 |
| `padding` | `number` | `0.12` | 自动数据范围向外扩展的比例 |
| `height` | `number` | `0` | 热力矩形离椭球表面的高度，单位为米 |
| `minValue` | `number \| null` | `0` | 热力值下限；设为 `null` 时读取数据最小值 |
| `maxValue` | `number \| null` | `null` | 热力值上限；为空时读取数据最大值 |
| `bounds` | `number[] \| null` | `null` | 固定范围 `[west, south, east, north]` |
| `allowPicking` | `boolean` | `false` | Primitive 是否参与 Cesium 拾取 |

Canvas 会根据地理范围和中心纬度自动计算宽高比，避免非正方形区域被拉伸。单个点可通过 `properties.radius` 覆盖默认半径。

## 数据规范

数据使用统一的 GeoJSON Feature 数组。`geometry` 必须为 `Point`，经纬度放在 `coordinates` 中，权重放在 `properties.value` 中。

```js
const heatData = [
  {
    geometry: {
      type: 'Point',
      coordinates: [125.834, 44.147],
    },
    properties: {
      id: 'heat-01',
      value: 96,
      radius: 88,
    },
  },
]
```

## 使用示例

```js
import { MapLayers } from 'b-map-viewer'

const layer = new MapLayers.HeatmapPrimitiveLayer(viewer, {
  renderType: 'primitive',
  radius: 108,
  blur: 0.86,
  canvasSize: 1200,
  minValue: 0,
  maxValue: 100,
  maxOpacity: 0.82,
})

layer.setData(heatData)

// 使用现有数据重新计算热力纹理
layer.setOptions({ radius: 116, maxOpacity: 0.76 })

// 页面卸载时释放 Primitive 与离屏 Canvas
layer.destroy()
```

## 无闪烁更新

`setData()`、`setOptions()`、`updateRadius()` 和 `updateHeatmap()` 均使用双缓冲更新：

1. 旧热力图继续显示。
2. 新图层在透明状态下完成几何创建、着色器编译和纹理上传。
3. 新图层准备完成后，在渲染帧结束阶段替换旧图层。
4. 快速连续更新时，自动取消并释放尚未完成的中间结果。

Primitive 和 Entity 模式直接使用 Canvas 作为材质纹理，不经过 Data URL 的异步图片解码。调用方不需要在更新前手动 `hide()` 或 `clearLayer()`。

## 方法

| 方法 | 说明 |
| --- | --- |
| `setData(features)` | 设置或更新标准点数据并重建热力图 |
| `setOptions(options)` | 更新配置并使用现有数据重新渲染 |
| `updateHeatMapMaxMin({ min, max })` | 更新热力值范围 |
| `updateHeatmap(options)` | `setOptions()` 的热力配置更新别名 |
| `updateRadius(radius)` | 更新全部点位的默认影响半径 |
| `show()` / `hide()` | 显示或隐藏当前图层 |
| `clearLayer()` | 清除 Cesium 图层和离屏 Canvas，保留原始数据 |
| `destroy()` | 销毁图层并释放 Viewer 引用 |
