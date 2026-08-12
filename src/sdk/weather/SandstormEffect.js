import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { sandstormShader } from './shaders.js'

const defaults = {
  intensity: 0.72,
  density: 0.9,
  speed: 1,
  wind: 0.8,
  color: '#c8894de6',
}

class SandstormEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'sandstorm', defaults, config)
    this.load()
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: sandstormShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 2),
        density: () => this.getNumber('density', defaults.density, 0.05, 2.5),
        speed: () => this.getNumber('speed', defaults.speed, 0.01, 5),
        wind: () => this.getNumber('wind', defaults.wind, -2, 2),
        sandColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default SandstormEffect
