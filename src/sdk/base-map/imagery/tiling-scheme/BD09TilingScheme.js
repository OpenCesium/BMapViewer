import * as Cesium from 'cesium'
import BD09Projection from '../projection/BD09Projection.js'
import CoordTransform from '../../transform/CoordTransform.js'

class BD09TilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options = {}) {
    super(options)
    const projection = new BD09Projection()

    this._projection.project = (cartographic) => {
      let point = CoordTransform.WGS84ToGCJ02(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
      )
      point = CoordTransform.GCJ02ToBD09(point[0], point[1])
      point[0] = Math.min(180, Math.max(-180, point[0]))
      point[1] = Math.min(74.000022, Math.max(-71.988531, point[1]))
      const result = projection.lngLatToPoint({ lng: point[0], lat: point[1] })
      return new Cesium.Cartesian2(result.x, result.y)
    }

    this._projection.unproject = (cartesian) => {
      let point = projection.mercatorToLngLat({ lng: cartesian.x, lat: cartesian.y })
      point = CoordTransform.BD09ToGCJ02(point.lng, point.lat)
      point = CoordTransform.GCJ02ToWGS84(point[0], point[1])
      return new Cesium.Cartographic(
        Cesium.Math.toRadians(point[0]),
        Cesium.Math.toRadians(point[1]),
      )
    }
    this.resolutions = options.resolutions || []
  }

  tileXYToNativeRectangle(x, y, level, result) {
    const tileWidth = this.resolutions[level]
    const west = x * tileWidth
    const east = (x + 1) * tileWidth
    const north = (-y + 1) * tileWidth
    const south = -y * tileWidth
    if (!Cesium.defined(result)) return new Cesium.Rectangle(west, south, east, north)
    result.west = west
    result.south = south
    result.east = east
    result.north = north
    return result
  }

  positionToTileXY(position, level, result) {
    if (!Cesium.Rectangle.contains(this._rectangle, position)) return undefined
    const projected = this._projection.project(position)
    if (!Cesium.defined(projected)) return undefined
    const tileWidth = this.resolutions[level]
    const x = Math.floor(projected.x / tileWidth)
    const y = -Math.floor(projected.y / tileWidth)
    if (!Cesium.defined(result)) return new Cesium.Cartesian2(x, y)
    result.x = x
    result.y = y
    return result
  }
}

export default BD09TilingScheme
