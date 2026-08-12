export default {
  id: 'baidu',
  name: 'BaiduImageryProvider',
  title: '百度地图',
  group: '互联网底图',
  summary: '加载百度标准矢量瓦片；normal/vec/elec 均映射为矢量底图，img/satellite 映射为影像底图。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  // 可改为 vec、elec、img 或 satellite 后重新运行
  style: 'normal',
  crs: 'WGS84',
  maximumLevel: 18,
})

return baseMap`,
}
