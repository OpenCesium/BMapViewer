export default {
  id: 'mask',
  name: 'MaskLayer',
  title: '区域遮罩',
  group: '线面图层',
  summary: '在目标区域外侧叠加可配置颜色和透明度的遮罩，并突出显示区域边界。',
  code: `const layer = new MapLayers.MaskLayer(viewer, {
  color: '#000000',
  opacity: 0.88,
  outline: true,
  outlineColor: '#55f7df',
  outlineOpacity: 0.95,
  outlineWidth: 3,
  clampToGround: false,
  height: 20
})

layer.setData([
  {
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [125.807, 44.159],
        [125.819, 44.169],
        [125.842, 44.170],
        [125.858, 44.157],
        [125.856, 44.138],
        [125.839, 44.126],
        [125.817, 44.132],
        [125.805, 44.145],
        [125.807, 44.159]
      ]]
    },
    properties: {
      id: 'jiutai-focus-area',
      name: '九台重点区域'
    }
  }
])

return layer`,
}
