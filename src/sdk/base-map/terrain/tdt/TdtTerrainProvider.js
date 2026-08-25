import * as Cesium from 'cesium'
import { inflate } from 'pako'

const DEFAULT_URL = 'https://t{s}.tianditu.gov.cn/mapservice/swdx?T=elv_c&x={x}&y={y}&l={z}&tk={key}'
const DEFAULT_SUBDOMAINS = Object.freeze(['0', '1', '2', '3', '4', '5', '6', '7'])
const SOURCE_SIZE = 150
const TARGET_SIZE = 64

function toFiniteInteger(value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.round(parsed) : fallback
}

/**
 * 标准 Cesium 可用的天地图三维地形 Provider。
 *
 * 天地图 swdx 服务返回经过 deflate 压缩的 150 × 150 高程格网，
 * Provider 将其解压、重采样为 64 × 64 HeightmapTerrainData。
 */
class TdtTerrainProvider extends Cesium.CustomHeightmapTerrainProvider {
  constructor(options = {}) {
    const key = options.key ?? options.token ?? ''
    if (!key && !options.url) {
      throw new Cesium.DeveloperError('Tdt terrain key is required.')
    }

    const tilingScheme = options.tilingScheme || new Cesium.GeographicTilingScheme({
      ellipsoid: options.ellipsoid || Cesium.Ellipsoid.WGS84,
    })
    super({
      callback: () => undefined,
      width: TARGET_SIZE,
      height: TARGET_SIZE,
      tilingScheme,
      credit: options.credit || new Cesium.Credit('© 天地图三维地形'),
    })

    this._url = options.url || DEFAULT_URL
    this._key = key
    this._subdomains = options.subdomains?.length
      ? [...options.subdomains]
      : [...DEFAULT_SUBDOMAINS]
    this._dataType = options.dataType === 'float' ? 'float' : 'int16'
    this._minimumDataLevel = Math.max(0, toFiniteInteger(options.minimumDataLevel, 5))
    this._maximumDataLevel = Math.max(
      this._minimumDataLevel,
      toFiniteInteger(options.maximumDataLevel ?? options.maximumLevel, 11),
    )
    this._requestLevelOffset = toFiniteInteger(options.requestLevelOffset, 1)
    this._skirtHeight = Math.max(0, Number(options.skirtHeight ?? 6000))
    this._flatHeightBuffer = new Float32Array(TARGET_SIZE * TARGET_SIZE)
  }

  requestTileGeometry(x, y, level, request) {
    if (level > this._maximumDataLevel) return undefined
    if (level < this._minimumDataLevel) {
      return Promise.resolve(this._createTerrainData(this._flatHeightBuffer, level))
    }

    const url = this._buildUrl(x, y, level)
    const promise = Cesium.Resource.fetchArrayBuffer({ url, request })
    if (!promise) return undefined

    return promise.then((compressedBuffer) => {
      if (!compressedBuffer?.byteLength) {
        throw new Error(`Tdt terrain returned empty data: ${level}/${x}/${y}`)
      }
      const source = inflate(new Uint8Array(compressedBuffer))
      const heights = this._transformHeightBuffer(source)
      return this._createTerrainData(heights, level)
    })
  }

  getTileDataAvailable(x, y, level) {
    return level <= this._maximumDataLevel
  }

  loadTileDataAvailability() {
    return undefined
  }

  _buildUrl(x, y, level) {
    const subdomain = this._subdomains.length
      ? this._subdomains[Math.abs(x + y + level) % this._subdomains.length]
      : ''
    return this._url
      .replaceAll('{s}', subdomain)
      .replaceAll('{key}', encodeURIComponent(this._key))
      .replaceAll('{token}', encodeURIComponent(this._key))
      .replaceAll('{x}', String(x))
      .replaceAll('{y}', String(y))
      .replaceAll('{z}', String(level + this._requestLevelOffset))
      .replaceAll('{l}', String(level + this._requestLevelOffset))
  }

  _transformHeightBuffer(source) {
    const bytesPerHeight = this._dataType === 'float' ? 4 : 2
    const expectedLength = SOURCE_SIZE * SOURCE_SIZE * bytesPerHeight
    if (source.length !== expectedLength) {
      throw new Error(
        `Unexpected Tdt terrain tile size: ${source.length}, expected ${expectedLength}.`,
      )
    }

    const view = new DataView(source.buffer, source.byteOffset, source.byteLength)
    const heights = new Float32Array(TARGET_SIZE * TARGET_SIZE)

    for (let row = 0; row < TARGET_SIZE; row += 1) {
      const sourceRow = Math.floor((SOURCE_SIZE - 1) * row / (TARGET_SIZE - 1))
      for (let column = 0; column < TARGET_SIZE; column += 1) {
        const sourceColumn = Math.floor(
          (SOURCE_SIZE - 1) * column / (TARGET_SIZE - 1),
        )
        const offset = (sourceRow * SOURCE_SIZE + sourceColumn) * bytesPerHeight
        const height = this._dataType === 'float'
          ? view.getFloat32(offset, true)
          : view.getInt16(offset, true)
        heights[row * TARGET_SIZE + column] = (
          Number.isFinite(height) && height >= -2000 && height <= 10000
        ) ? height : 0
      }
    }
    return heights
  }

  _createTerrainData(heights, level) {
    const terrainData = new Cesium.HeightmapTerrainData({
      buffer: heights === this._flatHeightBuffer
        ? new Float32Array(heights)
        : heights,
      width: TARGET_SIZE,
      height: TARGET_SIZE,
      childTileMask: level < this._maximumDataLevel ? 15 : 0,
    })
    terrainData._skirtHeight = this._skirtHeight
    return terrainData
  }
}

export {
  DEFAULT_URL as tdtTerrainUrl,
  DEFAULT_SUBDOMAINS as tdtTerrainSubdomains,
}
export default TdtTerrainProvider
