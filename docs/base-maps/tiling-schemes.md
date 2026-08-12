# 坐标系与自定义切片

Cesium 场景使用 WGS84。国内互联网地图通常使用 GCJ-02 或 BD-09，如果直接套用标准 Web Mercator 切片方案，会出现底图与业务坐标偏移。`BaseMaps` 提供对应切片方案，在 Provider 的投影阶段完成转换。

## GCJ-02

高德和部分国内地图模板可以使用：

```js
const tilingScheme = new BaseMaps.GCJ02TilingScheme()

const provider = BaseMaps.createImageryProvider({
  type: 'url-template',
  url: '/tiles/{z}/{x}/{reverseY}.png',
  tilingScheme,
})
```

## BD-09

`BaiduImageryProvider` 在 `crs: 'WGS84'` 时会自动创建 `BD09TilingScheme`，通常无需手动配置。模块同时公开 `BD09Projection`，可用于百度经纬度、百度墨卡托和像素坐标之间的转换。

## 坐标转换

```js
const gcj02 = BaseMaps.CoordTransform.WGS84ToGCJ02(116.3974, 39.9093)
const bd09 = BaseMaps.CoordTransform.GCJ02ToBD09(gcj02[0], gcj02[1])
const wgs84 = BaseMaps.CoordTransform.GCJ02ToWGS84(gcj02[0], gcj02[1])
```

## 自定义地理切片方案

```js
const tilingScheme = new BaseMaps.CustomGeographicTilingScheme({
  origin: [-180, 90],
  tileSize: 256,
  zoomOffset: 0,
  resolutions: [
    0.703125,
    0.3515625,
    0.17578125,
  ],
})
```

## 自定义墨卡托切片方案

```js
const tilingScheme = new BaseMaps.CustomMercatorTilingScheme({
  origin: [-20037508.3427892, 20037508.3427892],
  tileSize: 256,
  zoomOffset: 0,
  resolutions: [
    156543.033928,
    78271.516964,
    39135.758482,
  ],
})
```

`resolutions` 必须覆盖实际使用的层级；无法取得当前层级分辨率时，自定义切片方案不会计算有效瓦片范围。
