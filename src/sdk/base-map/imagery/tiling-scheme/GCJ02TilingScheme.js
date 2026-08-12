import * as Cesium from 'cesium'
import CoordTransform from '../../transform/CoordTransform.js'

class GCJ02TilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options = {}) {
    super(options)
    const projection = new Cesium.WebMercatorProjection()

    this._projection.project = (cartographic) => {
      const [longitude, latitude] = CoordTransform.WGS84ToGCJ02(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
      )
      const result = projection.project(new Cesium.Cartographic(
        Cesium.Math.toRadians(longitude),
        Cesium.Math.toRadians(latitude),
      ))
      return new Cesium.Cartesian2(result.x, result.y)
    }

    this._projection.unproject = (cartesian) => {
      const cartographic = projection.unproject(cartesian)
      const [longitude, latitude] = CoordTransform.GCJ02ToWGS84(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
      )
      return new Cesium.Cartographic(
        Cesium.Math.toRadians(longitude),
        Cesium.Math.toRadians(latitude),
      )
    }
  }
}

export default GCJ02TilingScheme
