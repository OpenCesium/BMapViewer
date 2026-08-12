export default {
  id: 'amap',
  name: 'AMapImageryProvider',
  title: '高德地图',
  group: '互联网底图',
  summary: '加载高德电子地图；crs=WGS84 时自动使用 GCJ-02 切片纠偏。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'amap',
  style: 'elec',
  crs: 'WGS84',
  maximumLevel: 18,
})

return baseMap`,
}
