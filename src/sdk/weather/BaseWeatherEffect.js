import * as Cesium from 'cesium'

let effectSeed = 0

function createEffectName(type) {
  effectSeed += 1
  return `bmap-viewer-weather-${type}-${effectSeed}`
}

/**
 * 天气后处理效果基类。
 *
 * 子类只需要实现 createStage，并通过闭包 uniforms 读取 this.config。
 */
class BaseWeatherEffect {
  constructor(viewer, type, defaults = {}, config = {}) {
    if (!viewer?.scene?.postProcessStages) {
      throw new Error('A Cesium Viewer with postProcessStages is required.')
    }

    this.viewer = viewer
    this.type = type
    this.defaults = { ...defaults }
    this.config = { ...defaults, ...config }
    this.stage = null
    this.destroyed = false
    this.colorCache = new Map()
  }

  load(config = {}) {
    this.ensureUsable()
    this.remove()
    this.config = { ...this.defaults, ...this.config, ...config }
    this.colorCache.clear()
    this.stage = this.createStage(createEffectName(this.type))
    this.viewer.scene.postProcessStages.add(this.stage)
    this.viewer.scene.requestRender()
    return this.stage
  }

  createStage() {
    throw new Error('createStage must be implemented by the weather effect.')
  }

  setOptions(options = {}) {
    this.ensureUsable()
    this.config = { ...this.config, ...options }
    this.colorCache.clear()
    this.viewer.scene.requestRender()
    return this
  }

  getOptions() {
    return { ...this.config }
  }

  getStage() {
    return this.stage
  }

  getColor(key, fallback) {
    const value = this.config[key] ?? fallback
    const cacheKey = `${key}:${String(value)}`
    if (!this.colorCache.has(cacheKey)) {
      const color = value instanceof Cesium.Color
        ? Cesium.Color.clone(value)
        : Cesium.Color.fromCssColorString(String(value))
      if (!color) throw new Error(`Invalid weather color: ${value}`)
      this.colorCache.set(cacheKey, color)
    }
    return this.colorCache.get(cacheKey)
  }

  getNumber(key, fallback, minimum = -Infinity, maximum = Infinity) {
    const number = Number(this.config[key] ?? fallback)
    if (!Number.isFinite(number)) return fallback
    return Math.min(maximum, Math.max(minimum, number))
  }

  show() {
    this.ensureUsable()
    if (this.stage) this.stage.enabled = true
    this.viewer.scene.requestRender()
    return this
  }

  hide() {
    this.ensureUsable()
    if (this.stage) this.stage.enabled = false
    this.viewer.scene.requestRender()
    return this
  }

  start() {
    return this.show()
  }

  stop() {
    return this.hide()
  }

  remove() {
    const collection = this.viewer?.scene?.postProcessStages
    if (this.stage && collection?.contains(this.stage)) {
      collection.remove(this.stage)
    }
    this.stage = null
  }

  destroy() {
    if (this.destroyed) return
    this.remove()
    this.destroyed = true
    this.colorCache.clear()
    this.viewer = null
    this.config = null
    this.defaults = null
  }

  isDestroyed() {
    return this.destroyed
  }

  ensureUsable() {
    if (this.destroyed) throw new Error(`${this.constructor.name} has been destroyed.`)
    if (!this.viewer || this.viewer.isDestroyed()) {
      throw new Error('Viewer is unavailable.')
    }
  }
}

export default BaseWeatherEffect
