# SandstormEffect 沙尘暴

`SandstormEffect` 将流动噪声、细颗粒和暖色低能见度合成为沙尘天气，适合荒漠、极端天气和应急态势场景。

## 组件案例

<SdkExamplePreview category="weather" example="sandstorm" title="SandstormEffect 沙尘暴" height="500px" />

## 构造函数

```js
new WeatherEffects.SandstormEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `intensity` | `0.72` | `0～2` | 沙尘与原场景的混合强度 |
| `density` | `0.9` | `0.05～2.5` | 颗粒和噪声密度 |
| `speed` | `1` | `0.01～5` | 噪声流动速度 |
| `wind` | `0.8` | `-2～2` | 水平运动方向和幅度 |
| `color` | `#c8894de6` | CSS 颜色 | 沙尘主色 |

## 使用示例

```js
const sandstorm = new WeatherEffects.SandstormEffect(viewer, {
  intensity: 0.72,
  density: 0.9,
  speed: 1,
  wind: 0.8,
  color: '#c8894de6',
})

sandstorm.setOptions({ intensity: 0.55, wind: 1.2 })
```

高强度和高密度会明显降低底图可见度，业务场景中建议保留足够的标注对比度。

