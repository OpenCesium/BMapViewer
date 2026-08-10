export default {
  id: 'label-group',
  name: 'LabelGroupLayer',
  title: '文本标注',
  group: '点位标注',
  summary: '以 LabelCollection 绘制轻量级地图文字。',
  code: `const layer = new MapLayers.LabelGroupLayer(viewer, {
  fontSize: '600 15px sans-serif',
  color: '#e8ffff',
  backgroundColor: 'rgba(2, 25, 38, 0.82)',
  showBackground: true,
  offsetY: -12
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.823, 44.151] }, properties: { id: 'label-1', text: '生产区 A' } },
  { geometry: { type: 'Point', coordinates: [125.835, 44.145] }, properties: { id: 'label-2', text: '能源中心' } },
  { geometry: { type: 'Point', coordinates: [125.847, 44.151] }, properties: { id: 'label-3', text: '仓储区 C' } }
])

return layer`,
}
