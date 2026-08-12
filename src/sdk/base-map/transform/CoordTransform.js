// Coordinate transform implementation adapted from @dvgis/cesium-map (Apache-2.0).
const BD_FACTOR = (3.14159265358979324 * 3000.0) / 180.0
const PI = 3.1415926535897932384626
const RADIUS = 6378245.0
const EE = 0.00669342162296594323

class CoordTransform {
  static BD09ToGCJ02(lng, lat) {
    const x = Number(lng) - 0.0065
    const y = Number(lat) - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * BD_FACTOR)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * BD_FACTOR)
    return [z * Math.cos(theta), z * Math.sin(theta)]
  }

  static GCJ02ToBD09(lng, lat) {
    const longitude = Number(lng)
    const latitude = Number(lat)
    const z = Math.sqrt(longitude ** 2 + latitude ** 2) + 0.00002 * Math.sin(latitude * BD_FACTOR)
    const theta = Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * BD_FACTOR)
    return [z * Math.cos(theta) + 0.0065, z * Math.sin(theta) + 0.006]
  }

  static WGS84ToGCJ02(lng, lat) {
    const longitude = Number(lng)
    const latitude = Number(lat)
    if (this.outOfChina(longitude, latitude)) return [longitude, latitude]
    const [deltaLng, deltaLat] = this.delta(longitude, latitude)
    return [longitude + deltaLng, latitude + deltaLat]
  }

  static GCJ02ToWGS84(lng, lat) {
    const longitude = Number(lng)
    const latitude = Number(lat)
    if (this.outOfChina(longitude, latitude)) return [longitude, latitude]
    const [deltaLng, deltaLat] = this.delta(longitude, latitude)
    return [longitude - deltaLng, latitude - deltaLat]
  }

  static delta(lng, lat) {
    let deltaLng = this.transformLng(lng - 105, lat - 35)
    let deltaLat = this.transformLat(lng - 105, lat - 35)
    const radLat = (lat / 180) * PI
    let magic = Math.sin(radLat)
    magic = 1 - EE * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    deltaLng = (deltaLng * 180) / ((RADIUS / sqrtMagic) * Math.cos(radLat) * PI)
    deltaLat = (deltaLat * 180) / (((RADIUS * (1 - EE)) / (magic * sqrtMagic)) * PI)
    return [deltaLng, deltaLat]
  }

  static transformLng(lng, lat) {
    let result = 300 + lng + 2 * lat + 0.1 * lng ** 2 + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    result += ((20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2) / 3
    result += ((20 * Math.sin(lng * PI) + 40 * Math.sin((lng / 3) * PI)) * 2) / 3
    result += ((150 * Math.sin((lng / 12) * PI) + 300 * Math.sin((lng / 30) * PI)) * 2) / 3
    return result
  }

  static transformLat(lng, lat) {
    let result = -100 + 2 * lng + 3 * lat + 0.2 * lat ** 2 + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
    result += ((20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2) / 3
    result += ((20 * Math.sin(lat * PI) + 40 * Math.sin((lat / 3) * PI)) * 2) / 3
    result += ((160 * Math.sin((lat / 12) * PI) + 320 * Math.sin((lat * PI) / 30)) * 2) / 3
    return result
  }

  static outOfChina(lng, lat) {
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55)
  }

  // 兼容旧版 API 命名。
  static out_of_china(lng, lat) {
    return this.outOfChina(lng, lat)
  }
}

export default CoordTransform
