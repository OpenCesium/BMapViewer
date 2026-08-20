# RainEffect 降雨

`RainEffect` 使用 Cesium 后处理阶段生成屏幕空间雨线，不创建 Entity。方向、速度、密度、粗细、风偏和颜色都可以在运行期间更新。

## 组件案例

案例使用 ArcGIS World Imagery，并采用可见天空的低空斜视镜头。

<SdkExamplePreview category="weather" example="rain" title="RainEffect 降雨" height="500px" />

## 构造函数

```js
new WeatherEffects.RainEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `intensity` | `0.5` | `0～1` | 雨景与原场景的混合强度 |
| `density` | `1` | `0.1～3` | 雨线列数倍率 |
| `speed` | `1` | `0.05～5` | 下落速度倍率 |
| `size` | `1` | `0.1～3` | 雨线粗细倍率 |
| `angle` | `-22.9183` | `-180～180` | 屏幕空间旋转角度，单位为度 |
| `wind` | `0` | `-2～2` | 随时间变化的横向风偏 |
| `color` | `#99b3ccff` | CSS 颜色 | 雨线颜色 |
| `lightning` | `false` | `boolean` | 是否同时开启闪电 |

## 使用示例

```js
const rain = new WeatherEffects.RainEffect(viewer, {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: -22.9183,
  wind: 0,
  color: '#99b3ccff',
})

rain.setOptions({ density: 0.65, size: 0.7, wind: 0.35 })
rain.hide()
rain.show()
rain.destroy()
```

`setOptions` 只更新 uniform，不会重建后处理阶段。移动设备建议适当降低 `density` 和 `intensity`。

