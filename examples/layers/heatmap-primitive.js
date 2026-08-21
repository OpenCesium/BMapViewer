export default {
  id: 'heatmap-primitive',
  name: 'HeatmapPrimitiveLayer',
  title: 'Primitive 热力图',
  group: '专题分析',
  summary: '以无闪烁双缓冲 Primitive 承载连续热力纹理，适合密集点位和大范围专题渲染。',
  code: `const layer = new MapLayers.HeatmapPrimitiveLayer(viewer, {
  radius: 108,
  blur: 0.86,
  renderType: 'primitive',
  canvasSize: 1200,
  padding: 0.08,
  minValue: 0,
  maxValue: 100,
  maxOpacity: 0.82,
  gradient: {
    0.22: '#283593',
    0.42: '#1565c0',
    0.58: '#00c853',
    0.76: '#dce319',
    0.9: '#ff9800',
    1.0: '#e52521'
  }
})

const samples = [
  [125.786, 44.121, 88], [125.794, 44.128, 72], [125.801, 44.116, 54],
  [125.802, 44.145, 64], [125.809, 44.153, 82], [125.814, 44.137, 96],
  [125.818, 44.119, 52], [125.820, 44.165, 71], [125.826, 44.157, 91],
  [125.827, 44.143, 76], [125.829, 44.128, 61], [125.833, 44.111, 44],
  [125.836, 44.176, 68], [125.838, 44.162, 84], [125.839, 44.148, 100],
  [125.842, 44.133, 87], [125.844, 44.118, 73], [125.848, 44.104, 58],
  [125.851, 44.174, 49], [125.853, 44.158, 79], [125.855, 44.143, 93],
  [125.858, 44.128, 66], [125.861, 44.112, 81], [125.864, 44.184, 62],
  [125.867, 44.168, 89], [125.870, 44.152, 74], [125.872, 44.137, 97],
  [125.875, 44.121, 69], [125.879, 44.106, 47], [125.883, 44.174, 83],
  [125.886, 44.156, 57], [125.889, 44.139, 86], [125.893, 44.119, 63],
  [125.798, 44.174, 56], [125.811, 44.181, 78], [125.821, 44.101, 67],
  [125.873, 44.190, 53], [125.899, 44.164, 71], [125.902, 44.145, 92],
  [125.895, 44.097, 76], [125.806, 44.098, 83], [125.780, 44.154, 65]
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
      Cesium.Math.toRadians(-48),
      17500
    )
  }
)

return layer`,
}
