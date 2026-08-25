export default {
  id: 'cesium-terrain',
  name: 'CesiumTerrain',
  title: 'Cesium World Terrain',
  group: '三维地形',
  summary: '加载 Cesium ion 官方全球地形；请替换 Access Token 后运行。',
  code: `const token = '替换为你的 Cesium ion Token'
if (token.startsWith('替换')) {
  throw new Error('请先填写 Cesium ion Token')
}

const imagery = new BaseMaps.BaseMap(viewer, {
  type: 'arcgis',
  url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
  maximumLevel: 23,
})

const terrain = new BaseMaps.CesiumTerrain(viewer, {
  token,
  requestVertexNormals: true,
  requestWaterMask: true,
  depthTestAgainstTerrain: true,
})

await terrain.readyPromise

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(117.93234, 43.78764, 8500),
  orientation: {
    heading: Cesium.Math.toRadians(12),
    pitch: Cesium.Math.toRadians(-18),
    roll: 0,
  },
  duration: 1.2,
})

return () => {
  terrain.destroy()
  imagery.destroy()
}`,
}
