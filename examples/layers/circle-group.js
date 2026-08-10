export default {
  id: 'circle-group',
  name: 'CircleGroupLayer',
  title: '范围圆',
  group: '动态效果',
  summary: '绘制多个可独立配置的圆形覆盖范围。',
  code: `const layer = new MapLayers.CircleGroupLayer(viewer, {
  fillColor: '#00d9e7',
  opacity: 0.32,
  radius: 700,
  outline: true,
  outlineColor: '#95ffff'
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.827, 44.149] }, properties: { id: 'circle-a', xRadius: 620, yRadius: 620, fillColor: '#00d9e7' } },
  { geometry: { type: 'Point', coordinates: [125.842, 44.145] }, properties: { id: 'circle-b', xRadius: 760, yRadius: 470, fillColor: '#ffd166' } }
])

return layer`,
}
