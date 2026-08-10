export default {
  id: 'heatmap-primitive',
  name: 'HeatmapPrimitiveLayer',
  title: 'Primitive 热力图',
  group: '专题分析',
  summary: '以 Primitive 方式承载热力图，适合大范围专题渲染。',
  code: `const layer = new MapLayers.HeatmapPrimitiveLayer(viewer, {
  radius: 48,
  blur: 0.72,
  renderType: 'primitive',
  maxOpacity: 0.86,
  gradient: {
    0.1: '#111d4a',
    0.35: '#00a6ca',
    0.6: '#38efb1',
    0.82: '#ffd166',
    1.0: '#ff4b3e'
  }
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.819, 44.151] }, properties: { value: 34 } },
  { geometry: { type: 'Point', coordinates: [125.826, 44.143] }, properties: { value: 62 } },
  { geometry: { type: 'Point', coordinates: [125.834, 44.149] }, properties: { value: 96 } },
  { geometry: { type: 'Point', coordinates: [125.841, 44.143] }, properties: { value: 82 } },
  { geometry: { type: 'Point', coordinates: [125.848, 44.152] }, properties: { value: 47 } }
])

return layer`,
}
