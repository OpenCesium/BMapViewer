export default {
  id: 'offline',
  name: 'BaseMap / offline',
  title: '本地离线瓦片',
  group: '本地与自定义',
  summary: '读取 public/tiles 下的 TMS 瓦片，并通过 GCJ-02 切片方案校正位置。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'offline',
  url: tileUrl,
  coordinateSystem: 'GCJ02',
  minimumLevel: 1,
  maximumLevel: 12,
  themeColor: '#34A4FF',
})

return baseMap`,
}
