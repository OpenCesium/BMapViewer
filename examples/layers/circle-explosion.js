export default {
  id: 'circle-explosion',
  name: 'CircleExplosionLayer',
  title: '爆炸脉冲',
  group: '动态效果',
  summary: '使用自定义材质绘制短周期脉冲告警。',
  code: `const layer = new MapLayers.CircleExplosionLayer(viewer, {
  color: '#ff6b45',
  radius: 900,
  duration: 1700
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.833, 44.148, 0] }, properties: { id: 'alarm-main', fillAlpha: 0.48 } },
  { geometry: { type: 'Point', coordinates: [125.845, 44.142, 0] }, properties: { id: 'alarm-east', color: '#ffd166', radius: 620 } }
])

return layer`,
}
