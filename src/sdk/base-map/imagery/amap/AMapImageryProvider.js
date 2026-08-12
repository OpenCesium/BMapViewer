import * as Cesium from 'cesium'
import GCJ02TilingScheme from '../tiling-scheme/GCJ02TilingScheme.js'

const TILE_URL = {
  img: '//webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  elec: '//webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  cva: '//webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
}

class AMapImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const providerOptions = {
      ...options,
      url: options.url || `${options.protocol || ''}${TILE_URL[options.style] || TILE_URL.elec}`,
      subdomains: options.subdomains?.length ? options.subdomains : ['01', '02', '03', '04'],
    }
    if (options.crs === 'WGS84' && !options.tilingScheme) {
      providerOptions.tilingScheme = new GCJ02TilingScheme()
    }
    super(providerOptions)
  }
}

export default AMapImageryProvider
