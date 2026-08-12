import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { fogShader } from './shaders.js'

const defaults = {
  intensity: 0.78,
  near: 500,
  far: 12000,
  density: 1.15,
  skyAmount: 0.22,
  color: '#b9c7cddd',
}

function normalizeFogOptions(options = {}) {
  const normalized = { ...options }
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
        nearDistance: () => this.getNumber('near', defaults.near, 0, 10000000),
        farDistance: () => this.getNumber('far', defaults.far, 1, 10000000),
        density: () => this.getNumber('density', defaults.density, 0.01, 10),
        skyAmount: () => this.getNumber('skyAmount', defaults.skyAmount, 0, 1),
        fogColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default FogEffect
