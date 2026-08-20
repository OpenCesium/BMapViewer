# HeatmapLayer 热力图图层

`HeatmapLayer` 类用于在 Cesium 中渲染地理热力图。它通过在后台 Canvas 上绘制径向渐变并将其作为 `Rectangle` 实体的材质来实现。该图层支持自动计算数据边界，并能根据权重值动态映射颜色渐变。
## 组件案例

<LayerExamplePreview example="heatmap" title="HeatmapLayer 热力图" />
## 构造函数

`new HeatmapLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| radius | number | 50 | 像素半径。控制热力点扩散范围 |
| maxValue | number | 100 | 最大权重值。用于归一化数据点权重 |
| gradient | object | {...} | 颜色渐变配置。Key 为 0-1 的比例，Value 为颜色字符串 |

#### 默认渐变配置
```js
{
    0.25: "rgb(0,0,255)",
    0.55: "rgb(0,255,0)",
    0.85: "rgb(255,255,0)",
    1.0: "rgb(255,0,0)"
}
```

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html#点) 的点数据数组。
- 描述：清空当前图层，自动计算所有点位的经纬度边界（增加 0.01 度外扩缓冲），并在 Canvas 上重新绘制热力图。
- 数据结构：需包含 `properties.value` 作为热力权重。

### clearLayer()
- 描述：清空热力点位数据并擦除 Canvas 贴图。

### show() / hide()
- 描述：控制热力图实体的显示与隐藏。

### destroy()
- 描述：从场景中移除热力图实体并释放资源。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化热力图图层
const heatmap = new MapLayers.HeatmapLayer(viewer, {
    radius: 60,
    maxValue: 100,
    gradient: {
        0.4: "blue",
        0.6: "cyan",
        0.8: "yellow",
        1.0: "red"
    }
});

// 2. 加载点位数据
heatmap.setData([
    {
        geometry: { type: 'Point', coordinates: [125.834, 44.147] },
        properties: { value: 80 }
    },
    {
        geometry: { type: 'Point', coordinates: [125.844, 44.157] },
        properties: { value: 50 }
    }
]);
```

## 实现细节
- **Canvas 渲染**：内部维护一个 1024x1024 的离屏 Canvas。每个点位首先以黑白径向渐变（Alpha 通道代表权重）绘制，然后通过 `getImageData` 遍历像素，根据 Alpha 值查表映射为 `gradient` 定义的最终颜色。
- **自动布局**：调用 `setData` 时会自动遍历所有点位计算最小外接矩形（Bounding Box），并应用到 `Cesium.Rectangle` 实体上，确保热力图始终覆盖数据区域。
- **性能优化**：Canvas 绘图使用了 `willReadFrequently: true` 优化频繁的像素读取操作。
