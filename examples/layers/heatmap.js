export default {
  id: 'heatmap',
  name: 'HeatmapLayer',
  title: '实体热力图',
  group: '专题分析',
  summary: '将城市活跃度点位绘制为层次清晰、连续过渡的 Canvas 热力纹理。',
  code: `const layer = new MapLayers.HeatmapLayer(viewer, {
  radius: 112,
  maxValue: 100,
  gradient: {
    0.12: '#1a237e',
    0.32: '#1565c0',
    0.5: '#00acc1',
    0.66: '#31d06f',
    0.8: '#dce319',
    0.92: '#ff9800',
    1.0: '#f52d2d'
  }
})

const samples = [
  // 城区核心热点
  [125.823, 44.143, 72], [125.827, 44.149, 84], [125.831, 44.139, 78],
  [125.833, 44.147, 100], [125.836, 44.154, 92], [125.839, 44.143, 88],
  [125.842, 44.150, 81], [125.845, 44.138, 69], [125.847, 44.157, 74],

  // 西侧连续活跃带
  [125.787, 44.134, 48], [125.794, 44.142, 62], [125.800, 44.151, 79],
  [125.805, 44.139, 91], [125.810, 44.147, 83], [125.814, 44.132, 58],
  [125.817, 44.157, 67],

  // 东侧连续活跃带
  [125.852, 44.147, 77], [125.857, 44.136, 64], [125.861, 44.154, 86],
  [125.866, 44.143, 95], [125.871, 44.158, 73], [125.876, 44.139, 82],
  [125.882, 44.150, 61], [125.889, 44.132, 45],

  // 南北方向的次级热点
  [125.809, 44.171, 52], [125.820, 44.177, 66], [125.833, 44.169, 80],
  [125.846, 44.176, 71], [125.860, 44.168, 59], [125.878, 44.174, 68],
  [125.801, 44.116, 57], [125.814, 44.108, 75], [125.827, 44.119, 63],
  [125.840, 44.111, 87], [125.854, 44.121, 70], [125.868, 44.109, 81],
  [125.883, 44.118, 54],

  // 边缘低强度点，让热力范围自然衰减
  [125.780, 44.158, 34], [125.793, 44.184, 41], [125.873, 44.187, 38],
  [125.897, 44.161, 43], [125.892, 44.101, 36], [125.785, 44.105, 32]
]

const heatData = samples.map(([longitude, latitude, value], index) => ({
  geometry: {
    type: 'Point',
    coordinates: [longitude, latitude]
  },
  properties: {
    id: \`activity-\${String(index + 1).padStart(2, '0')}\`,
    value
  }
}))

layer.setData(heatData)

const positions = heatData.map(item => Cesium.Cartesian3.fromDegrees(
  item.geometry.coordinates[0],
  item.geometry.coordinates[1]
))
viewer.camera.flyToBoundingSphere(
  Cesium.BoundingSphere.fromPoints(positions),
  {
    duration: 1.2,
    offset: new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(350),
      Cesium.Math.toRadians(-52),
      16500
    )
  }
)

return layer`,
}
