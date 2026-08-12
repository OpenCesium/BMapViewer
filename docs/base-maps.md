# 底图模块 BaseMaps

底图负责提供场景的地理背景，不属于业务数据图层。BMapViewer 因此使用独立的 `BaseMaps` 命名空间管理离线瓦片、互联网地图 Provider、坐标偏移和自定义切片方案；`MapLayers` 只保留点、线、面、气泡、热力图和三维场景等业务图层。

```js
import { BaseMaps } from 'b-map-viewer'
```

## 模块组成

| 能力 | API |
| --- | --- |
| 底图生命周期 | `BaseMaps.BaseMap` |
| Provider 工厂 | `BaseMaps.createImageryProvider` |
| 在线地图 | `AMapImageryProvider`、`BaiduImageryProvider`、`TencentImageryProvider`、`ArcGISImageryProvider`、`TdtImageryProvider`、`GoogleImageryProvider`、`GeoVisImageryProvider` |
| 坐标纠偏 | `GCJ02TilingScheme`、`BD09TilingScheme`、`CoordTransform` |
| 自定义切片 | `CustomGeographicTilingScheme`、`CustomMercatorTilingScheme` |
| 百度投影 | `BD09Projection` |

## BaseMap

`new BaseMaps.BaseMap(viewer, config)` 创建并立即加载一个底图。实例只管理自身创建的影像资源，页面销毁时调用 `destroy()` 即可。

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'offline',
  url: '/tiles/{z}/{x}/{reverseY}.png',
  coordinateSystem: 'GCJ02',
  minimumLevel: 1,
  maximumLevel: 12,
  themeColor: '#34A4FF',
})
```

### 通用配置

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | string | `url-template` | `offline`、`url-template`、`amap`、`baidu`、`tencent`、`arcgis`、`tdt`、`google` 或 `geovis` |
| `provider` | ImageryProvider | - | 直接传入已创建的 Cesium Provider，优先级高于 `type` |
| `providerOptions` | object | `{}` | 额外传递给 Provider 的配置 |
| `index` | number | `0` | 加入 `viewer.imageryLayers` 的位置 |
| `show` | boolean | `true` | 初始可见性 |
| `themeColor` | string | - | 可选的暗色滤镜目标色 |
| `layerOptions` | object | `{}` | 传递给 `Cesium.ImageryLayer` 的参数 |
| `url`、`minimumLevel` 等 | - | - | 未被底图管理器消费的字段会继续传给 Provider |

百度与 Google 的 `style` 别名、官方凭证模式和地址覆盖方式见 [多源 Provider](/base-maps/providers)。

### 生命周期方法

| 方法 | 说明 |
| --- | --- |
| `load(config)` | 移除当前底图并按完整配置重新加载 |
| `switch(config)` | 合并当前配置后切换底图 |
| `getImageryLayer()` | 返回当前 `Cesium.ImageryLayer` |
| `getProvider()` | 返回当前 `ImageryProvider` |
| `show()` / `hide()` | 控制底图可见性 |
| `setTheme(color)` / `removeColor()` | 设置或清理底图颜色滤镜 |
| `remove()` | 从 Viewer 移除底图，实例仍可再次 `load` |
| `destroy()` | 移除底图并释放 Viewer 引用 |

## 切换底图

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'offline',
  url: '/tiles/{z}/{x}/{reverseY}.png',
})

baseMap.switch({
  type: 'amap',
  style: 'img',
  crs: 'WGS84',
  themeColor: undefined,
})
```

## 从旧版迁移

底图不再由 `MapLayers` 导出：

```diff
- const baseMap = new MapLayers.BaseMapLayer(viewer, config)
- baseMap.removeLayer()
+ const baseMap = new BaseMaps.BaseMap(viewer, config)
+ baseMap.destroy()
```

有关具体服务参数，请继续阅读 [多源 Provider](/base-maps/providers)、[离线瓦片](/base-maps/offline) 和 [坐标系与自定义切片](/base-maps/tiling-schemes)。

> 互联网底图的版权、访问频率、Token 和服务可用性由对应数据提供方管理。生产环境请使用你拥有合法权限的服务地址与凭证。
