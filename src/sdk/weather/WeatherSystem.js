import { createWeatherEffect } from './createWeatherEffect.js'

/**
 * 单一天气效果管理器。
 *
 * 用于在同一 Viewer 中加载、切换并销毁当前天气效果，避免后处理阶段重复叠加。
 */
class WeatherSystem {
  constructor(viewer, config = {}) {
    if (!viewer) throw new Error('Viewer is required.')
    this.viewer = viewer
    this.effect = null
    this.type = null
    this.config = null
    this.destroyed = false

    if (config.type) this.load(config.type, config)
  }

  load(type, options = {}) {
    this.ensureUsable()
    this.remove()
    const effectOptions = { ...options }
    delete effectOptions.type
    this.type = String(type).toLowerCase()
    this.config = { ...effectOptions }
    this.effect = createWeatherEffect(this.viewer, this.type, effectOptions)
    return this.effect
  }

  switch(type, options = {}) {
    return this.load(type, options)
  }

  setOptions(options = {}) {
    this.ensureUsable()
    if (!this.effect) throw new Error('No weather effect is loaded.')
    this.config = { ...this.config, ...options }
    this.effect.setOptions(options)
    return this
  }

  getEffect() {
    return this.effect
  }

  show() {
    this.effect?.show()
    return this
  }

  hide() {
    this.effect?.hide()
    return this
  }

  remove() {
    this.effect?.destroy()
    this.effect = null
    this.type = null
    this.config = null
  }

  destroy() {
    if (this.destroyed) return
    this.remove()
    this.destroyed = true
    this.viewer = null
  }

  isDestroyed() {
    return this.destroyed
  }

  ensureUsable() {
    if (this.destroyed) throw new Error('WeatherSystem has been destroyed.')
    if (!this.viewer || this.viewer.isDestroyed()) {
      throw new Error('Viewer is unavailable.')
    }
  }
}

export default WeatherSystem
