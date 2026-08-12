import * as Cesium from 'cesium'

const DEFAULT_SERVICE_URL = 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'

function createTileUrl(serviceUrl, accessToken) {
  const normalizedUrl = String(serviceUrl || DEFAULT_SERVICE_URL).replace(/\/$/, '')
  const hasTileTemplate = normalizedUrl.includes('{z}')
    && normalizedUrl.includes('{x}')
    && (normalizedUrl.includes('{y}') || normalizedUrl.includes('{reverseY}'))
  const tileUrl = hasTileTemplate
    ? normalizedUrl
    : `${normalizedUrl}/tile/{z}/{y}/{x}`

  if (!accessToken) return tileUrl
  const separator = tileUrl.includes('?') ? '&' : '?'
  return `${tileUrl}${separator}token=${encodeURIComponent(accessToken)}`
}

/**
 * ArcGIS 缓存地图服务 Provider。
 *
 * 既可以传入 MapServer 根地址，也可以直接传入包含 {z}/{y}/{x} 的瓦片模板。
 */
class ArcGISImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const serviceUrl = options.url || DEFAULT_SERVICE_URL
    super({
      ...options,
      url: createTileUrl(serviceUrl, options.accessToken),
      minimumLevel: options.minimumLevel ?? 0,
      maximumLevel: options.maximumLevel ?? 23,
      credit: options.credit || new Cesium.Credit('© Esri World Imagery'),
    })
    this._serviceUrl = serviceUrl
  }

  get serviceUrl() {
    return this._serviceUrl
  }
}

export { DEFAULT_SERVICE_URL as arcgisWorldImageryUrl }
export default ArcGISImageryProvider
