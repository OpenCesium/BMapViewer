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
  styles: 'pl',
  scaler: 1,
  maximumLevel: 18,
})
```

未传入 `key` 时，Provider 使用免费的 `https://maponline{s}.bdimg.com` 域名。传入 `key` 后，会自动切换到 `https://apimaponline{s}.bdimg.com`，并将这个 Key 作为百度接口要求的 `ak` 查询参数添加到瓦片请求：

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  style: 'img',
  crs: 'WGS84',
  key: '你的百度地图 AK',
})
```

`url` 仍可作为高级配置显式覆盖默认地址；传入 `url` 时不会自动替换其域名。

| 写法 | 实际样式 |
| --- | --- |
| `normal`、`vec`、`vector`、`elec` | 标准矢量底图 |
| `img`、`image`、`imagery`、`satellite` | 标准影像底图 |
| `dark` | 暗色自定义样式，需要同时传入具有访问权限的 `url` |
| `custom` | 需要显式传入有权访问的自定义样式 URL |

## 请求参数

常用百度瓦片参数可以直接通过 `BaseMap` 配置传入：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `key` | 无 | 存在时使用 `apimaponline` 授权域名，并作为 `ak` 查询参数发送 |
| `qt` | 矢量为 `vtile`，影像为 `satepc` | 百度瓦片请求类型 |
| `styles` | `pl` | 地图样式参数 |
| `scaler` | `1` | 瓦片缩放倍率 |
| `udt` | 无 | 百度瓦片数据版本日期等附加参数 |
| `v` | `009` | 影像瓦片版本，写入影像请求的 `u` 参数 |
| `satelliteType` | `sate` | 影像类型，写入影像请求的 `u` 参数 |
| `fm` | `46` | 影像响应格式参数 |
| `queryParameters` | `{}` | 需要追加或覆盖的其他查询参数 |

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  style: 'normal',
  key: '你的百度地图 AK',
  styles: 'pl',
  scaler: 2,
  udt: '20260903',
  queryParameters: {
    showtext: 1,
  },
})
```

免费矢量模板默认使用：

```text
https://maponline{s}.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1
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
