export default {
  id: 'heatmap-3d',
  name: 'Heatmap3DLayer',
  title: '3D 热力图',
  group: '三维场景',
  summary: '将标准点数据的 value 权重转换为连续、宽缓且带热点平台的三维热力地形。',
  code: `const samples = [
  [125.801, 44.129, 720], [125.808, 44.138, 880], [125.816, 44.126, 560],
  [125.818, 44.148, 780], [125.824, 44.156, 920], [125.827, 44.138, 640],
  [125.832, 44.128, 820], [125.834, 44.148, 1000], [125.839, 44.160, 680],
  [125.842, 44.138, 760], [125.847, 44.151, 900], [125.851, 44.127, 620],
  [125.856, 44.142, 840], [125.862, 44.157, 700], [125.867, 44.132, 930],
  [125.807, 44.160, 600], [125.815, 44.166, 790], [125.828, 44.168, 570],
  [125.845, 44.169, 850], [125.858, 44.166, 650], [125.870, 44.153, 810],
  [125.812, 44.117, 670], [125.825, 44.116, 870], [125.840, 44.119, 580],
  [125.855, 44.116, 950], [125.870, 44.121, 740], [125.829, 44.145, 520],
  [125.849, 44.145, 610]
]

const heatData = samples.map(([longitude, latitude, value], index) => ({
  geometry: {
    type: 'Point',
    coordinates: [longitude, latitude]
  },
  properties: {
    id: \`heat-\${String(index + 1).padStart(2, '0')}\`,
    value
  }
}))

const layer = new MapLayers.Heatmap3DLayer(viewer, {
  radius: 36,
  blur: 0.70,
  canvasSize: 320,
  gridSize: 200,
  padding: 0.08,
  heightScale: 0.8,
  heightExponent: 0.85,
  peakBoost: 260,
  baseHeight: 20,
  maxOpacity: 0.72,
  gradient: {
    0.3: '#0000ff',
    0.5: '#00c853',
    0.7: '#fff200',
    0.95: '#ff2600'
  }
})

layer.setData(heatData)

const heatPositions = heatData.map(item => Cesium.Cartesian3.fromDegrees(
  item.geometry.coordinates[0],
  item.geometry.coordinates[1]
))
viewer.camera.flyToBoundingSphere(
  Cesium.BoundingSphere.fromPoints(heatPositions),
  {
    duration: 1.2,
    offset: new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(345),
      Cesium.Math.toRadians(-27),
      12000
    )
  }
)

return layer`,
}
