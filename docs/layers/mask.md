# MaskLayer 区域遮罩图层

`MaskLayer` 使用符合 SDK 数据规范的 GeoJSON `Polygon` 或 `MultiPolygon` 构建区域遮罩。默认情况下，传入的数据是保持可见的透视区域，区域外侧会覆盖半透明颜色，适合行政区聚焦、业务区域突出和场景范围限制。

## 组件案例

<LayerExamplePreview example="mask" title="MaskLayer 区域遮罩" />

## 构造函数

```js
new MapLayers.MaskLayer(viewer, config)
```

### config 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `id` | string | `mask-layer` | 反向遮罩 Primitive 的默认 ID |
| `color` | string | `#04131f` | 遮罩颜色，支持 CSS 颜色字符串 |
| `opacity` | number | `0.68` | 遮罩透明度，范围为 `0-1` |
| `inverse` | boolean | `true` | `true` 遮挡数据区域外侧，`false` 填充数据区域本身 |
| `outline` | boolean | `true` | 是否显示透视区域边线 |
| `outlineColor` | string | `#4ff4e1` | 边线颜色 |
| `outlineOpacity` | number | `0.95` | 边线透明度 |
| `outlineWidth` | number | `2` | 边线宽度，单位为像素 |
| `clampToGround` | boolean | `false` | 是否使用 Cesium 贴地 Primitive；普通场景建议保持默认值 |
| `height` | number | `0` | 非贴地模式下的统一高度，单位为米 |
| `classificationType` | string \| number | `both` | `terrain`、`3d-tiles` 或 `both` |
| `show` | boolean | `true` | 初始是否显示 |

`properties` 中的同名样式会覆盖构造函数配置。反向遮罩会合并全部数据为一个遮罩，使用第一条数据的 `properties` 作为整体样式。

## 数据格式

```js
const data = [
  {
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [125.807, 44.159],
        [125.819, 44.169],
        [125.858, 44.157],
        [125.839, 44.126],
        [125.807, 44.159],
      ]],
    },
    properties: {
      id: 'jiutai-focus-area',
      name: '九台重点区域',
    },
  },
]
```

坐标顺序统一为 `[经度, 纬度]`。`Polygon` 支持内环，`MultiPolygon` 支持多个独立透视区域。

## 使用示例

```js
import { MapLayers } from 'b-map-viewer'

const mask = new MapLayers.MaskLayer(viewer, {
  color: '#03111d',
  opacity: 0.72,
  outlineColor: '#55f7df',
  outlineWidth: 3,
})

mask.setData(data)

// 运行时调整颜色、透明度等参数，现有数据会自动重新渲染
mask.setOptions({
  color: '#071f35',
  opacity: 0.55,
})
```

反向遮罩不需要额外设置外边界。图层会自动创建全球外环，并将传入的 `Polygon` 或 `MultiPolygon` 作为透明孔洞，因此无论相机如何移动，数据范围以外的区域都会保持遮罩状态。

## 方法

| 方法 | 说明 |
| --- | --- |
| `setData(data)` | 替换数据并重新创建遮罩，返回当前实例 |
| `addLayer(item)` | 添加一个 Polygon/MultiPolygon 数据并重建遮罩 |
| `setOptions(options)` | 合并颜色、透明度等配置并重新渲染 |
| `getLayerById(id)` | 获取遮罩 Primitive 的实例属性；异步贴地渲染尚未就绪时返回 Primitive 引用 |
| `getLayerDataById(id)` | 获取指定 ID 的原始数据 |
| `removeLayerById(id)` | 删除指定数据并重新构建遮罩 |
| `clearLayer()` | 清空数据及遮罩 Primitive |
| `show()` / `hide()` | 显示或隐藏遮罩与边线 Primitive |
| `destroy()` | 从 Viewer 移除 Primitive 并释放引用 |
