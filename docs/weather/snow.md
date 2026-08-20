# SnowEffect 降雪

`SnowEffect` 使用四层不同尺度的雪花噪声形成远近层次，支持方向、速度、密度、粒径和横向飘移控制。

## 组件案例

<SdkExamplePreview category="weather" example="snow" title="SnowEffect 降雪" height="500px" />

## 构造函数

```js
new WeatherEffects.SnowEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `intensity` | `0.5` | `0～1` | 雪景混合强度 |
| `density` | `1` | `0.1～3` | 雪花网格密度倍率 |
| `speed` | `1` | `0.05～5` | 下落速度倍率 |
| `size` | `1` | `0.1～3` | 雪花粒径倍率 |
| `angle` | `18.4349` | `-180～180` | 飘雪方向角度 |
| `drift` | `1` | `-2～2` | 横向飘移幅度 |
| `color` | `#ffffffff` | CSS 颜色 | 雪花颜色 |

## 使用示例

```js
const snow = new WeatherEffects.SnowEffect(viewer, {
  intensity: 0.5,
  density: 1,
  size: 1,
  speed: 1,
  angle: 18.4349,
  drift: 1,
})

snow.setOptions({ size: 0.75, speed: 1.4, drift: 0.5 })
```

调用 `destroy()` 会从 `viewer.scene.postProcessStages` 中移除阶段并释放引用。

