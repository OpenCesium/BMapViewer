export default {
  id: 'line-primitive',
  name: 'LinePrimitiveLayer',
  title: '高性能线',
  group: '线面图层',
  summary: '使用 Primitive API 批量绘制静态线路。',
  code: `const layer = new MapLayers.LinePrimitiveLayer(viewer, {
  width: 4,
  color: '#7af0ff'
})

layer.setData([
  {
    geometry: { type: 'LineString', coordinates: [[125.814, 44.148], [125.825, 44.142], [125.837, 44.150], [125.852, 44.145]] },
    properties: { id: 'primitive-line-1', name: '输送管线', color: '#5ef2d6', width: 5 }
  },
  {
    geometry: { type: 'LineString', coordinates: [[125.818, 44.155], [125.833, 44.154], [125.848, 44.158]] },
    properties: { id: 'primitive-line-2', name: '巡检路线', color: '#ffcc66', width: 3 }
  }
])

return layer`,
}
