# ArcGISImageryProvider 全球影像

`ArcGISImageryProvider` 可以接收 ArcGIS MapServer 根地址，并转换为缓存地图的 `/tile/{z}/{y}/{x}` 请求格式。案例使用 ArcGIS World Imagery。

## 组件案例

<SdkExamplePreview category="base-map" example="arcgis" title="ArcGIS World Imagery" height="500px" />

## BaseMap 用法

```js
const url = 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'

const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'arcgis',
  url,
  maximumLevel: 23,
})
```

| 参数 | 说明 |
| --- | --- |
| `url` | MapServer 根地址或完整瓦片模板 |
| `accessToken` | 可选服务令牌，会作为 `token` 查询参数加入请求 |
| `minimumLevel` | 最小请求层级 |
| `maximumLevel` | 最大请求层级 |

ArcGIS 缓存地图的路径顺序是 `level/row/column`，对应模板中的 `{z}/{y}/{x}`。

