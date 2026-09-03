export default {
  id: 'amap',
  name: 'AMapImageryProvider',
  title: '高德地图',
  group: '互联网底图',
  summary: '加载高德影像地图；支持 img、elec、cva，crs=WGS84 时自动使用 GCJ-02 切片纠偏。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'amap',
  style: 'elec', // img、elec、cva
  crs: 'GCJ-02',
  maximumLevel: 18,
})

return baseMap`,
}
