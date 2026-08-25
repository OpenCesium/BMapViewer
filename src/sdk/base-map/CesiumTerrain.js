import createCesiumTerrainProvider from './terrain/cesium/createCesiumTerrainProvider.js'

/**
 * Cesium ion 地形生命周期管理器。
 */
class CesiumTerrain {
  constructor(viewer, config = {}) {
    if (!viewer) throw new Error('Viewer is required.')

    this.viewer = viewer
    this.config = {}
    this.provider = null
    this.readyPromise = Promise.resolve(null)
    this.destroyed = false
    this._shouldShow = true
    this._loadVersion = 0
    this._previousProvider = viewer.terrainProvider
    this._previousDepthTest = viewer.scene.globe.depthTestAgainstTerrain
    this.readyPromise = this.load(config)
  }

  load(config = {}) {
    this.ensureUsable()
    this._restorePreviousTerrain()
    this.config = {
      depthTestAgainstTerrain: true,
      ...config,
    }
    this.provider = null
    this._shouldShow = true
    const loadVersion = ++this._loadVersion
    const providerPromise = this.config.provider
      ? Promise.resolve(this.config.provider)
      : createCesiumTerrainProvider(this.config)

    this.readyPromise = providerPromise.then((provider) => {
      if (this.destroyed || loadVersion !== this._loadVersion) return null
      this.provider = provider
      if (this._shouldShow) this._applyTerrain()
      return provider
    })
    return this.readyPromise
  }

  switch(config = {}) {
    return this.load({ ...this.config, ...config })
  }

  getProvider() {
    return this.provider
  }

  show() {
    this.ensureUsable()
    this._shouldShow = true
    if (this.provider) this._applyTerrain()
  }

  hide() {
    if (!this.viewer || this.viewer.isDestroyed?.()) return
    this._shouldShow = false
    this._restorePreviousTerrain()
  }

  remove() {
    this._loadVersion += 1
    this.hide()
    this.provider = null
    this.readyPromise = Promise.resolve(null)
  }

  destroy() {
    if (this.destroyed) return
    this.remove()
    this.destroyed = true
    this.viewer = null
    this.config = null
    this._previousProvider = null
  }

  isDestroyed() {
    return this.destroyed
  }

  _applyTerrain() {
    this.viewer.terrainProvider = this.provider
    this.viewer.scene.globe.depthTestAgainstTerrain = Boolean(
      this.config.depthTestAgainstTerrain,
    )
    this.viewer.scene.requestRender()
  }

  _restorePreviousTerrain() {
    if (!this.viewer || this.viewer.isDestroyed?.()) return
    if (!this.provider || this.viewer.terrainProvider === this.provider) {
      this.viewer.terrainProvider = this._previousProvider
    }
    this.viewer.scene.globe.depthTestAgainstTerrain = this._previousDepthTest
    this.viewer.scene.requestRender()
  }

  ensureUsable() {
    if (this.destroyed) throw new Error('CesiumTerrain has been destroyed.')
    if (!this.viewer || this.viewer.isDestroyed?.()) {
      throw new Error('Viewer is unavailable.')
    }
  }
}

export default CesiumTerrain
