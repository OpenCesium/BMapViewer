# TencentImageryProvider 腾讯地图

`TencentImageryProvider` 用于加载腾讯电子地图和影像瓦片，内部处理反向 Y 以及影像服务使用的分块目录。

## 组件案例

<SdkExamplePreview category="base-map" example="tencent" title="TencentImageryProvider 腾讯地图" />

## BaseMap 用法

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'tencent',
  style: '1', // img、1（经典地图）
  maximumLevel: 18,
})
```

| 参数 | 常用值 | 说明 |
| --- | --- | --- |
| `style` | `img`、`1` | 影像或经典地图样式 |
| `maximumLevel` | `18` | 最大请求层级 |
| `url` | URL 模板 | 覆盖默认服务地址 |

底图实例通过 `show()`、`hide()` 控制显示，切换页面时调用 `destroy()` 移除影像层。
