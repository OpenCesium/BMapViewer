export default {
  id: 'heatmap',
  name: 'HeatmapLayer',
  title: '实体热力图',
  group: '专题分析',
  summary: '将点位权重绘制到 Canvas，并贴附为矩形实体。',
  code: `const layer = new MapLayers.HeatmapLayer(viewer, {
  radius: 42,
  blur: 0.78,
  maxOpacity: 0.82,
  minOpacity: 0.08,
  gradient: {
    0.15: '#132a68',
    0.38: '#00b8d9',
    0.62: '#52f2a3',
    0.82: '#ffe66d',
    1.0: '#ff5b45'
  }
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.820, 44.143] }, properties: { value: 42 } },
  { geometry: { type: 'Point', coordinates: [125.826, 44.151] }, properties: { value: 76 } },
  { geometry: { type: 'Point', coordinates: [125.834, 44.147] }, properties: { value: 100 } },
  { geometry: { type: 'Point', coordinates: [125.842, 44.154] }, properties: { value: 68 } },
  { geometry: { type: 'Point', coordinates: [125.849, 44.141] }, properties: { value: 54 } }
])

return layer`,
}
