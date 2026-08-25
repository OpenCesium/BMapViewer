# GeoVisImageryProvider 星图地球

`GeoVisImageryProvider` 用于加载星图地球（GeoVis Earth）的影像、矢量、地形和标注瓦片。Provider 根据 `style`、图片格式和 Token 生成瓦片地址，并由 `BaseMap` 统一管理影像层生命周期。

## BaseMap 用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'geovis',
  style: 'vec', // img、vec、ter、cia、cat
  format: 'png',
  key: import.meta.env.VITE_GEOVIS_TOKEN,
})
```

## style 类型

| `style` | 类型 | 常见用途 |
| --- | --- | --- |
| `img` | 影像底图 | 卫星和航空影像 |
| `vec` | 矢量底图 | 道路、行政区和基础地理要素 |
| `ter` | 地形晕渲 | 地貌和高程起伏背景 |
| `cia` | 影像中文标注 | 叠加在影像底图上显示中文地名 |
| `cat` | 地形中文标注 | 叠加在地形底图上显示中文地名 |

需要组合底图与标注时，可以分别创建底图层和透明标注层：

```js
const imagery = new BaseMaps.BaseMap(viewer, {
  type: 'geovis',
  style: 'img',
  format: 'jpg',
  key: import.meta.env.VITE_GEOVIS_TOKEN,
  index: 0,
})

const labels = new BaseMaps.BaseMap(viewer, {
  type: 'geovis',
  style: 'cia',
  format: 'png',
  key: import.meta.env.VITE_GEOVIS_TOKEN,
  index: 1,
})
```

## 构造参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `style` | `string` | `'vec'` | 星图地球数据类型 |
| `format` | `string` | `'png'` | 瓦片图片格式，例如 `png` 或 `jpg` |
| `key` | `string` | `''` | GeoVis 服务 Token |
| `url` | `string` | 内置模板 | 覆盖默认瓦片地址 |
| `protocol` | `string` | 当前页面协议 | 指定 `http` 或 `https` |
| `subdomains` | `string[]` | `1–3` | 星图地球服务子域名 |
| `minimumLevel` | `number` | Cesium 默认值 | 最小请求层级 |
| `maximumLevel` | `number` | Cesium 默认值 | 最大请求层级 |

## 直接创建 Provider

```js
const provider = new BaseMaps.GeoVisImageryProvider({
  style: 'vec',
  format: 'png',
  key: import.meta.env.VITE_GEOVIS_TOKEN,
})

const baseMap = new BaseMaps.BaseMap(viewer, { provider })
```

## Token 配置

建议通过环境变量注入 Token：

```dotenv
VITE_GEOVIS_TOKEN=你的GeoVisToken
```

请根据 GeoVis 服务端实际返回格式设置 `format`。服务访问范围、配额和可用图层由账号权限决定，私有部署或代理服务可以通过 `url` 覆盖默认模板。
