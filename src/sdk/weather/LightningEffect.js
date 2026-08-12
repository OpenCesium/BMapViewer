import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { lightningShader } from './shaders.js'

const defaults = {
  intensity: 1,
  frequency: 0.42,
  brightness: 1.15,
  width: 0.012,
  color: '#e7edffff',
}

class LightningEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'lightning', defaults, config)
    this.load()
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: lightningShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 2),
        frequency: () => this.getNumber('frequency', defaults.frequency, 0.01, 5),
        brightness: () => this.getNumber('brightness', defaults.brightness, 0, 3),
        width: () => this.getNumber('width', defaults.width, 0.001, 0.08),
        flashColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default LightningEffect
