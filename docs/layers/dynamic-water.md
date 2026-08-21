# DynamicWaterLayer 动态体积水图层

`DynamicWaterLayer` 使用细分真实网格承载水面，在顶点着色器中改变网格高度，并在片元着色器中叠加动态法线、菲涅尔反射、高光和浪尖泡沫。镜头移动时，水面几何、光照与反射关系会同步变化，适用于湖泊、水库、河道、海面和数字孪生水域。

## 组件案例

<LayerExamplePreview example="dynamic-water" title="DynamicWaterLayer 动态体积水" />

## 构造函数

```js
new MapLayers.DynamicWaterLayer(viewer, config)
```

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `autoStart` | `boolean` | `true` | 加载数据后是否自动播放动画 |
| `animate` | `boolean` | `true` | 默认是否启用水面动画，可由单条数据覆盖 |
| `timeScale` | `number` | `1` | 动画时间倍率 |
| `waveScale` | `number` | `12` | 波纹空间尺度；值越大，同一范围内波纹越密 |
| `waveHeight` | `number` | `0.82` | 着色器波形强度，会影响浪尖与法线细节 |
| `geometryWaveHeight` | `number` | `260` | 真实网格的最大起伏尺度，单位为米 |
| `choppy` | `number` | `4.2` | 波峰锐利程度 |
| `speed` | `number` | `0.72` | 波浪移动速度 |
| `foam` | `number` | `0.58` | 浪尖泡沫强度，范围 `0–1` |
| `normalStrength` | `number` | `1.9` | 动态法线强度 |
| `fresnel` | `number` | `0.78` | 掠射角反射强度 |
| `specular` | `number` | `2.35` | 太阳高光强度 |
| `alpha` | `number` | `0.92` | 水面整体透明度，范围 `0–1` |
| `height` | `number` | `120` | 二维坐标未指定高度时使用的绝对高度，单位为米 |
| `width` | `number` | `7200` | `Point` 数据生成的矩形水面宽度，单位为米 |
| `depth` | `number` | `4200` | `Point` 数据生成的矩形水面长度，单位为米 |
| `deepColor` | `string \| Cesium.Color \| number[]` | `'#084260'` | 深水颜色 |
| `shallowColor` | `string \| Cesium.Color \| number[]` | `'#36c0c6'` | 浅水颜色 |
| `foamColor` | `string \| Cesium.Color \| number[]` | `'#e7faff'` | 泡沫颜色 |
| `meshSegments` | `number` | `128` | 最长边的网格细分数，限制为 `8–260` |
| `allowPicking` | `boolean` | `false` | 是否允许 Cesium 拾取水面 Primitive |

构造参数均可由单条 Feature 的同名 `properties` 覆盖，因此同一实例可以同时承载不同速度、颜色和波高的水域。

## 数据规范

图层接受 BMapViewer 统一的 GeoJSON Feature 数组，支持 `Polygon`、`MultiPolygon` 和 `Point`。

### Polygon 任意水域

`Polygon` 的外环定义水域边界，第三个坐标值表示水面的绝对基础高度：

```js
const waterData = [{
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [125.81, 44.13, 160],
      [125.85, 44.13, 160],
      [125.86, 44.15, 160],
      [125.82, 44.16, 160],
      [125.81, 44.13, 160],
    ]],
  },
  properties: {
    id: 'reservoir',
    name: '水库',
    geometryWaveHeight: 180,
    speed: 0.65,
  },
}]

layer.setData(waterData)
```

`MultiPolygon` 的每个外环会创建一个 Primitive，并共享同一个业务 `id`。当前实现只使用外环，暂不裁剪内环孔洞；多边形边界由水面网格近似，近距离观察时可适当提高 `meshSegments`。

### Point 矩形水面

`Point` 表示水面中心，配合 `width`、`depth` 快速创建规则矩形水域：

```js
layer.setData([{
  geometry: {
    type: 'Point',
    coordinates: [125.835, 44.14, 150],
  },
  properties: {
    id: 'test-water',
    width: 6000,
    depth: 3600,
  },
}])
```

高度优先级为：坐标第三位、`properties.height`、构造参数 `height`。

## 动画与参数更新

```js
layer.stop()       // 暂停并移除帧监听
layer.start()      // 继续播放
layer.resetTime()  // 从初始水面状态重新开始

layer.setOptions({
  speed: 1.1,
  geometryWaveHeight: 120,
  foam: 0.35,
})
```

`setOptions` 会用现有数据重建网格，以便 `meshSegments` 等几何参数立即生效。需要只修改某块水域时，将参数写入该 Feature 的 `properties` 后重新调用 `setData`。

## 方法

| 方法 | 说明 |
| --- | --- |
| `setData(features)` | 清除旧水面并加载标准 Feature 数组 |
| `setOptions(options)` | 更新全局配置并使用现有数据重建水面 |
| `addLayer(feature)` | 追加一条水域数据 |
| `removeLayer(primitive)` | 移除指定 Cesium Primitive |
| `removeLayerById(id)` | 移除业务 ID 对应的全部水面 |
| `getLayerById(id)` | 获取业务 ID 对应的第一个 Primitive |
| `getLayersById(id)` | 获取业务 ID 对应的全部 Primitive |
| `getLayerDataById(id)` | 获取对应的原始 Feature 数据 |
| `start()` / `stop()` | 播放或暂停水面动画 |
| `resetTime()` | 重置动画时间 |
| `show()` / `hide()` | 显示或隐藏当前图层全部水面 |
| `flyTo(id, duration)` | 飞行到指定水域 |
| `clearLayer()` | 停止动画并移除全部水面 |
| `destroy()` | 销毁图层并释放 Viewer 引用 |

## 性能建议

`meshSegments` 会同时影响顶点数量和真实波峰的平滑度。移动端或大范围水域建议使用 `48–96`，桌面端中等范围建议使用 `96–160`。一个 `160 × 160` 的网格约包含五万组三角形索引，不建议在多个超大水域上同时使用最高细分值。

图层自身维护 Cesium `preRender` 动画监听，销毁组件或切换示例时应调用 `destroy()`。实现不依赖 `dat.gui`；业务系统可以通过 Vue 表单、滑块或其他界面调用 `setOptions`。
