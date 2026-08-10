# Build3DLayer 3D楼宇图层

`Build3DLayer` 类用于加载和管理 Cesium 的 3D Tileset 数据（通常为 3D 楼宇）。该图层支持自定义着色器（CustomShader）以实现动态扫光、高度渐变等视觉效果，并支持在加载过程中根据业务数据动态注入楼宇属性。
## 效果预览：
![An image](/layer/build-tiles.gif)
## 构造函数

`new Build3DLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| config | object | 图层配置项 |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| url | string | - | **必填**。3D Tileset 的 `tileset.json` 地址 |
| name | string | 'Build3DLayer' | 图层名称 |
| show | boolean | true | 是否默认显示 |
| options | object | {} | 透传给 `Cesium3DTileset.fromUrl` 的其他原生选项 |
| alertList | array | [] | 业务属性数据列表，用于在加载瓦片时通过 `id` 映射到楼宇 Feature 上 |
| alertKey | string | - | 在 Feature 上设置业务属性的键名（对应 `alertList` 中的数据项） |

## 方法说明

### load(url)
- 参数：`url` (string, 可选) - 覆盖构造函数中的 URL。
- 返回值：`Promise<Cesium.Cesium3DTileset>`
- 描述：执行 3D Tileset 的异步加载，并应用内置的基础 CustomShader 效果（高度相关的静态光影）。

### setStyle(conditions)
- 参数：`conditions` (Array) - 符合 `Cesium3DTileStyle` 规范的颜色条件数组。
- 描述：设置楼宇的整体样式（如根据高度、ID 过滤颜色）。

### setShader(options)
- 参数：`options` (Object) - 高级着色器配置。
  - `sweepColor`: 扫光颜色（默认 `#00aeeb`）。
  - `minColor`/`maxColor`: 高度渐变底色（默认黑色到蓝色）。
  - `sweepWidth`: 扫光条带宽度（默认 `0.02`）。
  - `modelHeight`: 模型总高度，用于计算渐变比例（默认 `100`）。
  - `speed`: 扫光移动速度（默认 `2.0`）。
  - `active`: 是否启用时间驱动的动画。
- 描述：应用更高级的自定义着色器，实现动态向上扫光的科技感视觉效果。

### show() / hide()
- 描述：显示或隐藏图层。

### clearLayer()
- 描述：从场景中移除 3D Tileset 并释放内部引用。

### destroy()
- 描述：彻底销毁图层并清理所有资源。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化 3D 楼宇图层
const buildLayer = new MapLayers.Build3DLayer(viewer, {
    url: 'http://example.com/tileset/tileset.json',
    alertList: [{ id: 'building_01', status: 'warning' }],
    alertKey: 'status'
});

// 2. 执行加载
await buildLayer.load();

// 3. 应用科技感动态扫光
buildLayer.setShader({
    sweepColor: '#00ff00',
    speed: 3.0,
    modelHeight: 200
});

// 4. 根据业务属性设置样式
buildLayer.setStyle([
    ["${status} === 'warning'", "color('red')"],
    ["true", "color('rgba(0, 128, 255, 0.5)')"]
]);
```

## 实现细节
- **属性注入**：通过监听 `tileset.tileLoad` 事件，在每一块瓦片加载完成时，遍历其中的 Features，根据 `batchTable` 中的 `id` 与 `alertList` 进行比对，将业务数据挂载到 Feature 的属性中，以便后续通过 `setStyle` 进行按需渲染。
- **自定义着色器 (CustomShader)**：
    - `load` 时应用一个简单的片段着色器，增加高度光感。
    - `setShader` 时应用更复杂的顶点和片段着色器，通过 `czm_modelMaterial` 修改 `diffuse` 和 `emissive` 分量实现扫光和自发光效果。
- **性能**：图层内部使用 `performance.now()` 驱动着色器的时间 Uniform，确保在高帧率下动画平滑。
