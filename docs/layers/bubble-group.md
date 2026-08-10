# BubbleGroupLayer 气泡组图层

`BubbleGroupLayer` 类用于在 Cesium 中批量管理和显示动态气泡（Popup/Tooltip 风格的标签）。它基于 `Cesium.BillboardCollection` 实现，支持复杂的**碰撞检测**、**遮挡自动隐藏**以及**自定义可视区域**过滤。
## 效果预览：
![An image](/layer/bubble.gif)
## 构造函数

`new BubbleGroupLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局默认样式和行为配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| baseColor | string | "#40aee2" | 气泡标题栏颜色 |
| bodyColor | string | "#11374c" | 气泡主体背景颜色 |
| headerOpacity | number | 0.8 | 标题栏透明度 |
| bodyOpacity | number | 0.5 | 主体背景透明度 |
| offset | array | `[0, 0]` | 像素偏移量 `[x, y]` |
| showTitle | boolean | false | 是否显示标题 |
| align | string | 'left' | 内容对齐方式 |
| enableCollisionDetection | boolean | true | 是否启用气泡间的碰撞检测 |
| collisionThreshold | number | 0.3 | 碰撞阈值（重叠面积比例） |
| hideStrategy | string | 'smaller' | 隐藏策略：`smaller` (隐藏面积小的), `newer` (隐藏新创建的), `distance` (隐藏离屏幕中心远的) |
| allowClick | boolean | false | 是否允许点击交互（若为 false 则 pick 时忽略） |

## 方法说明

### setData(data)
- 参数：`data` (Array) - 符合 [数据规范](/data.html#点) 的点数据数组。
- 描述：清空当前图层并批量加载气泡。

### addLayer(options)
- 参数：`options` (Object) - 单个气泡的配置。
  - `geometry`: 包含 `coordinates` (经纬度数组)。
  - `properties`: 包含 `id`, `title`, `content` (正文数组) 等。
- 返回值：`Cesium.Billboard`
- 描述：在图层中添加一个气泡并返回 Billboard 实例。

### setVisibleArea(geometry)
- 参数：`geometry` (Object) - Turf.js 格式的多边形或多边形集合。
- 描述：设置自定义可视区域。气泡只有在地理位置位于该区域内时才会被渲染。

### clearVisibleArea()
- 描述：清除自定义可视区域，恢复为全局可见。

### updateLayerById(id, options)
- 参数：`id` (string), `options` (Object)
- 描述：根据 ID 更新气泡的内容并重新绘制 Canvas 贴图。
### getLayerById(id)
- 参数：`id` (string)
- 返回值：`Cesium.Billboard | null`
- 描述：根据 ID 获取气泡实例。

### removeLayer(billboard)
- 参数：`billboard` (Cesium.Billboard) - 需要移除的气泡实例。

### removeLayerById(id)
- 参数：`id` (string) - 唯一标识符。

### clearLayer()
- 描述：清空图层中所有的气泡。

### show() / hide()
- 描述：控制图层的显示与隐藏。

### destroy()
- 描述：销毁图层，清理 `onTick` 事件监听和资源。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化气泡图层
const bubbleLayer = new MapLayers.BubbleGroupLayer(viewer, {
    showTitle: true,
    baseColor: '#ff0000',
    hideStrategy: 'distance' // 优先显示靠近屏幕中心的气泡
});

// 2. 加载数据
bubbleLayer.setData([
    {
        geometry: {
            type: 'Point',
            coordinates: [116.40, 39.90]
        },
        properties: {
            id: 'bubble-1',
            title: '监控设备01',
            content: [
                { label: '状态', value: '在线', color: '#00ff00' },
                { label: '温度', value: '25℃' }
            ]
        }
    }
]);

// 3. 更新特定气泡
bubbleLayer.updateLayerById('bubble-1', {
    title: '更新后的标题',
    content: [{ label: '实时流量', value: '120 kb/s' }]
});
```

## 实现细节
- **Canvas 渲染**：每个气泡都是通过 `createBillboardCanvas` 将配置渲染成 HTML Canvas，然后作为 Billboard 的 `image`。
- **动态更新**：图层内部监听 `viewer.clock.onTick` 事件，实时计算气泡的屏幕位置、缩放和偏移，并执行碰撞检测。
- **碰撞算法**：基于屏幕矩形相交面积比例。如果两个气泡重叠面积超过 `collisionThreshold`，则根据 `hideStrategy` 自动隐藏其中一个，确保界面不拥挤。
- **性能优化**：通过 `scaleByDistance` 控制远近缩放，并通过可视区域裁剪（屏幕裁剪 + 地理区域裁剪）减少渲染开销。
