import * as Cesium from 'cesium'

const TILE_URL = '//tiles{s}.geovisearth.com/base/v1/{style}/{z}/{x}/{y}?format={format}&tmsIds=w&token={key}'

class GeoVisImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const url = options.url || `${options.protocol || ''}${TILE_URL
      .replaceAll('{style}', options.style || 'vec')
      .replaceAll('{format}', options.format || 'png')
      .replaceAll('{key}', options.key || '')}`
    super({
      ...options,
      url,
      subdomains: options.subdomains || ['1', '2', '3'],
    })
  }
}

export default GeoVisImageryProvider
