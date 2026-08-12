import * as Cesium from 'cesium'

const TILE_URL = '//t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}'

class TdtImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const url = options.url || `${options.protocol || ''}${TILE_URL
      .replaceAll('{style}', options.style || 'vec')
      .replaceAll('{key}', options.key || '')}`
    super({
      ...options,
      url,
      subdomains: options.subdomains || ['0', '1', '2', '3', '4', '5', '6', '7'],
      maximumLevel: options.maximumLevel ?? 18,
    })
  }
}

export default TdtImageryProvider
