export default {
  id: 'gradient-wall',
  name: 'GradientWallLayer',
  title: '渐变立体墙',
  group: '三维场景',
  summary: '使用垂直透明渐变构建立体区域边界，支持线、面和逐顶点高度。',
  code: `const layer = new MapLayers.GradientWallLayer(viewer, {
  color: '#35eaff',
  height: 900,
  baseHeight: 20,
  opacity: 0.96,
  opacityStops: {
    0.0: 1.0,
    0.2: 0.82,
    0.45: 0.56,
    0.7: 0.28,
    0.88: 0.1,
    1.0: 0.0
  }
})

const wallData = [
  {
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [125.823, 44.139], [125.829, 44.154], [125.844, 44.158],
        [125.853, 44.146], [125.847, 44.132], [125.832, 44.129],
        [125.823, 44.139]
      ]]
    },
    properties: {
      id: 'command-center-wall',
      name: '指挥中心警戒区',
      height: 720,
      color: '#ffc247',
      opacity: 0.9
    }
  },
  {
    geometry: {
      type: 'LineString',
      coordinates: [
        [125.792, 44.124, 420], [125.801, 44.137, 620],
        [125.812, 44.145, 860], [125.824, 44.148, 680]
      ]
    },
    properties: {
      id: 'west-height-wall',
      name: '西侧变高防护墙',
      baseHeight: 20,
      gradient: {
        0.0: 'rgba(255, 74, 156, 0.95)',
        0.45: 'rgba(203, 92, 255, 0.58)',
        0.78: 'rgba(88, 133, 255, 0.22)',
        1.0: 'rgba(88, 133, 255, 0)'
      }
    }
  }
]

layer.setData(wallData)

const cameraPoints = wallData.flatMap(item => {
  const coordinates = item.geometry.type === 'Polygon'
    ? item.geometry.coordinates[0]
    : item.geometry.coordinates
  return coordinates.map(position => Cesium.Cartesian3.fromDegrees(position[0], position[1]))
})
viewer.camera.flyToBoundingSphere(
  Cesium.BoundingSphere.fromPoints(cameraPoints),
  {
    duration: 1.2,
    offset: new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(338),
      Cesium.Math.toRadians(-28),
      11800
    )
  }
)

return layer`,
}
