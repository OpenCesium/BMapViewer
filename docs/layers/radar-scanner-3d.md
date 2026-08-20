# RadarScanner3DLayer 三维雷达扫描图层

`RadarScanner3DLayer` 类用于在 Cesium 场景中创建三维半球雷达扫描效果。图层由一个半透明半球体和一个可旋转的扫描扇面组成，适用于监控范围、探测范围、预警区域等三维可视化场景。

## 组件案例

<LayerExamplePreview example="radar-scanner-3d" title="RadarScanner3DLayer 三维雷达" />

## 构造函数

`new RadarScanner3DLayer(viewer, options)`

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| viewer | object | Cesium Viewer 实例 |
| options | object | 雷达扫描图层配置项 |

### options 参数说明

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| position | Array | `[0, 0, 0]` | 雷达中心点坐标，格式为 `[lon, lat, height]` |
| radius | number | `1000` | 雷达半径，单位为米 |
| color | string \| Cesium.Color | `'rgb(5,251,248)'` | 雷达半球和扫描扇面的主颜色 |
| speed | number | `1` | 扫描扇面每帧旋转的角度，数值越大旋转越快 |
| hemisphereAlpha | number | `0.5` | 半球体透明度 |
| scanAlpha | number | `0.6` | 扫描扇面透明度 |
| outlineColor | string \| Cesium.Color | `'#f1f105'` | 半球体轮廓线颜色 |
| autoStart | boolean | `false` | 是否在创建图层后自动开始扫描动画 |

## 方法说明

### createRadar()
- 描述：创建雷达图层。该方法会依次创建半球体和扫描扇面；如果图层已创建，则不会重复添加实体。

### start()
- 描述：启动扫描动画。内部通过 `viewer.clock.onTick` 更新扫描扇面的朝向。

### stop()
- 描述：停止扫描动画，并移除 `viewer.clock.onTick` 事件监听。

### setVisible(visible)
- 参数：`visible` (boolean) - 是否显示图层。
- 描述：统一控制雷达半球体和扫描扇面的显示状态。

### show() / hide()
- 描述：快捷方法，显示或隐藏整个雷达扫描图层。

### clearLayer()
- 描述：停止动画并从 `viewer.entities` 中移除图层创建的所有 Entity。

### destroy()
- 描述：销毁图层，清理实体、事件监听，并释放 `viewer` 引用。

## 使用示例

```js
import { MapLayers } from "b-map-viewer";

// 1. 初始化三维雷达扫描图层
const radarLayer = new MapLayers.RadarScanner3DLayer(viewer, {
    position: [125.834, 44.147, 100],
    radius: 3000,
    color: 'rgb(5,251,248)',
    outlineColor: '#f1f105',
    speed: 2,
    hemisphereAlpha: 0.35,
    scanAlpha: 0.65,
    autoStart: true
});

// 2. 手动控制扫描动画
radarLayer.stop();
radarLayer.start();

// 3. 控制图层显示隐藏
radarLayer.hide();
radarLayer.show();

// 4. 销毁图层
// radarLayer.destroy();
```

## 实现细节

- **半球体渲染**：通过 `viewer.entities.add` 创建 `ellipsoid`，并使用 `maximumCone: Cesium.Math.toRadians(90)` 将完整球体裁剪为上半球。
- **扫描扇面渲染**：通过 `wall` 实体创建垂直扫描面，`positions` 使用 `Cesium.CallbackProperty` 动态返回最新坐标。
- **扫描动画**：`start()` 方法监听 `viewer.clock.onTick`，每帧根据 `speed` 更新 `heading`，再重新计算扫描扇面坐标。
- **局部坐标计算**：`calculateScanPane()` 使用 `Cesium.Transforms.eastNorthUpToFixedFrame` 将局部 ENU 坐标转换为世界坐标，保证扫描方向围绕雷达中心旋转。
- **扇面弧线生成**：`calculateScanSector()` 根据目标点和半径计算从地面中心到半球顶部的弧形扫描边界。

## 注意事项

- `position` 至少需要包含经度和纬度，第三位高度可省略，默认值为 `0`。
- `speed` 是每次 `clock.onTick` 更新时增加的角度，不是严格意义上的每秒角速度；实际动画速度会受 Cesium 时钟刷新频率影响。
- 调用 `destroy()` 后图层实例会释放 `viewer` 引用，后续不应继续调用 `start()`、`show()` 等方法。
