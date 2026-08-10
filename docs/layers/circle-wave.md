# CircleWaveLayer 水波纹扩散图层

`CircleWaveLayer` 类用于在 Cesium 中实现连续的水波纹扩散效果。该图层利用自定义材质和 `Entity` 的 `ellipse` 图形来实现类似水面波纹逐层向外扩散的动态视觉效果，支持配置波纹数量和颜色。
## 效果预览：
![An image](/layer/circle-wave.gif)
## 构造函数

`new CircleWaveLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局默认样式配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| color | string | '#fbad06' | 波纹颜色 |
| radius | number | 1000 | 扩散最大半径（单位：米） |
| duration | number | 3000 | 单次扩散周期的持续时间（单位：毫秒） |
| count | number | 5 | 波纹环的数量 |

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html#点) 的点数据数组。
- 描述：清空当前图层并批量加载水波纹。

### addLayer(options)
- 参数：`options` (Object) - 单个水波纹点的配置。
  - `geometry`: 包含 `coordinates` (经纬度数组)。
  - `properties`: 可选，包含 `id`, `radius`, `color`, `duration`, `count` 等，用于覆盖全局配置。
- 返回值：`Cesium.Entity`
- 描述：在图层中添加一个动态水波纹。

### clearLayer()
- 描述：移除当前图层中所有的 Entity。

### show() / hide()
- 描述：控制图层的显示与隐藏。

### getLayerById(id)
- 参数：`id` (string) - 水波纹点的唯一标识符。
- 返回值：`Cesium.Entity | null`

### removeLayer(circle)
- 参数：`circle` (Cesium.Entity) - 需要移除的圆实例。

### removeLayerById(id)
- 参数：`id` (string) - 唯一标识符。

### destroy()
- 描述：从场景中移除数据源并销毁图层。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化图层
const waveLayer = new MapLayers.CircleWaveLayer(viewer, {
    color: '#00ff00',
    count: 3,
    radius: 1500
});

// 2. 加载数据
waveLayer.setData([
    {
        geometry: {
            type: 'Point',
            coordinates: [116.40, 39.90, 0]
        },
        properties: {
            id: 'wave-1',
            count: 5 // 覆盖全局配置
        }
    }
]);

// 3. 获取实体
const entity = waveLayer.getLayerById('wave-1');
```

## 实现细节
- 图层在初始化时会自动调用 `registerCircleWaveMaterial()` 来注册名为 `CircleWave` 的自定义材质。
- 波纹的动态效果通过自定义材质属性 `CircleWaveMaterialProperty` 实现。
- 实体的渲染基于 `ellipse` 图形的 `semiMajorAxis` 和 `semiMinorAxis`。
