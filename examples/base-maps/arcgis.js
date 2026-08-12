export default {
  id: 'arcgis',
  name: 'ArcGISImageryProvider',
  title: 'ArcGIS 全球影像',
  group: '互联网底图',
  summary: '加载 ArcGIS World Imagery 缓存服务；MapServer 根地址会自动转换为 /tile/{z}/{y}/{x}。',
  code: `const url = 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'

const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'arcgis',
  url,
  maximumLevel: 23,
})

return baseMap`,
}
