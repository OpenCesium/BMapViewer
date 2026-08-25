# GoogleImageryProvider Google 地图

`GoogleImageryProvider` 支持路网、影像、地形和混合样式，并允许通过 `url` 覆盖瓦片服务模板。

## 组件案例

<SdkExamplePreview category="base-map" example="google" title="GoogleImageryProvider 电子地图" />

## 兼容模板用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'google',
  style: 'elec', // img、elec、ter、cva、img_cva
  crs: 'WGS84',
  maximumLevel: 22,
})
```

兼容样式包括：

| 类型 | 样式别名 |
| --- | --- |
| 电子地图 | `elec`；兼容 `normal`、`vec`、`roadmap` |
| 影像 | `img`、`satellite` |
| 标注 | `cva`、`labels` |
| 地形 | `ter`、`terrain` |
| 混合 | `img_cva`、`hybrid` |

## 官方 Map Tiles API

生产环境推荐创建 2D Tiles Session，并同时提供 API Key 与 Session Token：

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'google',
  style: 'satellite',
  key: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  sessionToken,
})
```

公开案例使用兼容模板，实际可用性受网络环境和服务策略影响。
