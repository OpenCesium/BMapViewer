import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { snowShader } from './shaders.js'

const defaults = {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: 18.4349,
  drift: 1,
  color: '#ffffffff',
}

class SnowEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'snow', defaults, config)
    this.load()
  }

  createStage(name) {
    return new Cesium.PostProcessStage({
      name,
      fragmentShader: snowShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 1),
        density: () => this.getNumber('density', defaults.density, 0.1, 3),
        speed: () => this.getNumber('speed', defaults.speed, 0.05, 5),
        size: () => this.getNumber('size', defaults.size, 0.1, 3),
        angle: () => this.getNumber('angle', defaults.angle, -180, 180),
        drift: () => this.getNumber('drift', defaults.drift, -2, 2),
        tint: () => this.getColor('color', defaults.color),
      },
    })
  }
}

export default SnowEffect
