import TdtTerrainProvider from './terrain/tdt/TdtTerrainProvider.js'

/**
 * 天地图三维地形生命周期管理器。
 */
class TdtTerrain {
  constructor(viewer, config = {}) {
    if (!viewer) throw new Error('Viewer is required.')

    this.viewer = viewer
    this.config = {}
    this.provider = null
    this.destroyed = false
    this._visible = false
    this._previousProvider = viewer.terrainProvider
    this._previousDepthTest = viewer.scene.globe.depthTestAgainstTerrain
    this.load(config)
  }

  load(config = {}) {
    this.ensureUsable()
    this.hide()
    this.config = {
      depthTestAgainstTerrain: true,
      ...config,
    }
    this.provider = this.config.provider || new TdtTerrainProvider(this.config)
    this.show()
    return this.provider
  }

  switch(config = {}) {
    return this.load({ ...this.config, ...config })
  }

  getProvider() {
    return this.provider
  }

  show() {
    this.ensureUsable()
    if (!this.provider) return
    this.viewer.terrainProvider = this.provider
    this.viewer.scene.globe.depthTestAgainstTerrain = Boolean(
      this.config.depthTestAgainstTerrain,
    )
    this._visible = true
    this.viewer.scene.requestRender()
  }

  hide() {
    if (!this.viewer || this.viewer.isDestroyed?.()) return
    if (this.provider && this.viewer.terrainProvider === this.provider) {
      this.viewer.terrainProvider = this._previousProvider
    }
    this.viewer.scene.globe.depthTestAgainstTerrain = this._previousDepthTest
    this._visible = false
    this.viewer.scene.requestRender()
  }

  remove() {
    this.hide()
    this.provider = null
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

  ensureUsable() {
    if (this.destroyed) throw new Error('TdtTerrain has been destroyed.')
    if (!this.viewer || this.viewer.isDestroyed?.()) {
      throw new Error('Viewer is unavailable.')
    }
  }
}

export default TdtTerrain
