# TdtImageryProvider 天地图

`TdtImageryProvider` 用于加载天地图矢量、影像、标注和地形晕渲影像瓦片。Provider 使用天地图 Web Mercator 数据服务模板，并统一处理服务子域名、请求层级和开发者 Key。

## BaseMap 用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'tdt',
  style: 'vec', // vec、cva、img、cia、ter
  key: import.meta.env.VITE_TDT_KEY,
  maximumLevel: 18,
})
```

## style 类型

| `style` | 类型 | 常见用途 |
| --- | --- | --- |
| `vec` | 矢量底图 | 道路、行政区和基础地理要素 |
| `cva` | 矢量中文标注 | 叠加在 `vec` 上显示中文地名 |
| `img` | 影像底图 | 卫星和航空影像 |
| `cia` | 影像中文标注 | 叠加在 `img` 上显示中文地名 |
| `ter` | 地形晕渲影像 | 用颜色与明暗表达地貌起伏的二维背景 |

## 三维地形

`style: 'ter'` 仍然是影像瓦片，不会改变 Cesium 地球表面的几何起伏。需要真实高程、遮挡关系和地形深度检测时，请使用 [`TdtTerrain`](/base-maps/tdt-terrain)：

```js
const terrain = new BaseMaps.TdtTerrain(viewer, {
  key: import.meta.env.VITE_TDT_KEY,
  depthTestAgainstTerrain: true,
})
```

标注服务是透明瓦片。需要“影像 + 中文标注”时，可以创建两层底图资源，并将标注层放在上方：

```js
const imagery = new BaseMaps.BaseMap(viewer, {
  type: 'tdt',
  style: 'img',
  key: import.meta.env.VITE_TDT_KEY,
  index: 0,
})

const labels = new BaseMaps.BaseMap(viewer, {
  type: 'tdt',
  style: 'cia',
  key: import.meta.env.VITE_TDT_KEY,
  index: 1,
})

// 页面销毁时分别释放
imagery.destroy()
labels.destroy()
```

## 构造参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `style` | `string` | `'vec'` | 天地图数据类型 |
| `key` | `string` | `''` | 天地图开发者 Key |
| `url` | `string` | 内置模板 | 覆盖默认瓦片地址 |
| `protocol` | `string` | 当前页面协议 | 指定 `http` 或 `https` |
| `subdomains` | `string[]` | `0–7` | 天地图服务子域名 |
| `minimumLevel` | `number` | Cesium 默认值 | 最小请求层级 |
| `maximumLevel` | `number` | `18` | 最大请求层级 |

## 直接创建 Provider

```js
const provider = new BaseMaps.TdtImageryProvider({
  style: 'vec',
  key: import.meta.env.VITE_TDT_KEY,
})

const baseMap = new BaseMaps.BaseMap(viewer, { provider })
```

## Key 配置

建议通过环境变量注入 Key，不要将凭证直接提交到公开仓库：

```dotenv
VITE_TDT_KEY=你的天地图Key
```

天地图服务的访问范围、配额和可用图层由开发者账号权限决定。如果服务域名或代理地址不同，可以通过 `url` 覆盖 SDK 默认模板。
