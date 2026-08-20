# FogEffect 距离雾

`FogEffect` 读取场景深度纹理，根据相机距离逐步混合雾色。它适合表现低能见度、晨雾和远景层次衰减。

## 组件案例

<SdkExamplePreview category="weather" example="fog" title="FogEffect 距离雾" height="500px" />

## 构造函数

```js
new WeatherEffects.FogEffect(viewer, options)
```

| 参数 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- |
| `intensity` | `0.78` | `0～2` | 整体雾化强度 |
| `near` | `500` | `≥ 0` | 开始混合雾色的相机距离 |
| `far` | `12000` | `≥ 1` | 进入主要雾化区间的距离 |
| `density` | `1.15` | `0.01～10` | 距离雾增长速度 |
| `skyAmount` | `0.22` | `0～1` | 天空区域的基础雾量 |
| `color` | `#b9c7cddd` | CSS 颜色 | 雾颜色 |

## 使用示例

```js
const fog = new WeatherEffects.FogEffect(viewer, {
  intensity: 0.78,
  near: 500,
  far: 12000,
  density: 1.15,
  skyAmount: 0.22,
  color: '#b9c7cddd',
})

fog.setOptions({ far: 8000, density: 1.4 })
```

旧版 `visibility` 参数仍可以使用，SDK 会将其转换为 `far`。浏览器和显卡需要支持 Cesium 深度纹理。

