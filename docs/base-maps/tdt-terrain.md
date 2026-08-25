# TdtTerrain 天地图三维地形

`TdtTerrain` 用于在标准 Cesium 中加载天地图 `swdx` 高程服务。它负责创建地形 Provider、挂载到 Viewer、启用地形深度检测，并在隐藏或销毁时恢复 Viewer 原有的地形配置。

天地图官方示例中的 `Cesium.GeoTerrainProvider` 来自天地图定制插件，并不是标准 Cesium 的内置类。BMapViewer 提供了兼容标准 Cesium 的 `TdtTerrainProvider`：它会解压服务返回的高程格网，并转换成 Cesium 可渲染的 `HeightmapTerrainData`，因此无需额外引入全局插件。

> `TdtImageryProvider` 的 `style: 'ter'` 是二维地形晕渲影像；`TdtTerrain` 才是真正改变地表起伏、可参与遮挡和深度检测的三维地形。

## 与天地图影像组合

```js
import { BaseMaps } from 'b-map-viewer'

const key = import.meta.env.VITE_TDT_KEY

const imagery = new BaseMaps.BaseMap(viewer, {
  type: 'tdt',
  style: 'img',
  key,
  maximumLevel: 18,
})

const terrain = new BaseMaps.TdtTerrain(viewer, {
  key,
  dataType: 'int16',
  minimumDataLevel: 5,
  maximumDataLevel: 11,
  depthTestAgainstTerrain: true,
})

// 页面卸载时释放自身资源，并恢复 Viewer 原来的地形
terrain.destroy()
imagery.destroy()
```

天地图地形需要开发者 Key，公开文档不会嵌入凭证。可进入在线示例的“底图模块 → 天地图三维地形”，填写 Key 后编辑运行。

## TdtTerrain 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `key` / `token` | `string` | `''` | 天地图开发者 Key |
| `provider` | `TerrainProvider` | - | 直接使用已经创建的地形 Provider |
| `depthTestAgainstTerrain` | `boolean` | `true` | 是否启用地形深度检测 |
| 其他参数 | - | - | 未消费的参数会传给 `TdtTerrainProvider` |

## TdtTerrainProvider 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `key` / `token` | `string` | `''` | 天地图开发者 Key；使用默认地址时必填 |
| `url` | `string` | 内置 `swdx` 模板 | 自定义或代理后的地形服务地址，支持 `{s}`、`{x}`、`{y}`、`{z}`、`{l}`、`{key}`、`{token}` |
| `subdomains` | `string[]` | `0–7` | 服务子域名 |
| `dataType` | `'int16' \| 'float'` | `'int16'` | 服务高程值的数据类型 |
| `minimumDataLevel` | `number` | `5` | 开始请求高程数据的 Cesium 层级；更低层级使用零高程格网 |
| `maximumDataLevel` | `number` | `11` | 最高可用的 Cesium 地形层级 |
| `requestLevelOffset` | `number` | `1` | Cesium 层级转换为服务层级时增加的偏移量 |
| `skirtHeight` | `number` | `6000` | 瓦片裙边高度，用于减弱相邻瓦片接缝 |
| `tilingScheme` | `GeographicTilingScheme` | WGS84 地理切片 | 自定义地形切片方案 |
| `ellipsoid` | `Ellipsoid` | `WGS84` | 默认切片方案使用的椭球体 |
| `credit` | `Credit` | `© 天地图三维地形` | Cesium 版权信息 |

## 生命周期

| 方法 | 说明 |
| --- | --- |
| `load(config)` | 按完整配置创建并挂载新的地形 Provider |
| `switch(config)` | 合并当前配置后切换地形 |
| `getProvider()` | 获取当前 `TdtTerrainProvider` |
| `show()` | 重新挂载当前地形并应用深度检测配置 |
| `hide()` | 暂时恢复 Viewer 原有地形 |
| `remove()` | 恢复原有地形并释放当前 Provider 引用 |
| `destroy()` | 清理地形管理器，之后不可再次使用 |

## 直接创建 Provider

不需要生命周期管理器时，也可以直接设置 Cesium 的 `terrainProvider`：

```js
const previousProvider = viewer.terrainProvider

viewer.terrainProvider = new BaseMaps.TdtTerrainProvider({
  key: import.meta.env.VITE_TDT_KEY,
  maximumDataLevel: 11,
})

// 页面卸载时自行恢复
viewer.terrainProvider = previousProvider
```

## 自定义代理地址

生产环境可以通过自己的代理统一管理 Key、跨域策略和请求配额：

```js
const terrain = new BaseMaps.TdtTerrain(viewer, {
  url: '/map-proxy/tdt-terrain?x={x}&y={y}&l={z}',
  subdomains: [],
  requestLevelOffset: 1,
})
```

服务可用层级、访问范围和配额以天地图开发者账号的授权为准。
