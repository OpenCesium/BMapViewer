# IconGroupLayer 图标组图层

`IconGroupLayer` 类用于在 Cesium 中批量渲染图标（Billboard）。它通过 `Cesium.BillboardCollection` 实现，具有较高的渲染性能，支持自定义图标样式、颜色以及针对不同距离的缩放控制。
## 组件案例

<LayerExamplePreview example="icon-group" title="IconGroupLayer 图标标注" />
## 构造函数

`new IconGroupLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局图标配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| icon | string | - | 默认图标图片的 URL 或 Base64 |
| width | number | 60 | 图标显示的像素宽度 |
| height | number | 60 | 图标显示的像素高度 |
| disableDepthTestDistance | number | 100 | 禁用深度测试的距离（米），防止图标淹没在地表下 |
| color | string | '#ffffff' | 图标的叠加颜色 |

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html) 的点数据数组。
- 描述：清空当前图层并批量加载新数据。

### addLayer(options)
- 参数：`options` (Object) - 单个图标的配置，包含 `geometry` 和 `properties`。
- 返回值：`Cesium.Billboard`
- 描述：向图层添加单个图标。如果 `properties` 中包含 `icon` 或 `color`，会覆盖全局配置。

### removeLayer(billboard)
- 参数：`billboard` (Cesium.Billboard) - 需要移除的图标实例。
- 描述：从图层中移除指定的图标。
### getLayerById(id)
- 参数：`id` (string) - 图标的唯一标识符。
- 描述：从图层中获取指定 ID 的图标。

### removeLayerById(id)
- 参数：`id` (string) - 图标的唯一标识符。
- 描述：从图层中移除指定 ID 的图标。

### clearLayer()
- 描述：清空图层中所有的图标。

### show() / hide()
- 描述：控制整个图层的显示与隐藏。

### destroy()
- 描述：销毁图层并释放资源。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化图标组图层
const iconLayer = new MapLayers.IconGroupLayer(viewer, {
    icon: './assets/marker.png',
    width: 48,
    height: 48
});

// 2. 加载数据
iconLayer.setData([
    {
        geometry: {
            type: 'Point',
            coordinates: [125.834, 44.147]
        },
        properties: {
            id: 'marker-1',
            name: '北京站',
            color: '#ff0000' // 为该点设置特定颜色
        }
    }
]);

// 3. 隐藏图层
// iconLayer.hide();
```
