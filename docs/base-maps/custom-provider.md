# 自定义 ImageryProvider

当业务使用私有瓦片、特殊切片方案或已经创建好的 Cesium Provider 时，可以先调用 `createImageryProvider`，再交给 `BaseMap` 统一管理生命周期。

## 组件案例

案例使用 `public/tiles`，并显式传入 `GCJ02TilingScheme`。

<SdkExamplePreview category="base-map" example="custom-provider" title="createImageryProvider 自定义底图" />

## 创建 Provider

```js
const provider = BaseMaps.createImageryProvider({
  type: 'url-template',
  url: '/tiles/{z}/{x}/{reverseY}.png',
  tilingScheme: new BaseMaps.GCJ02TilingScheme(),
  minimumLevel: 1,
  maximumLevel: 12,
})
```

## 交给 BaseMap 管理

```js
const baseMap = new BaseMaps.BaseMap(viewer, {
  provider,
  themeColor: '#34A4FF',
})

baseMap.hide()
baseMap.show()
baseMap.destroy()
```

直接传入 `provider` 时，`BaseMap` 不再根据 `type` 创建新 Provider。页面卸载时调用 `destroy()`，避免保留影像层。
