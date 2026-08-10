# LinePrimitiveLayer 高性能线图层

`LinePrimitiveLayer` 类使用 Cesium 的 `Primitive` API 来渲染线几何体。相比 `PolylineCollection`，它在渲染大规模线数据时具有更好的性能和更低的内存占用。该图层通常用于需要极致渲染效率的场景。
## 效果预览：
![An image](/layer/line-primitive.gif)
## 构造函数

`new LinePrimitiveLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局样式配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| width | number | 2 | 线条宽度（单位：像素） |
| color | string | '#ffffff' | 默认线颜色（CSS 颜色字符串） |

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html#线) 的线数据数组。
- 描述：清空当前图层并使用高性能 Primitive 重新加载批量数据。
- `properties`支持`width`, `color`参数。
### getLayerById(id)
- 参数：`id` (string) - 线的唯一标识符。
- 返回值：`Cesium.GeometryInstanceAttributes`
- 描述：获取指定 ID 的线对象（几何体实例属性）。

### getLayerDataById(id)
- 参数：`id` (string) - 线的唯一标识符。
- 返回值：`Object`
- 描述：根据 ID 在原始 `data` 数组中查找对应的原始数据项。

### clearLayer()
- 描述：从场景中移除当前的 Primitive。

### show() / hide()
- 描述：控制图层的显示与隐藏。

### destroy()
- 描述：清空图层并释放资源。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化高性能线图层
const primitiveLayer = new MapLayers.LinePrimitiveLayer(viewer, {
    width: 2,
    color: '#ffcc00'
});

// 2. 批量加载数据
primitiveLayer.setData([
    {
        geometry: {
            type: 'LineString',
            coordinates: [
                [116.40, 39.90],
                [116.41, 39.91]
            ]
        },
        properties: {
            id: 'p-line-1',
            color: '#ff0000', // 为特定线条定义颜色
            width: 5
        }
    }
]);

// 3. 获取数据
const item = primitiveLayer.getLayerDataById('p-line-1');
console.log(item.properties.name);
```

## 注意事项
- `LinePrimitiveLayer` 使用的是 `PolylineColorAppearance`，主要通过 `GeometryInstance` 的 attributes 来控制颜色，适合数据量大且样式相对统一的场景，也支持在`properties`中定义单独线的颜色。
- 相比于 `LineGroupLayer`（Entity/Collection），Primitive 的交互（如点击拾取）和动态更新开销更低，但其 API 相对更底层。
