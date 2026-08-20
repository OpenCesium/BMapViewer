# CloudEffect 动态云层

`CloudEffect` 通过多层分形噪声生成动态云带和云层阴影，可控制云量、尺度、高度、流速与颜色。

## 组件案例

<SdkExamplePreview category="weather" example="cloud" title="CloudEffect 动态云层" height="500px" />

## 构造函数

```js
new WeatherEffects.CloudEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `intensity` | `0.75` | `0～2` | 云层混合强度 |
| `coverage` | `0.58` | `0～1` | 云量覆盖比例 |
| `scale` | `3.8` | `0.25～20` | 云团噪声尺度 |
| `speed` | `0.65` | `-5～5` | 云层运动速度和方向 |
| `altitude` | `0.66` | `0～1` | 云带在屏幕空间中的高度分布 |
| `color` | `#d7e0e6cc` | CSS 颜色 | 云层颜色 |

## 使用示例

```js
const cloud = new WeatherEffects.CloudEffect(viewer, {
  intensity: 0.75,
  coverage: 0.58,
  altitude: 0.66,
  scale: 3.8,
  speed: 0.65,
})

cloud.setOptions({ coverage: 0.4, speed: 0.3 })
```

`speed` 可以为负数，用于反转云层运动方向。云层属于全屏后处理，不表示真实三维云体高度。

