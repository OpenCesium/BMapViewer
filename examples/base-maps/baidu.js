export default {
  id: 'baidu',
  name: 'BaiduImageryProvider',
  title: '百度地图',
  group: '互联网底图',
  summary: '加载百度标准矢量瓦片；支持 img、vec、normal，dark 需配合授权的自定义地址。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  // style: img、vec、normal；dark 需要同时传入授权 url
  style: 'normal',
  crs: 'WGS84',
  maximumLevel: 18,
})

return baseMap`,
}
