# 图层交互示例

在线案例提供可编辑的 Cesium 图层工作台。运行 `npm run dev` 后，可以完成图层切换、代码修改、重新运行和地图效果检查。

## 工作台结构

- **能力目录**：按基础图层、点位标注、线面图层、三维场景、动态效果和专题分析分类展示全部图层。
- **代码轨道**：默认折叠在目录右侧；点击 `›` 展开代码，支持直接编辑，点击 `‹` 可再次收起。
- **运行控制**：按 `Ctrl + Enter` 或点击“运行当前示例”即可重新执行代码。
- **地图预览**：持续显示 Cesium 运行结果、执行状态、耗时和地图坐标。

每次切换或重新运行示例时，工作台会清理上一次示例创建的 Entity、DataSource、Primitive、ImageryLayer 和 DOM 资源，避免重复叠加。

## 离线地图瓦片

示例底图统一读取 `public/tiles` 目录：

```text
public/tiles/{z}/{x}/{reverseY}.png
```

现有瓦片采用 TMS 行号，所以 URL 中使用 Cesium 的 `{reverseY}` 模板变量。示例配置的层级范围是 `Z1—Z12`，初始视角位于当前瓦片覆盖范围内。

## 图层示例模块

每个 SDK 图层都有一个独立示例模块，统一放在 `examples/layers` 中：

| 分类 | 示例模块 |
| --- | --- |
| 基础图层 | `BaseMapLayer` |
| 点位标注 | `IconGroupLayer`、`LabelGroupLayer`、`BubbleLayer`、`BubbleGroupLayer` |
| 线面图层 | `LineGroupLayer`、`LinePrimitiveLayer`、`PolygonPrimitiveLayer`、`LineMaterialLayer` |
| 三维场景 | `Build3DLayer`、`RadarScanner3DLayer` |
| 动态效果 | `CircleGroupLayer`、`CircleWaveLayer`、`CircleExplosionLayer`、`PointRippleLayer` |
| 专题分析 | `HeatmapLayer`、`HeatmapPrimitiveLayer` |

`Build3DLayer` 直接使用 `public/3d-tiles/tileset.json` 及其关联的本地 GLB 数据，不依赖远程 3D Tiles 服务。

## 编辑器运行上下文

编辑器中的代码是异步函数体，可直接访问以下变量：

```js
viewer          // 当前 Cesium.Viewer
Cesium          // Cesium 命名空间
MapLayers       // SDK 图层模块
tileUrl         // public/tiles 的离线瓦片模板地址
buildingTilesetUrl // public/3d-tiles/tileset.json 地址
```

建议在代码最后返回图层实例或清理函数：

```js
const layer = new MapLayers.CircleGroupLayer(viewer, {
  radius: 700,
  fillColor: '#00d9e7',
})

layer.setData([
  {
    geometry: { type: 'Point', coordinates: [125.833, 44.147] },
    properties: { id: 'circle-demo' },
  },
])

return layer
```

工作台会优先调用返回值的 `destroy()`、`removeLayer()` 或清理函数，并对遗漏的 Cesium 资源执行兜底回收。
