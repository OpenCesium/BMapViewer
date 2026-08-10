export default {
  id: 'bubble-group',
  name: 'BubbleGroupLayer',
  title: 'Canvas 气泡',
  group: '点位标注',
  summary: '批量气泡标牌，支持结构化内容、碰撞检测与距离缩放。',
  code: `const layer = new MapLayers.BubbleGroupLayer(viewer, {
  showTitle: true,
  baseColor: '#00d8e6',
  bodyColor: '#082b3b',
  bodyOpacity: 0.82,
  hideStrategy: 'distance',
  collisionThreshold: 0.35,
  titleFontSize: 14,
  contentFontSize: 12
})

layer.setData([
  {
    geometry: { type: 'Point', coordinates: [125.826, 44.151, 10] },
    properties: { id: 'bubble-a', title: '一号装置', content: [{ label: '温度', value: '26.4°C' }, { label: '状态', value: '在线', color: '#5ef2a5' }] }
  },
  {
    geometry: { type: 'Point', coordinates: [125.838, 44.145, 10] },
    properties: { id: 'bubble-b', title: '二号装置', content: [{ label: '压力', value: '0.82 MPa' }, { label: '状态', value: '关注', color: '#ffd166' }] }
  },
  {
    geometry: { type: 'Point', coordinates: [125.847, 44.153, 10] },
    properties: { id: 'bubble-c', title: '三号装置', content: [{ label: '流量', value: '18.6 t/h' }, { label: '状态', value: '在线', color: '#5ef2a5' }] }
  }
])

return layer`,
}
