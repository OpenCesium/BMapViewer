# GradientWallLayer 渐变立体墙图层

`GradientWallLayer` 使用 Cesium `WallGraphics` 将标准线、面数据渲染为垂直立体墙，并通过运行时生成的 Canvas 纹理实现从墙底到墙顶的颜色与透明度渐变。它适用于区域边界、电子围栏、警戒区、能量罩边缘和分级防护带。

## 组件案例

<LayerExamplePreview example="gradient-wall" title="GradientWallLayer 渐变立体墙" />

## 构造函数

```js
new MapLayers.GradientWallLayer(viewer, config)
```

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string \| Cesium.Color` | `'#35eaff'` | 默认墙体颜色 |
| `height` | `number` | `900` | 未提供坐标顶高时使用的墙体高度，单位为米 |
| `baseHeight` | `number` | `0` | 墙体底部的绝对高度，单位为米 |
| `opacity` | `number` | `1` | 整体透明度，范围 `0–1` |
| `gradient` | `object \| null` | `null` | 自定义颜色渐变；`0` 表示墙底，`1` 表示墙顶 |
| `opacityStops` | `object` | 底部不透明、顶部透明 | 使用统一颜色时的透明度断点 |
| `closed` | `boolean` | `false` | 是否自动闭合 `LineString` |
| `outline` | `boolean` | `false` | 是否显示墙体轮廓线 |
| `outlineColor` | `string \| Cesium.Color` | `'#bffcff'` | 轮廓线颜色 |
| `idPrefix` | `string` | `'bmap-viewer-gradient-wall'` | 内部 Cesium Entity ID 前缀 |

构造参数可以被单条数据的同名 `properties` 字段覆盖，因此同一个图层中可以显示不同高度、颜色和渐变的墙体。

## 数据规范

图层接受 BMapViewer 统一的 GeoJSON Feature 数组，支持以下几何类型：

- `LineString`
- `MultiLineString`
- `Polygon`
- `MultiPolygon`

`Polygon` 的每个环会分别生成闭合墙体；`LineString` 默认保持开放，可以通过 `properties.closed` 闭合。

```js
const wallData = [
  {
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [125.82, 44.14],
        [125.85, 44.14],
        [125.85, 44.16],
        [125.82, 44.16],
        [125.82, 44.14],
      ]],
    },
    properties: {
      id: 'warning-area',
      name: '警戒区域',
      color: '#35eaff',
      baseHeight: 20,
      height: 800,
    },
  },
]
```

### 高度优先级

二维坐标 `[经度, 纬度]` 使用 `baseHeight + height` 作为顶高。三维坐标 `[经度, 纬度, 高度]` 的第三位表示该顶点的绝对顶高，可用于制作高度起伏的墙体：

```js
{
  geometry: {
    type: 'LineString',
    coordinates: [
      [125.80, 44.13, 420],
      [125.81, 44.14, 680],
      [125.82, 44.15, 920],
    ],
  },
  properties: {
    id: 'variable-height-wall',
    baseHeight: 20,
  },
}
```

## 渐变配置

默认情况下，`color` 配合 `opacityStops` 生成同色透明渐变。断点位置遵循业务高度方向：`0` 是墙底，`1` 是墙顶。

```js
const layer = new MapLayers.GradientWallLayer(viewer, {
  color: '#35eaff',
  opacityStops: {
    0.0: 1.0,
    0.35: 0.7,
    0.7: 0.25,
    1.0: 0.0,
  },
})
```

需要多色渐变时传入 CSS 颜色字符串：

```js
const layer = new MapLayers.GradientWallLayer(viewer, {
  gradient: {
    0.0: 'rgba(255, 70, 150, 0.95)',
    0.5: 'rgba(175, 90, 255, 0.55)',
    1.0: 'rgba(70, 150, 255, 0)',
  },
})
```

## 方法

| 方法 | 说明 |
| --- | --- |
| `setData(features)` | 清除旧数据并加载标准线、面数据 |
| `setOptions(options)` | 更新全局配置并使用现有数据重新渲染 |
| `addLayer(feature)` | 追加一条墙体数据 |
| `removeLayer(entity)` | 移除指定 Cesium Entity |
| `removeLayerById(id)` | 移除业务 ID 对应的全部墙体 |
| `getLayerById(id)` | 获取业务 ID 对应的第一个墙体 Entity |
| `getLayersById(id)` | 获取业务 ID 对应的全部墙体 Entity |
| `getLayerDataById(id)` | 获取对应的原始 Feature 数据 |
| `show()` / `hide()` | 显示或隐藏当前图层的全部墙体 |
| `clearLayer()` | 清除当前图层创建的 Entity，保留原始数据 |
| `destroy()` | 销毁图层并释放 Viewer 引用 |

## 地形深度检测

图层不会擅自修改 Viewer 的全局场景设置。需要墙体与地形进行正确遮挡时，由应用按需开启：

```js
viewer.scene.globe.depthTestAgainstTerrain = true
```
