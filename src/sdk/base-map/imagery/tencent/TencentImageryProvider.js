import * as Cesium from 'cesium'

const TILE_URL = {
  img: '//p{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400',
  elec: '//rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid={style}&scene=0&version=347',
}

class TencentImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const style = options.style || '1'
    const url = (options.url || `${options.protocol || ''}${TILE_URL[options.style] || TILE_URL.elec}`)
      .replace('{style}', style)
    const providerOptions = {
      ...options,
      url,
      subdomains: options.subdomains?.length ? options.subdomains : ['0', '1', '2'],
    }
    if (options.style === 'img') {
      providerOptions.customTags = {
        ...(options.customTags || {}),
        sx: (imageryProvider, x) => x >> 4,
        sy: (imageryProvider, x, y, level) => ((1 << level) - y) >> 4,
      }
    }
    super(providerOptions)
  }
}

export default TencentImageryProvider
