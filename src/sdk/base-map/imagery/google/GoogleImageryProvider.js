import * as Cesium from 'cesium'
import GCJ02TilingScheme from '../tiling-scheme/GCJ02TilingScheme.js'

const STYLE_CODES = Object.freeze({
  normal: 'm',
  vec: 'm',
  vector: 'm',
  elec: 'm',
  roadmap: 'm',
  img: 's',
  image: 's',
  imagery: 's',
  satellite: 's',
  cva: 'h',
  label: 'h',
  labels: 'h',
  ter: 'p',
  terrain: 'p',
  img_cva: 'y',
  hybrid: 'y',
})

const PUBLIC_TILE_URL = 'https://mt{s}.google.com/vt/lyrs={style}&hl={language}&gl={region}&x={x}&y={y}&z={z}'
const OFFICIAL_TILE_URL = 'https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session={sessionToken}&key={key}'

function createUrl(options, styleCode) {
  if (options.url) return options.url
  if (options.key || options.sessionToken) {
    if (!options.key || !options.sessionToken) {
      throw new Error('Google Maps Tile API requires both key and sessionToken.')
    }
    return OFFICIAL_TILE_URL
      .replace('{key}', encodeURIComponent(options.key))
      .replace('{sessionToken}', encodeURIComponent(options.sessionToken))
  }
  return PUBLIC_TILE_URL
    .replace('{style}', styleCode)
    .replace('{language}', encodeURIComponent(options.language || 'zh-CN'))
    .replace('{region}', encodeURIComponent(options.region || 'cn'))
}

class GoogleImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    const styleName = String(options.style || 'normal').toLowerCase()
    const styleCode = STYLE_CODES[styleName]
    if (!options.url && !styleCode) {
      throw new Error(`Unsupported Google map style: ${options.style}`)
    }

    const providerOptions = {
      ...options,
      url: createUrl(options, styleCode),
      subdomains: options.subdomains || ['0', '1', '2', '3'],
      maximumLevel: options.maximumLevel ?? 22,
      credit: options.credit || new Cesium.Credit('© Google'),
    }
    if (options.crs === 'WGS84' && !options.tilingScheme && !(options.key && options.sessionToken)) {
      providerOptions.tilingScheme = new GCJ02TilingScheme()
    }
    super(providerOptions)
    this._style = styleName
  }
}

export { STYLE_CODES as googleImageryStyles }
export default GoogleImageryProvider
