# 离线瓦片底图

在线示例的底图读取仓库 `public/tiles` 目录，不依赖外部地图服务：

```text
public/tiles/{z}/{x}/{reverseY}.png
```

当前数据采用 TMS 行号，所以模板使用 Cesium 的 `{reverseY}`。瓦片坐标来自 GCJ-02 地图数据，配置 `coordinateSystem: 'GCJ02'` 后，`BaseMaps` 会自动应用 `GCJ02TilingScheme`，使 Cesium 的 WGS84 场景坐标与瓦片对齐。

```js
import { BaseMaps } from 'b-map-viewer'

const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'offline',
  url: '/tiles/{z}/{x}/{reverseY}.png',
  coordinateSystem: 'GCJ02',
  minimumLevel: 1,
  maximumLevel: 12,
  themeColor: '#34A4FF',
})
```

如果本地瓦片本身是标准 WGS84/Web Mercator 数据，不要设置 `coordinateSystem: 'GCJ02'`：

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'offline',
  url: '/wgs84-tiles/{z}/{x}/{y}.png',
  minimumLevel: 0,
  maximumLevel: 18,
})
```

## 带请求头的内网服务

`token` 会作为 `Authorization` 请求头发送：

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'url-template',
  url: 'https://intranet.example.com/tiles/{z}/{x}/{y}.png',
  token: 'Bearer <access-token>',
})
```

离线瓦片只需要初始化一次。切换业务图层时不要重复创建底图实例，避免影像层叠加和重复请求。
