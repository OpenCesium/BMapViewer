export default {
  id: 'baidu',
  name: 'BaiduImageryProvider',
  title: '百度地图',
  group: '互联网底图',
  summary: '加载百度矢量或影像瓦片；传入 key 时自动使用百度授权服务域名。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'baidu',
  // style: img、vec、normal；需要授权服务时传入 key
  style: 'normal',
  crs: 'BD09',
  // key: '你的百度地图 AK',
  styles: 'pl',// pl、sl
  scaler: 1,
  maximumLevel: 18,
})

return baseMap`,
}
