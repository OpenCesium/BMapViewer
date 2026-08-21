import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { cloudShader } from './shaders.js'

const defaults = {
  intensity: 1,
  coverage: 0.52,
  baseHeight: 4800,
  topHeight: 8800,
  scale: 1,
  speed: 0.55,
  windDirection: 35,
  maxDistance: 160000,
  steps: 72,
  color: '#f1f4f6e6',
}

function normalizeCloudOptions(options = {}) {
  const normalized = { ...options }

  if (normalized.baseHeight == null && normalized.cloudBase != null) {
    normalized.baseHeight = normalized.cloudBase
  }
  if (normalized.topHeight == null && normalized.cloudTop != null) {
    normalized.topHeight = normalized.cloudTop
  }
  if (normalized.windDirection == null && normalized.windAngle != null) {
    normalized.windDirection = normalized.windAngle
  }

  // Compatibility with the former screen-space altitude parameter.
  if (
    normalized.altitude != null
    && normalized.baseHeight == null
    && normalized.topHeight == null
  ) {
    const altitude = Math.min(1, Math.max(0, Number(normalized.altitude) || 0))
    normalized.baseHeight = 2000 + altitude * 5000
    normalized.topHeight = normalized.baseHeight + 4000
  }

  delete normalized.cloudBase
  delete normalized.cloudTop
  delete normalized.windAngle
  delete normalized.altitude
  return normalized
}

class CloudEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'cloud', defaults, normalizeCloudOptions(config))
    this.surfaceCartographic = new Cesium.Cartographic()
    this.surfacePosition = new Cesium.Cartesian3()
    this.windVector = new Cesium.Cartesian3()
    this.windEast = new Cesium.Cartesian3()
    this.windNorth = new Cesium.Cartesian3()
    this.initializeWindBasis()
    this.load()
  }

  load(config = {}) {
    return super.load(normalizeCloudOptions(config))
  }

  setOptions(options = {}) {
    return super.setOptions(normalizeCloudOptions(options))
  }

  initializeWindBasis() {
    const cartographic = this.viewer.camera.positionCartographic
    const longitude = cartographic?.longitude || 0
    const latitude = cartographic?.latitude || 0
    const sinLongitude = Math.sin(longitude)
    const cosLongitude = Math.cos(longitude)
    const sinLatitude = Math.sin(latitude)
    const cosLatitude = Math.cos(latitude)

    Cesium.Cartesian3.fromElements(-sinLongitude, cosLongitude, 0, this.windEast)
    Cesium.Cartesian3.fromElements(
      -sinLatitude * cosLongitude,
      -sinLatitude * sinLongitude,
      cosLatitude,
      this.windNorth,
    )
  }

  getPlanetRadius() {
    const cartographic = this.viewer.camera.positionCartographic
    if (!cartographic) return Cesium.Ellipsoid.WGS84.maximumRadius
    this.surfaceCartographic.longitude = cartographic.longitude
    this.surfaceCartographic.latitude = cartographic.latitude
    this.surfaceCartographic.height = 0
    const surface = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(
      this.surfaceCartographic,
      this.surfacePosition,
    )
    return Cesium.Cartesian3.magnitude(surface)
  }

  getWindVector() {
    const angle = Cesium.Math.toRadians(
      this.getNumber('windDirection', defaults.windDirection, -360, 360),
    )
    Cesium.Cartesian3.multiplyByScalar(this.windEast, Math.cos(angle), this.windVector)
    Cesium.Cartesian3.multiplyByScalar(
      this.windNorth,
      Math.sin(angle),
      this.surfacePosition,
    )
    return Cesium.Cartesian3.add(this.windVector, this.surfacePosition, this.windVector)
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: cloudShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 2),
        coverage: () => this.getNumber('coverage', defaults.coverage, 0, 1),
        baseHeight: () => this.getNumber('baseHeight', defaults.baseHeight, 100, 50000),
        topHeight: () => Math.max(
          this.getNumber('topHeight', defaults.topHeight, 200, 60000),
          this.getNumber('baseHeight', defaults.baseHeight, 100, 50000) + 100,
        ),
        planetRadius: () => this.getPlanetRadius(),
        scale: () => this.getNumber('scale', defaults.scale, 0.2, 8),
        speed: () => this.getNumber('speed', defaults.speed, -5, 5),
        windDirectionWC: () => this.getWindVector(),
        maxDistance: () => this.getNumber('maxDistance', defaults.maxDistance, 10000, 500000),
        marchSteps: () => this.getNumber('steps', defaults.steps, 16, 72),
        cloudColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default CloudEffect
