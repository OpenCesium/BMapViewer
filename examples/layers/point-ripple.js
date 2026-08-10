export default {
  id: 'point-ripple',
  name: 'PointRippleLayer',
  title: '点位涟漪',
  group: '动态效果',
  summary: '为重点点位增加柔和的循环涟漪效果。',
  code: `const layer = new MapLayers.PointRippleLayer(viewer, {
  color: '#4affd4',
  radius: 900,
  duration: 2200
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.824, 44.145, 0] }, properties: { id: 'ripple-a', color: '#4affd4', radius: 850 } },
  { geometry: { type: 'Point', coordinates: [125.840, 44.151, 0] }, properties: { id: 'ripple-b', color: '#5bc0ff', radius: 1100 } }
])

return layer`,
}
