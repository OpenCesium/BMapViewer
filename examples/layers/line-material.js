export default {
  id: 'line-material',
  name: 'LineMaterialLayer',
  title: '材质线路',
  group: '线面图层',
  summary: '在 Primitive 线路上应用统一的虚线材质。',
  code: `const layer = new MapLayers.LineMaterialLayer(viewer, {
  type: 'dash',
  color: '#00e7ff',
  width: 5,
  dashLength: 22
})

layer.setData([
  {
    geometry: { type: 'LineString', coordinates: [[125.815, 44.154], [125.828, 44.147], [125.839, 44.151], [125.851, 44.142]] },
    properties: { id: 'material-line-a', name: '地下管廊', width: 5 }
  },
  {
    geometry: { type: 'LineString', coordinates: [[125.821, 44.139], [125.833, 44.144], [125.848, 44.156]] },
    properties: { id: 'material-line-b', name: '应急路线', width: 3 }
  }
])

return layer`,
}
