# BaiduImageryProvider 百度地图

`BaiduImageryProvider` 处理百度瓦片坐标、BD-09 投影和样式地址。设置 `crs: 'WGS84'` 时，会自动使用 `BD09TilingScheme` 完成场景坐标对齐。

## 组件案例

<SdkExamplePreview category="base-map" example="baidu" title="BaiduImageryProvider 百度地图" />

## BaseMap 用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  style: 'normal', // img、vec、normal、dark
  crs: 'WGS84',
  maximumLevel: 18,
})
```

| 写法 | 实际样式 |
| --- | --- |
| `normal`、`vec`、`vector`、`elec` | 标准矢量底图 |
| `img`、`image`、`imagery`、`satellite` | 标准影像底图 |
| `dark` | 暗色自定义样式，需要同时传入具有访问权限的 `url` |
| `custom` | 需要显式传入有权访问的自定义样式 URL |

标准矢量模板使用：

```text
https://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20210709
```

无法识别的样式会抛出配置错误，避免 Cesium 持续请求无效地址。

暗色瓦片示例：

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  style: 'dark',
  url: 'https://your-authorized-baidu-service/{z}/{x}/{y}',
  crs: 'WGS84',
})
```
