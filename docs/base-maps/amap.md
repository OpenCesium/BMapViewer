# AMapImageryProvider 高德地图

`AMapImageryProvider` 用于加载高德电子地图、影像和标注瓦片。设置 `crs: 'WGS84'` 后，Provider 会使用 GCJ-02 切片纠偏，使业务 WGS84 坐标与底图对齐。

## 组件案例

<SdkExamplePreview category="base-map" example="amap" title="AMapImageryProvider 高德地图" />

## BaseMap 用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'amap',
  style: 'img', // img、elec、cva
  crs: 'WGS84',
  maximumLevel: 18,
})
```

| 参数 | 常用值 | 说明 |
| --- | --- | --- |
| `style` | `img`、`elec`、`cva` | 影像、电子地图或标注样式 |
| `crs` | `WGS84` | 启用 GCJ-02 切片纠偏 |
| `url` | URL 模板 | 覆盖 SDK 默认服务模板 |
| `subdomains` | 数组 | 自定义服务子域名 |

互联网底图受服务提供方许可、访问策略和网络环境约束，生产环境应使用具有合法授权的地址。
