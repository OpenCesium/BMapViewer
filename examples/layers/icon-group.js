export default {
  id: 'icon-group',
  name: 'IconGroupLayer',
  title: '图标点位',
  group: '点位标注',
  summary: '以 BillboardCollection 批量渲染设备点位。',
  code: `const markerSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="58" viewBox="0 0 48 58"><path fill="#0bd9d2" stroke="#d9ffff" stroke-width="2" d="M24 1C11.3 1 1 11.3 1 24c0 17.2 23 33 23 33s23-15.8 23-33C47 11.3 36.7 1 24 1Z"/><circle cx="24" cy="23" r="8" fill="#082b3b"/></svg>'
const markerUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerSvg)
const layer = new MapLayers.IconGroupLayer(viewer, {
  icon: markerUrl,
  width: 42,
  height: 51
})

layer.setData([
  { geometry: { type: 'Point', coordinates: [125.824, 44.151] }, properties: { id: 'gate-a', name: '北门监测点' } },
  { geometry: { type: 'Point', coordinates: [125.836, 44.147] }, properties: { id: 'gate-b', name: '中心监测点', color: '#ffe08a' } },
  { geometry: { type: 'Point', coordinates: [125.846, 44.142] }, properties: { id: 'gate-c', name: '东南监测点' } }
])

return layer`,
}
