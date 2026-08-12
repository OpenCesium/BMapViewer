import * as Cesium from 'cesium'

class CustomMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options = {}) {
    super(options)
    this._origin = options.origin || [-20037508.3427892, 20037508.3427892]
    this._zoomOffset = options.zoomOffset || 0
    this._tileSize = options.tileSize || 256
    this._resolutions = options.resolutions || []
  }

  get zoomOffset() {
    return this._zoomOffset
  }

  tileXYToNativeRectangle(x, y, level, result) {
    const resolution = this._resolutions[level + this._zoomOffset]
    if (!resolution || x < 0 || y < 0) return Cesium.Rectangle.MAX_VALUE

    const tileResolution = resolution * this._tileSize
    const west = this._origin[0] + x * tileResolution
    const south = this._origin[1] - (y + 1) * tileResolution
    const east = this._origin[0] + (x + 1) * tileResolution
    const north = this._origin[1] - y * tileResolution
    if (!Cesium.defined(result)) return new Cesium.Rectangle(west, south, east, north)

    result.west = west
    result.south = south
    result.east = east
    result.north = north
    return result
  }

  positionToTileXY(position, level, result) {
    if (!Cesium.Rectangle.contains(this._rectangle, position)) return undefined
    const resolution = this._resolutions[level + this._zoomOffset]
    if (!resolution) return new Cesium.Cartesian2()

    const tileResolution = resolution * this._tileSize
    const projected = this._projection.project(position)
    const x = Math.floor((projected.x - this._origin[0]) / tileResolution)
    const y = Math.floor((this._origin[1] - projected.y) / tileResolution)
    if (!Cesium.defined(result)) return new Cesium.Cartesian2(Math.max(0, x), Math.max(0, y))
    result.x = x
    result.y = y
    return result
  }
}

export default CustomMercatorTilingScheme
