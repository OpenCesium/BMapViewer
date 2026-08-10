export default {
  id: 'circle-wave',
  name: 'CircleWaveLayer',
  title: '扩散波纹',
  group: '动态效果',
  summary: '以自定义材质表现持续扩散的多圈波纹。',
  code: `const layer = new MapLayers.CircleWaveLayer(viewer, {
  color: '#00f6ff',
  radius: 1100,
  duration: 2400,
  count: 4,
  gradient: 0.18
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.830, 44.148, 0] }, properties: { id: 'wave-main', count: 5 } },
  { geometry: { type: 'Point', coordinates: [125.845, 44.154, 0] }, properties: { id: 'wave-east', color: '#ffcf5a', radius: 720, count: 3 } }
])

return layer`,
}
