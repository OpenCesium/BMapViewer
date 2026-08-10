# 图层模块

通过 `MapLayers` 访问内置图层：

```js
import { MapLayers } from 'b-map-viewer'
```

当前图层按用途分为以下几类：

| 分类 | 图层 |
| --- | --- |
| 基础底图 | `BaseMapLayer` |
| 点位与标注 | `IconGroupLayer`、`LabelGroupLayer`、`BubbleLayer`、`BubbleGroupLayer` |
| 线与面 | `LineGroupLayer`、`LinePrimitiveLayer`、`LineMaterialLayer`、`PolygonPrimitiveLayer` |
| 动态效果 | `CircleGroupLayer`、`CircleWaveLayer`、`CircleExplosionLayer`、`PointRippleLayer` |
| 三维场景 | `Build3DLayer`、`RadarScanner3DLayer` |
| 专题分析 | `HeatmapLayer`、`HeatmapPrimitiveLayer` |

图层构造函数的第一个参数统一为 `Cesium.Viewer`。多数图层提供 `setData`、`show`、`hide`、`clearLayer` 或 `destroy` 中的一组生命周期方法，具体以对应源码为准。

## CircleGroupLayer 示例

```js
const layer = new MapLayers.CircleGroupLayer(viewer, {
  radius: 300,
  fillColor: '#37d6ff',
  opacity: 0.65,
})

layer.setData([
  {
    geometry: { coordinates: [116.3974, 39.9093, 0] },
    properties: { id: 'point-1' },
  },
])

// 页面销毁时
layer.destroy()
```

## BaseMapLayer 说明

`BaseMapLayer` 适用于 URL 模板影像，并内置高德墨卡托偏移修正。如果影像服务使用标准 Web Mercator 或其他坐标体系，建议根据服务规范使用 Cesium 原生 `ImageryLayer` / `UrlTemplateImageryProvider`。
