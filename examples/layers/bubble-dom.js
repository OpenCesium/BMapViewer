export default {
  id: 'bubble-dom',
  name: 'BubbleLayer',
  title: 'DOM 信息窗',
  group: '点位标注',
  summary: '使用 SDK 默认 popup.css，将 DOM 信息窗锚定到三维坐标。',
  code: `const layer = new MapLayers.BubbleLayer(viewer, {
  className: 'bx-popup-ctn0',
  collisionThreshold: 0.35
})

layer.setData([
  {
    geometry: { type: 'Point', coordinates: [125.834, 44.147, 20] },
    properties: {
      id: 'popup-energy',
      content: { header: '能源中心', body: '实时负荷：82%<br>运行状态：正常' }
    },
    isClose: false
  }
])

return layer`,
}
