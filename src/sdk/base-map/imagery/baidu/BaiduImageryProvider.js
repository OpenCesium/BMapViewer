import * as Cesium from 'cesium'
import BD09TilingScheme from '../tiling-scheme/BD09TilingScheme.js'

const TILE_URL = {
  vec: 'https://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20210709',
  img: 'https://maponline{s}.bdimg.com/starpic/?qt=satepc&u=x={x};y={y};z={z};v=009;type=sate&fm=46',
}

const STYLE_ALIASES = Object.freeze({
  normal: 'vec',
  vec: 'vec',
  vector: 'vec',
  elec: 'vec',
  img: 'img',
  image: 'img',
  imagery: 'img',
  satellite: 'img',
  custom: 'custom',
})

function normalizeStyle(style = 'normal') {
  return STYLE_ALIASES[String(style).toLowerCase()]
}

function normalizeProtocol(url, protocol) {
  if (!protocol) return url
  const scheme = String(protocol).replace(/:\/\/$/, '').replace(/:$/, '')
  return url.replace(/^https?:/, `${scheme}:`)
}

class BaiduImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const style = normalizeStyle(options.style)
    if (!options.url && !style) {
      throw new Error(`Unsupported Baidu map style: ${options.style}`)
    }
    if (!options.url && style === 'custom') {
      throw new Error('Baidu custom map style requires an authorized custom url.')
    }

    const template = options.url || TILE_URL[style]
    const customStyle = options.customId || options.style || ''
    const url = normalizeProtocol(template, options.protocol)
      .replaceAll('{customId}', encodeURIComponent(customStyle))
      .replaceAll('{style}', encodeURIComponent(customStyle))
    let tilingScheme = options.tilingScheme

    if (!tilingScheme && options.crs === 'WGS84') {
      const resolutions = Array.from({ length: 19 }, (_, index) => 256 * 2 ** (18 - index))
      tilingScheme = new BD09TilingScheme({
        resolutions,
        rectangleSouthwestInMeters: new Cesium.Cartesian2(-20037726.37, -12474104.17),
        rectangleNortheastInMeters: new Cesium.Cartesian2(20037726.37, 12474104.17),
      })
    } else if (!tilingScheme) {
      tilingScheme = new Cesium.WebMercatorTilingScheme({
        rectangleSouthwestInMeters: new Cesium.Cartesian2(-33554054, -33746824),
        rectangleNortheastInMeters: new Cesium.Cartesian2(33554054, 33746824),
      })
    }

    const subdomains = options.subdomains || ['0', '1', '2', '3']
    super({
      ...options,
      url,
      subdomains,
      tilingScheme,
      maximumLevel: options.maximumLevel ?? 18,
      credit: options.credit || new Cesium.Credit('© Baidu Maps'),
    })
    this._url = url
    this._crs = options.crs || 'BD09'
    this._style = style || 'custom'
    this._subdomains = Array.isArray(subdomains) ? subdomains : String(subdomains).split('')
    this._rectangle = this._tilingScheme.rectangle
  }

  requestImage(x, y, level) {
    const xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level)
    const yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level)
    const subdomain = this._subdomains[Math.abs(x + y + level) % this._subdomains.length] || '0'
    let url = this._url
      .replaceAll('{z}', String(level))
      .replaceAll('{s}', subdomain)

    if (this._crs === 'WGS84') {
      url = url.replaceAll('{x}', String(x)).replaceAll('{y}', String(-y))
    } else {
      url = url
        .replaceAll('{x}', String(x - xTiles / 2))
        .replaceAll('{y}', String(yTiles / 2 - y - 1))
    }
    return Cesium.ImageryProvider.loadImage(this, url)
  }
}

export { STYLE_ALIASES as baiduImageryStyles }
export default BaiduImageryProvider
