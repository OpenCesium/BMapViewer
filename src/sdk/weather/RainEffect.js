import * as Cesium from 'cesium'
import BaseWeatherEffect from './BaseWeatherEffect.js'
import { rainLightningShader, rainShader } from './shaders.js'

const defaults = {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: -22.9183,
  wind: 0,
  color: '#99b3ccff',
  lightning: false,
  lightningMixFactor: 0.35,
  lightningFallInterval: 0.8,
}

class RainEffect extends BaseWeatherEffect {
  constructor(viewer, config = {}) {
    super(viewer, 'rain', defaults, config)
    this.rainStage = null
    this.lightningStage = null
    this.load()
  }

  createStage(name) {
    this.rainStage = new Cesium.PostProcessStage({
      name: `${name}-rain`,
      fragmentShader: rainShader,
      uniforms: {
        intensity: () => this.getNumber('intensity', defaults.intensity, 0, 1),
        density: () => this.getNumber('density', defaults.density, 0.1, 3),
        speed: () => this.getNumber('speed', defaults.speed, 0.05, 5),
        size: () => this.getNumber('size', defaults.size, 0.1, 3),
        angle: () => this.getNumber('angle', defaults.angle, -180, 180),
        wind: () => this.getNumber('wind', defaults.wind, -2, 2),
        tint: () => this.getColor('color', defaults.color),
      },
    })

    this.lightningStage = new Cesium.PostProcessStage({
      name: `${name}-lightning`,
      fragmentShader: rainLightningShader,
      uniforms: {
        enabled: () => (Boolean(this.config.lightning) ? 1 : 0),
        mixFactor: () => this.getNumber(
          'lightningMixFactor',
          defaults.lightningMixFactor,
          0,
          1,
        ),
        fallInterval: () => this.getNumber(
          'lightningFallInterval',
          defaults.lightningFallInterval,
          0.01,
          1,
        ),
      },
    })

    return new Cesium.PostProcessStageComposite({
      name,
      stages: [this.rainStage, this.lightningStage],
      inputPreviousStageTexture: true,
    })
  }

  remove() {
    super.remove()
    this.rainStage = null
    this.lightningStage = null
  }
}

export default RainEffect
