import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { cloudShader } from './shaders.js'

const defaults = {
  intensity: 0.75,
  coverage: 0.58,
  scale: 3.8,
  speed: 0.65,
  altitude: 0.66,
  color: '#d7e0e6cc',
}

class CloudEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'cloud', defaults, config)
    this.load()
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: cloudShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 2),
        coverage: () => this.getNumber('coverage', defaults.coverage, 0, 1),
        scale: () => this.getNumber('scale', defaults.scale, 0.25, 20),
        speed: () => this.getNumber('speed', defaults.speed, -5, 5),
        altitude: () => this.getNumber('altitude', defaults.altitude, 0, 1),
        cloudColor: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default CloudEffect
