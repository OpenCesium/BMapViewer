# BaseMapLayer 基础底图图层

`BaseMapLayer` 类用于在 Cesium 中加载基础底图（如离线瓦片地图）。它基于 `Cesium.UrlTemplateImageryProvider` 实现，并支持自定义瓦片切片方案以及底图颜色滤镜。
## 效果预览：
![An image](/layer/base.gif)
## 构造函数

`new BaseMapLayer(viewer, config)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例（必填） |
| config | object | 底图配置项（必填） |

### config 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| url | string | - | 地图服务地址（必填），支持 `{z}/{x}/{y}` 占位符 |
| token | string | '' | 地图服务授权 Token，若提供则会自动在 Header 中添加 `Authorization` |
| maximumLevel | number | 18 | 最大缩放层级 |
| minimumLevel | number | 3 | 最小缩放层级 |
| themeColor | string | '' | 场景底图滤镜颜色（如 `#001f3f`），用于实现暗色系或特种风格地图 |

## 方法说明

### getBaseMapLayer()
- 返回值：`Cesium.ImageryLayer`
- 描述：获取当前创建的 Cesium 影像图层对象。

### removeColor()
- 描述：移除由 `themeColor` 产生的底图颜色滤镜。

### removeLayer()
- 描述：移除底图图层并清除颜色滤镜效果。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化底图图层
const baseLayer = new MapLayers.BaseMapLayer(viewer, {
    url: 'http://192.168.31.13:8080/tiles/{z}/{x}/{reverseY}.jpg',
    maximumLevel: 18,
    minimumLevel: 3,
    themeColor: '#112441' // 开启暗色滤镜
});

// 2. 获取图层实例（如果需要做其他操作）
const layer = baseLayer.getBaseMapLayer();

// 3. 移除图层
// baseLayer.removeLayer();
```
