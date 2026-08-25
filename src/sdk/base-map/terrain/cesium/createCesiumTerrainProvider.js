import * as Cesium from 'cesium'

const CESIUM_WORLD_TERRAIN_ASSET_ID = 1

/**
 * 使用独立 Token 创建 Cesium ion 地形 Provider，不修改全局 Ion Token。
 */
async function createCesiumTerrainProvider(options = {}) {
  const token = options.token ?? options.accessToken ?? ''
  if (!token) {
    throw new Cesium.DeveloperError('Cesium ion token is required.')
  }

  const assetId = Number(options.assetId ?? CESIUM_WORLD_TERRAIN_ASSET_ID)
  if (!Number.isInteger(assetId) || assetId <= 0) {
    throw new Cesium.DeveloperError('Cesium ion assetId must be a positive integer.')
  }

  const resourceOptions = { accessToken: token }
  if (options.server) resourceOptions.server = options.server

  const resource = await Cesium.IonResource.fromAssetId(assetId, resourceOptions)
  return Cesium.CesiumTerrainProvider.fromUrl(resource, {
    requestVertexNormals: options.requestVertexNormals ?? false,
    requestWaterMask: options.requestWaterMask ?? false,
    requestMetadata: options.requestMetadata ?? true,
    ...(options.ellipsoid ? { ellipsoid: options.ellipsoid } : {}),
    ...(options.credit ? { credit: options.credit } : {}),
    ...(options.providerOptions || {}),
  })
}

export { CESIUM_WORLD_TERRAIN_ASSET_ID }
export default createCesiumTerrainProvider
