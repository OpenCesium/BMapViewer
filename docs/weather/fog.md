# FogEffect 距离雾

`FogEffect` 读取场景深度纹理，根据深度阈值逐步混合雾色。默认公式为 `f = (depth - 0.22) / 0.2`，并将其中的起始值、过渡范围、浓度和混合强度开放为动态参数。它适合表现低能见度、晨雾和远景层次衰减。

## 组件案例

<SdkExamplePreview category="weather" example="fog" title="FogEffect 距离雾" height="500px" />

## 构造函数

```js
new WeatherEffects.FogEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `mode` | `depth` | `depth / distance` | 深度阈值模式或兼容旧版的米制距离模式 |
| `intensity` | `0.5` | `0～2` | 最终雾色混合强度 |
| `depthStart` | `0.22` | `0～1` | 开始起雾的深度纹理值，越小则近处越早起雾 |
| `depthRange` | `0.2` | `0～1` | 从无雾到浓雾的深度过渡范围，越小边界越明显 |
| `density` | `0.65` | `0.01～10` | 雾因子倍率，越大雾越浓 |
| `skyAmount` | `0.55` | `0～1` | 无场景深度的天空区域雾量 |
| `color` | `#ccccccff` | CSS 颜色 | 雾颜色及透明度 |

## 使用示例

```js
const fog = new WeatherEffects.FogEffect(viewer, {
  mode: 'depth',
  intensity: 0.5,
  depthStart: 0.22,
  depthRange: 0.2,
  density: 0.65,
  skyAmount: 0.55,
  color: '#ccccccff',
})

fog.setOptions({ depthStart: 0.26, depthRange: 0.16, density: 1.25 })
```

`setOptions` 会即时更新 uniform，不需要重新创建后处理阶段。`depthStart: 0.22` 与 `depthRange: 0.2` 保留参考着色器中的原始常量；默认混合强度调整为 `0.5`，使地图细节在薄雾中仍然清晰可见。如需恢复参考实现的浓雾效果，可以将 `intensity` 调整为 `0.8`、`density` 调整为 `1`、`skyAmount` 调整为 `1`。

旧版 `near`、`far` 和 `visibility` 参数仍可以使用。未指定 `mode` 时，只要传入这些旧参数，SDK 会自动切换到 `distance` 模式；也可以显式配置：

```js
fog.setOptions({
  mode: 'distance',
  near: 500,
  far: 12000,
  density: 1.15,
  skyAmount: 0.22,
})
```

浏览器和显卡需要支持 Cesium 深度纹理。
