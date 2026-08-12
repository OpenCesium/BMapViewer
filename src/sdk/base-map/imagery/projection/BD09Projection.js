// Baidu projection implementation adapted from @dvgis/cesium-map (Apache-2.0).
const EARTH_RADIUS = 6370996.81
const MC_BAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]
const LL_BAND = [75, 60, 45, 30, 15, 0]
const MC2LL = [
  [1.410526172116255e-8, 8.98305509648872e-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
  [-7.435856389565537e-9, 8.983055097726239e-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
  [-3.030883460898826e-8, 8.98305509983578e-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
  [-1.981981304930552e-8, 8.983055099779535e-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
  [3.09191371068437e-9, 8.983055096812155e-6, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
  [2.890871144776878e-9, 8.983055095805407e-6, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5],
]
const LL2MC = [
  [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149665666353700, 26595700718403920, -10725012458148240, 1800819912950474, 82.5],
  [0.0008277824516172526, 111320.7020463578, 647795574.6671608, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.2032032, 67.5],
  [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.475871, -115964993.2795258, 97236711.15621457, -43661943.67355427, 8477230.501135234, 52.5],
  [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796836.975426176, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.3844131725, 37.5],
  [-0.0003441963504388392, 111320.7020576856, 278.2353398772752, 2485758.690035394, 6070.750963243378, 54821.18355235118, 9540.606633304236, -2710.55326745, 1405.483844121726, 22.5],
  [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45],
]

class BD09Projection {
  constructor(options = {}) {
    this.isWgs84 = Boolean(options.isWgs84)
  }

  convertMC2LL(point) {
    if (!point) return { lng: 0, lat: 0 }
    if (this.isWgs84) {
      const lng = (point.lng / 20037508.34) * 180
      const mercatorY = (point.lat / 20037508.34) * 180
      const lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((mercatorY * Math.PI) / 180)) - Math.PI / 2)
      return { lng: Number(lng.toFixed(6)), lat: Number(lat.toFixed(6)) }
    }
    const absoluteLatitude = Math.abs(point.lat)
    const factor = MC2LL[MC_BAND.findIndex((band) => absoluteLatitude >= band)] || MC2LL.at(-1)
    const result = this.convertor(point, factor)
    return { lng: Number(result.lng.toFixed(6)), lat: Number(result.lat.toFixed(6)) }
  }

  convertLL2MC(point) {
    if (!point) return { lng: 0, lat: 0 }
    if (point.lng > 180 || point.lng < -180 || point.lat > 90 || point.lat < -90) return point
    if (this.isWgs84) {
      const earthRadius = 6378137
      const lng = ((point.lng * Math.PI) / 180) * earthRadius
      const radians = (point.lat * Math.PI) / 180
      const lat = (earthRadius / 2) * Math.log((1 + Math.sin(radians)) / (1 - Math.sin(radians)))
      return { lng: Number(lng.toFixed(2)), lat: Number(lat.toFixed(2)) }
    }

    const normalized = {
      lng: this.getLoop(point.lng, -180, 180),
      lat: this.getRange(point.lat, -74, 74),
    }
    let index = LL_BAND.findIndex((band) => normalized.lat >= band)
    if (index < 0) index = LL_BAND.findIndex((band) => normalized.lat <= -band)
    const result = this.convertor(normalized, LL2MC[index < 0 ? LL2MC.length - 1 : index])
    return { lng: Number(result.lng.toFixed(2)), lat: Number(result.lat.toFixed(2)) }
  }

  convertor(point, factor) {
    if (!point || !factor) return { lng: 0, lat: 0 }
    let x = factor[0] + factor[1] * Math.abs(point.lng)
    const value = Math.abs(point.lat) / factor[9]
    let y = factor[2]
    for (let power = 1; power <= 6; power += 1) y += factor[power + 2] * value ** power
    x *= point.lng < 0 ? -1 : 1
    y *= point.lat < 0 ? -1 : 1
    return { lng: x, lat: y }
  }

  getDistanceByMC(point1, point2) {
    return this.getDistanceByLL(this.convertMC2LL(point1), this.convertMC2LL(point2))
  }

  getDistanceByLL(point1, point2) {
    if (!point1 || !point2) return 0
    const first = {
      lng: this.getLoop(point1.lng, -180, 180),
      lat: this.getRange(point1.lat, -74, 74),
    }
    const second = {
      lng: this.getLoop(point2.lng, -180, 180),
      lat: this.getRange(point2.lat, -74, 74),
    }
    return this.getDistance(
      this.toRadians(first.lng),
      this.toRadians(second.lng),
      this.toRadians(first.lat),
      this.toRadians(second.lat),
    )
  }

  getDistance(x1, x2, y1, y2) {
    return EARTH_RADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1))
  }

  toRadians(degrees) {
    return (Math.PI * degrees) / 180
  }

  toDegrees(radians) {
    return (180 * radians) / Math.PI
  }

  getRange(value, minimum, maximum) {
    return Math.min(maximum ?? value, Math.max(minimum ?? value, value))
  }

  getLoop(value, minimum, maximum) {
    const range = maximum - minimum
    while (value > maximum) value -= range
    while (value < minimum) value += range
    return value
  }

  lngLatToMercator(point) {
    return this.convertLL2MC(point)
  }

  lngLatToPoint(point) {
    const mercator = this.convertLL2MC(point)
    return { x: mercator.lng, y: mercator.lat }
  }

  mercatorToLngLat(point) {
    return this.convertMC2LL(point)
  }

  pointToLngLat(point) {
    return this.convertMC2LL({ lng: point.x, lat: point.y })
  }

  pointToPixel(point, zoom, mapCenter, mapSize) {
    if (!point) return undefined
    const mercator = this.lngLatToMercator(point)
    const zoomUnits = this.getZoomUnits(zoom)
    return {
      x: Math.round((mercator.lng - mapCenter.lng) / zoomUnits + mapSize.width / 2),
      y: Math.round((mapCenter.lat - mercator.lat) / zoomUnits + mapSize.height / 2),
    }
  }

  pixelToPoint(pixel, zoom, mapCenter, mapSize) {
    if (!pixel) return undefined
    const zoomUnits = this.getZoomUnits(zoom)
    return this.mercatorToLngLat({
      lng: mapCenter.lng + zoomUnits * (pixel.x - mapSize.width / 2),
      lat: mapCenter.lat - zoomUnits * (pixel.y - mapSize.height / 2),
    })
  }

  getZoomUnits(zoom) {
    return 2 ** (18 - zoom)
  }
}

export default BD09Projection
