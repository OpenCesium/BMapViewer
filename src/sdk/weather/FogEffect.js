import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { fogShader } from './shaders.js'

const defaults = {
  mode: 'depth',
  intensity: 0.5,
  depthStart: 0.22,
  depthRange: 0.2,
  density: 0.65,
  skyAmount: 0.55,
  color: '#ccccccff',
}

function normalizeFogOptions(options = {}) {
  const normalized = { ...options }

  // Preserve the previous metric-distance API. Passing near/far/visibility
  // without an explicit mode automatically selects the legacy algorithm.
  if (
    normalized.mode == null
    && (normalized.near != null || normalized.far != null || normalized.visibility != null)
  ) {
    normalized.mode = 'distance'
  }
  if (normalized.far == null && normalized.visibility != null) {
    normalized.far = normalized.visibility
  }
  delete normalized.visibility
  return normalized
}

class FogEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'fog', defaults, normalizeFogOptions(config))
    this.load()
  }

  load(config = {}) {
    return super.load(normalizeFogOptions(config))
  }

  setOptions(options = {}) {
    return super.setOptions(normalizeFogOptions(options))
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: fogShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 2),
        depthMode: () => String(this.config.mode).toLowerCase() === 'distance' ? 0 : 1,
        depthStart: () => this.getNumber('depthStart', defaults.depthStart, 0, 1),
        depthRange: () => this.getNumber('depthRange', defaults.depthRange, 0.000001, 1),
        nearDistance: () => this.getNumber('near', 500, 0, 10000000),
        farDistance: () => this.getNumber('far', 12000, 1, 10000000),
        density: () => this.getNumber('density', defaults.density, 0.01, 10),
        skyAmount: () => this.getNumber('skyAmount', defaults.skyAmount, 0, 1),
        fogColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default FogEffect
