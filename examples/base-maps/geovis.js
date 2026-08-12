export default {
  id: 'geovis',
  name: 'GeoVisImageryProvider',
  title: '星图地球',
  group: '令牌服务',
  summary: '星图地球服务需要 Token，可配置影像风格和返回格式。',
  code: `const key = '替换为你的 GeoVis Token'
if (key.startsWith('替换')) {
  throw new Error('请先填写 GeoVis Token')
}

return new BaseMaps.BaseMap(viewer, {
  type: 'geovis',
  style: 'vec',
  format: 'png',
  key,
})`,
}
