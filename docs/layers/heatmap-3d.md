# Heatmap3DLayer 3D 热力图图层

`Heatmap3DLayer` 将点位权重绘制为连续热力纹理，并把纹理对应的热度抬升为三角网格。低值区域以半透明颜色贴近底图，高值区域形成宽缓峰体与热点平台，可以通过侧视角直接比较不同区域的热度强弱。

## 组件案例

<LayerExamplePreview example="heatmap-3d" title="Heatmap3DLayer 3D 热力图" />

## 构造函数

```js
new MapLayers.Heatmap3DLayer(viewer, config)
```

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `radius` | `number` | `28` | 热力点在内部 Canvas 中的影响半径，单位为像素 |
| `blur` | `number` | `0.75` | 热力点的模糊程度 |
| `gradient` | `object` | 蓝—绿—黄—红 | 热度颜色渐变 |
| `maxOpacity` | `number` | `0.72` | 纹理最大透明度 |
| `minOpacity` | `number` | `0` | 纹理最小透明度 |
| `canvasSize` | `number` | `256` | 内部热力纹理分辨率，范围 `64–1024` |
| `gridSize` | `number` | `160` | 每个方向的网格分段数，范围 `16–255` |
| `padding` | `number` | `0.14` | 自动边界向外扩展的比例 |
| `baseHeight` | `number \| null` | `null` | 网格基础高度；为空时读取点坐标中的最低高度，否则使用 `0` |
| `heightScale` | `number` | `1` | 每一个热力值对应的抬升高度，单位为米 |
| `heightExponent` | `number` | `0.85` | 高度曲线指数；小于 `1` 时峰体更宽缓，大于 `1` 时热点更集中 |
| `peakBoost` | `number` | `320` | 黄红热点区域的附加抬升高度，单位为米 |
| `minValue` | `number` | `0` | 热力值下限 |
| `maxValue` | `number \| null` | `null` | 热力值上限；为空时自动读取数据最大值 |
| `bounds` | `number[] \| null` | `null` | 固定范围 `[west, south, east, north]`，为空时自动计算 |
| `allowPicking` | `boolean` | `false` | 是否允许 Cesium 拾取网格 |

## 数据规范

数据使用 BMapViewer 统一的 GeoJSON Feature 数组。`geometry` 必须是 `Point`，坐标为 `[经度, 纬度, 高度?]`；热力权重放在 `properties.value` 中。

```js
[
  {
    geometry: {
      type: 'Point',
      coordinates: [125.8337, 44.1471, 20],
    },
    properties: {
      id: 'heat-01',
      value: 100,
      radius: 30,
    },
  },
]
```

`properties.radius` 为可选字段，用于覆盖单个点的 Canvas 半径。非法坐标、非 `Point` 几何或非数值 `value` 会被忽略。

## 使用示例

```js
import { MapLayers } from 'b-map-viewer'

const layer = new MapLayers.Heatmap3DLayer(viewer, {
  radius: 36,
  gridSize: 200,
  heightScale: 0.8,
  heightExponent: 0.85,
  peakBoost: 260,
  baseHeight: 20,
})

layer.setData([
  {
    geometry: { type: 'Point', coordinates: [125.8337, 44.1471] },
    properties: { id: 'center', value: 100 },
  },
  {
    geometry: { type: 'Point', coordinates: [125.842, 44.151] },
    properties: { id: 'east', value: 65 },
  },
])

layer.hide()
layer.show()

// 更新参数时会使用现有数据重新构建网格，并在新网格就绪后自动替换
layer.setOptions({ heightScale: 16 })

// 页面卸载时释放 Primitive 和内部 Canvas
layer.destroy()
```

## 方法

| 方法 | 说明 |
| --- | --- |
| `setData(features)` | 设置或更新标准点数据并重建热力网格 |
| `setOptions(options)` | 更新图层参数并使用现有数据重新渲染 |
| `show()` | 显示网格 |
| `hide()` | 隐藏网格 |
| `clearLayer()` | 清除 Primitive 与内部 Canvas，保留原始数据 |
| `destroy()` | 销毁图层并释放 Viewer 引用 |

## 无闪烁更新

`setData()` 和 `setOptions()` 内部使用双缓冲更新。旧网格会继续显示，新网格则在透明状态下完成几何构建、着色器编译和 Canvas 纹理上传；准备完成后，两者会在渲染帧结束时一次性切换。

调用方不需要在更新前手动执行 `hide()`、`clearLayer()` 或重新创建图层，直接更新即可：

```js
layer.setData(nextHeatData)
layer.setOptions({ radius: 42, heightScale: 1.1 })
```

连续快速更新时，尚未完成的中间网格会被自动取消并释放，只保留最后一次更新结果。
