# PickTools 鼠标拾取工具

`PickTools` 类是一个功能强大的交互式绘图和拾取工具，支持在 Cesium 场景中绘制点、图标、线和面。它内置了交互反馈（如跟随鼠标的虚线、浮动提示标签）以及基于拖拽的几何体编辑功能。

示例站提供独立的拾取工作台。进入示例主页后选择“拾取与绘制工具”，可以切换四种模式、编辑代码并查看实时坐标回调。

## 构造函数

`new PickTools(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 全局配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| lineWidth | number | 2 | 线条或边界的宽度（像素） |
| color | string | "#00ffff" | 几何体的主要颜色 |
| pointSize | number | 10 | 节点点的大小（像素） |
| isReserve | boolean | false | 绘制结束后是否保留几何体在地图上 |
| mouseHints | object | - | 鼠标跟随提示配置 |
| mouseHints.show | boolean | false | 是否显示鼠标提示标签 |
| mouseHints.text | string | '左键拾取,双击结束' | 提示标签的基础文本 |
| icon | object | - | 图标配置（用于 `pickPointIcon`） |
| icon.url | string | - | 图标图片地址 |
| icon.width | number | 32 | 图标显示宽度 |
| icon.height | number | 32 | 图标显示高度 |

## 核心方法

## pickPoint(callback, data) 点绘制
- 参数：
  - `callback`: (Array) => void。完成后回调，返回 `[lon, lat]`。
  - `data`: (Array, 可选)。初始坐标，若传入则直接进入编辑模式。
- 描述：在地图上点击以拾取一个点。如果 `isReserve` 为真，绘制后允许拖拽点位进行编辑。

![An image](/pick/point.gif)

## pickPointIcon(callback, data) 图标点绘制
- 描述：逻辑同 `pickPoint`，但渲染为 Billboard 图标。

![An image](/pick/icon.gif)

## pickLine(callback, data) 线绘制
- 参数：
  - `callback`: (Array) => void。完成后回调，返回坐标数组 `[[lon, lat], ...]`。
  - `data`: (Array, 可选)。初始点位数组，若传入则直接进入编辑模式。
- 交互：左键点击添加点，**双击**结束绘制。
- 描述：绘制折线。绘图过程中会有虚线跟随鼠标，若 `isReserve` 为真，结束绘制后可通过拖拽折点进行修改。
![An image](/pick/line.gif)

## pickPolygon(callback, data) 多边形绘制
- 交互：左键点击添加点，**双击**自动闭合并结束绘制。
- 描述：绘制多边形面。支持实时填充预览。

![An image](/pick/poly.gif)

### clear()
- 描述：清空场景中由该工具创建的所有实体。

![An image](/pick/clear.gif)

### destroy()
- 描述：移除鼠标监听器并清理临时标签。

## 使用示例

```js
import { PickTools } from "b-map-viewer";

const tools = new PickTools(viewer, {
    color: '#ff0000',
    isReserve: true,
    mouseHints: { show: true }
});

// 1. 拾取一个点
tools.pickPoint((coords) => {
    console.log('拾取点坐标：', coords); // [lon, lat]
});

// 2. 绘制多边形并进入编辑模式
tools.pickPolygon((points) => {
    console.log('多边形顶点：', points); // [[lon, lat], ...]
});

// 3. 销毁工具
// tools.destroy();
```

## 功能特性

- **交互反馈**：在绘制线和面时，程序会自动计算并显示一段跟随鼠标的临时路径（线为虚线段，面为连接首尾的闭合填充区域），提供良好的预判感。
- **编辑模式**：当 `isReserve` 设置为 `true` 时，几何体在绘制完成后不会消失。此时，工具将开启编辑监听，用户可以点击并拖拽几何体的任意节点（折点）进行实时位置调整，每次松开均会触发回调。
- **坐标感知**：鼠标移动时，工具会自动在光标处悬浮显示当前的经纬度坐标（需开启 `mouseHints.show`）。
- **坐标规范**：所有回调返回的坐标均为 WGS84 经纬度数组，方便与业务系统对接。
