export default {
  id: 'google',
  name: 'GoogleImageryProvider',
  title: 'Google 地图',
  group: '互联网底图',
  summary: '加载 Google 电子地图；支持 img、elec、ter、cva、img_cva 及其兼容别名。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'google',
  style: 'elec', // img、elec、ter、cva、img_cva
  crs: 'WGS84',
  maximumLevel: 22,
})

return baseMap`,
}
