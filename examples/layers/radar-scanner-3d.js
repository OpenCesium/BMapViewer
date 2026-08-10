export default {
  id: 'radar-scanner-3d',
  name: 'RadarScanner3DLayer',
  title: '三维雷达',
  group: '三维场景',
  summary: '绘制半球雷达与持续旋转的扫描扇面。',
  code: `const layer = new MapLayers.RadarScanner3DLayer(viewer, {
  position: [125.834, 44.147, 0],
  radius: 1500,
  color: 'rgb(38, 245, 229)',
  outlineColor: '#a8fff7',
  speed: 1.35,
  hemisphereAlpha: 0.16,
  scanAlpha: 0.7,
  autoStart: true
})

return layer`,
}
