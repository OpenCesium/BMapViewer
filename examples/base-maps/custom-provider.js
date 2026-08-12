export default {
  id: 'custom-provider',
  name: 'createImageryProvider',
  title: '自定义 Provider',
  group: '本地与自定义',
  summary: '先通过工厂创建 Provider，再交给 BaseMap 统一管理生命周期。',
  code: `const provider = BaseMaps.createImageryProvider({
  type: 'url-template',
  url: tileUrl,
  tilingScheme: new BaseMaps.GCJ02TilingScheme(),
  minimumLevel: 1,
  maximumLevel: 12,
})

return new BaseMaps.BaseMap(viewer, {
  provider,
  themeColor: '#34A4FF',
})`,
}
