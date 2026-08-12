export default {
  id: 'google',
  name: 'GoogleImageryProvider',
  title: 'Google 地图',
  group: '互联网底图',
  summary: '加载 Google 路网底图；支持 roadmap、satellite、terrain、hybrid 等样式别名。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'google',
  // 可改为 roadmap、satellite、terrain 或 hybrid 后重新运行
  style: 'roadmap',
  crs: 'WGS84',
  maximumLevel: 22,
})

return baseMap`,
}
