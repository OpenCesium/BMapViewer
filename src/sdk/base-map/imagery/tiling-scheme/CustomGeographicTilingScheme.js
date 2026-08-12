import * as Cesium from 'cesium'

class CustomGeographicTilingScheme extends Cesium.GeographicTilingScheme {
  constructor(options = {}) {
    super(options)
    this._origin = options.origin || [-180, 90]
    this._zoomOffset = options.zoomOffset || 0
    this._tileSize = options.tileSize || 256
    this._resolutions = options.resolutions || []
  }

  get zoomOffset() {
    return this._zoomOffset
  }

  tileXYToRectangle(x, y, level, result) {
    const resolution = this._resolutions[level + this._zoomOffset]
    if (!resolution) return Cesium.Rectangle.MAX_VALUE

    const tileResolution = resolution * this._tileSize
    const west = Cesium.Math.toRadians(this._origin[0] + x * tileResolution)
    const south = Cesium.Math.toRadians(this._origin[1] - (y + 1) * tileResolution)
    const east = Cesium.Math.toRadians(this._origin[0] + (x + 1) * tileResolution)
    const north = Cesium.Math.toRadians(this._origin[1] - y * tileResolution)
    if (!Cesium.defined(result)) return new Cesium.Rectangle(west, south, east, north)

    result.west = west
    result.south = south
    result.east = east
    result.north = north
    return result
  }

  positionToTileXY(position, level, result) {
    const resolution = this._resolutions[level + this._zoomOffset]
    if (!resolution) return new Cesium.Cartesian2()

    const tileResolution = resolution * this._tileSize
    const longitude = Cesium.Math.toDegrees(position.longitude)
    const latitude = Cesium.Math.toDegrees(position.latitude)
    const x = Math.floor((longitude - this._origin[0]) / tileResolution)
    const y = Math.floor((this._origin[1] - latitude) / tileResolution)
    if (!Cesium.defined(result)) return new Cesium.Cartesian2(Math.max(0, x), Math.max(0, y))
    result.x = x
    result.y = y
    return result
  }
}

export default CustomGeographicTilingScheme
