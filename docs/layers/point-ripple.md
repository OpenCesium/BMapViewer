# PointRippleLayer 点扩散图层

`PointRippleLayer` 类用于在 Cesium 中实现基于点状要素的动态扩散效果。该图层利用自定义材质（Material）和 `Entity` 的 `ellipse` 图形来实现平滑的径向扩散动画。
## 组件案例

<LayerExamplePreview example="point-ripple" title="PointRippleLayer 点扩散" />
## 构造函数

`new PointRippleLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局默认样式配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| color | string | '#ff2d2d' | 扩散圆的颜色（CSS 颜色字符串） |
| radius | number | 1500 | 扩散最大半径（单位：米） |
| duration | number | 3000 | 单次扩散周期的持续时间（单位：毫秒） |
| speed | number | 1.0 | 扩散速度倍率 |
| innerFade | number | 1.5 | 内环淡入程度（控制中心部分的透明感） |
| ringWidth | number | 0.01 | 环的相对宽度（0.0-1.0） |
| height | number | 0 | 离地高度 |

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html#点) 的点数据数组。
- 描述：清空当前图层并批量加载扩散圆。

### addLayer(options)
- 参数：`options` (Object) - 单个扩散点的配置。
  - `geometry`: 包含 `coordinates` (经纬度数组)。
  - `properties`: 可选，包含 `id`, `radius`, `color`, `duration`, `speed`, `innerFade`, `ringWidth` 等，用于覆盖全局配置。
- 返回值：`Cesium.Entity`
- 描述：在图层中添加一个动态扩散圆。

### clearLayer()
- 描述：移除当前图层中所有的 Entity。

### show() / hide()
- 描述：控制图层的显示与隐藏。

### getLayerById(id)
- 参数：`id` (string) - 扩散点的唯一标识符。
- 返回值：`Cesium.Entity | null`

### removeById(id)
- 参数：`id` (string) - 扩散点的唯一标识符。

### destroy()
- 描述：从场景中移除数据源并销毁图层。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化图层
const rippleLayer = new MapLayers.PointRippleLayer(viewer, {
    color: '#00ffff',
    radius: 2000,
    duration: 4000
});

// 2. 加载数据
rippleLayer.setData([
    {
        geometry: {
            type: 'Point',
            coordinates: [125.834, 44.147, 0]
        },
        properties: {
            id: 'ripple-1',
            color: '#ff0000', // 为特定点设置颜色
            radius: 3000
        }
    }
]);

// 3. 获取实体
const entity = rippleLayer.getById('ripple-1');
```

## 实现细节
- 图层在初始化时会自动调用 `registerPointRippleMaterial()` 来注册名为 `PointRipple` 的 Cesium 自定义材质。
- 实体的渲染基于 `ellipse` 图形的 `semiMajorAxis` 和 `semiMinorAxis`。
