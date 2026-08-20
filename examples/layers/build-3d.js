export default {
  id: 'build-3d',
  name: 'Build3DLayer',
  title: '三维建筑',
  group: '三维场景',
  summary: '加载 public/3d-tiles 下的园区三维建筑数据。',
  code: `const layer = new MapLayers.Build3DLayer(viewer, {
  url: buildingTilesetUrl,
  name: '园区三维建筑'
})

const tileset = await layer.load()

viewer.camera.flyToBoundingSphere(tileset.boundingSphere, {
  duration: 1.2,
  offset: new Cesium.HeadingPitchRange(
    Cesium.Math.toRadians(28),
    Cesium.Math.toRadians(-38),
    18000
  )
})

return layer`,
}
