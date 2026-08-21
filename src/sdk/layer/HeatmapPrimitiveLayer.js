import * as Cesium from 'cesium'
import h337 from '../utils/heatmap.js'

const DEFAULT_GRADIENT = {
    0.25: 'rgb(0,0,255)',
    0.55: 'rgb(0,255,0)',
    0.85: 'rgb(255,255,0)',
    1: 'rgb(255,0,0)'
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * 将标准点数据绘制为贴合椭球表面的热力图。
 *
 * 数据遵循 SDK 的 GeoJSON Feature 数组规范：
 * geometry.coordinates = [longitude, latitude, height?]
 * properties.value = 热力值
 */
export default class HeatmapPrimitiveLayer {
    constructor(viewer, config = {}) {
        if (!viewer) throw new Error('Viewer is required.')

        this.viewer = viewer
        this.config = {
            renderType: 'primitive',
            radius: 54,
            blur: 0.82,
            gradient: DEFAULT_GRADIENT,
            maxOpacity: 0.88,
            minOpacity: 0,
            canvasSize: 1024,
            minCanvasSize: 320,
            padding: 0.12,
            height: 0,
            maxValue: null,
            minValue: 0,
            bounds: null,
            allowPicking: false,
            id: 'bmap-viewer-heatmap-primitive',
            ...config
        }

        this.data = []
        this.points = []
        this.container = null
        this.heatmap = null
        this.provider = null
        this.bounds = null
        this._visible = true
        this._generation = 0
        this._pendingSwap = null
    }

    setData(features) {
        if (!Array.isArray(features)) {
            console.error('HeatmapPrimitiveLayer data must be an array.')
            return this
        }

        const points = features
            .map(feature => this._normalizeFeature(feature))
            .filter(Boolean)

        this.data = features
        if (!points.length || !this._viewerAvailable()) {
            this.clearLayer()
            return this
        }

        this._cancelPendingSwap()
        const generation = ++this._generation
        const previous = this._currentResources()
        const bounds = this._resolveBounds(points)
        let next = null

        try {
            next = {
                ...this._createHeatmap(points, bounds),
                bounds,
                points,
                provider: null,
                providerType: this._resolveRenderType(),
                textureReady: true
            }
            this._createLayer(next)
            this._scheduleSwap(previous, next, generation)
        } catch (error) {
            this._disposeResources(next)
            throw error
        }

        return this
    }

    setOptions(options = {}) {
        this.config = {
            ...this.config,
            ...options,
            gradient: options.gradient || this.config.gradient
        }
        if (this.data.length) this.setData(this.data)
        return this
    }

    updateHeatMapMaxMin({ min, max } = {}) {
        return this.setOptions({
            ...(Number.isFinite(min) ? { minValue: min } : {}),
            ...(Number.isFinite(max) ? { maxValue: max } : {})
        })
    }

    updateHeatmap(options = {}) {
        return this.setOptions(options)
    }

    updateRadius(radius) {
        const nextRadius = Number(radius)
        if (!Number.isFinite(nextRadius) || nextRadius <= 0) return this
        this.data = this.data.map(feature => ({
            ...feature,
            properties: {
                ...feature?.properties,
                radius: nextRadius
            }
        }))
        return this.setOptions({ radius: nextRadius })
    }

    show() {
        this._visible = true
        if (this.provider) this.provider.show = true
        return this
    }

    hide() {
        this._visible = false
        if (this.provider) this.provider.show = false
        return this
    }

    clearLayer() {
        this._generation += 1
        this._cancelPendingSwap()
        this._disposeResources(this._currentResources())
        this.provider = null
        this.container = null
        this.heatmap = null
        this.bounds = null
        this.points = []
        return this
    }

    destroy() {
        this.clearLayer()
        this.data = []
        this.viewer = null
    }

    _normalizeFeature(feature) {
        const geometry = feature?.geometry
        const coordinates = geometry?.coordinates
        if (geometry?.type && geometry.type !== 'Point') return null
        if (!Array.isArray(coordinates) || coordinates.length < 2) return null

        const longitude = Number(coordinates[0])
        const latitude = Number(coordinates[1])
        const value = Number(feature?.properties?.value ?? 1)
        const radius = Number(feature?.properties?.radius ?? this.config.radius)

        if (
            !Number.isFinite(longitude) ||
            !Number.isFinite(latitude) ||
            !Number.isFinite(value) ||
            longitude < -180 || longitude > 180 ||
            latitude < -90 || latitude > 90
        ) return null

        return {
            longitude,
            latitude,
            value,
            radius: Number.isFinite(radius) && radius > 0 ? radius : this.config.radius,
            feature
        }
    }

    _resolveBounds(points) {
        const configuredBounds = this.config.bounds
        if (
            Array.isArray(configuredBounds) &&
            configuredBounds.length === 4 &&
            configuredBounds.every(Number.isFinite) &&
            configuredBounds[0] < configuredBounds[2] &&
            configuredBounds[1] < configuredBounds[3]
        ) return [...configuredBounds]

        const longitudes = points.map(point => point.longitude)
        const latitudes = points.map(point => point.latitude)
        let west = Math.min(...longitudes)
        let east = Math.max(...longitudes)
        let south = Math.min(...latitudes)
        let north = Math.max(...latitudes)
        const longitudeSpan = east - west || 0.01
        const latitudeSpan = north - south || 0.01
        const padding = clamp(Number(this.config.padding) || 0, 0, 1)

        if (west === east) {
            west -= longitudeSpan / 2
            east += longitudeSpan / 2
        }
        if (south === north) {
            south -= latitudeSpan / 2
            north += latitudeSpan / 2
        }

        return [
            clamp(west - longitudeSpan * padding, -180, 180),
            clamp(south - latitudeSpan * padding, -90, 90),
            clamp(east + longitudeSpan * padding, -180, 180),
            clamp(north + latitudeSpan * padding, -90, 90)
        ]
    }

    _createHeatmap(points, bounds) {
        const { width, height } = this._resolveCanvasDimensions(bounds)
        const container = document.createElement('div')
        container.className = 'bmap-viewer-heatmap-primitive-canvas'
        container.style.cssText = [
            `width:${width}px`,
            `height:${height}px`,
            'position:absolute',
            'left:-100000px',
            'top:-100000px',
            'pointer-events:none',
            'visibility:hidden'
        ].join(';')
        this.viewer.container.appendChild(container)

        const [west, south, east, north] = bounds
        const heatmapData = points.map(point => ({
            x: Math.round(((point.longitude - west) / (east - west)) * (width - 1)),
            y: Math.round(((north - point.latitude) / (north - south)) * (height - 1)),
            value: point.value,
            radius: point.radius
        }))
        const values = points.map(point => point.value)
        const configuredMin = Number(this.config.minValue)
        const configuredMax = Number(this.config.maxValue)
        const min = this.config.minValue != null && Number.isFinite(configuredMin)
            ? configuredMin
            : Math.min(...values)
        const dataMax = Math.max(...values)
        const max = this.config.maxValue != null && Number.isFinite(configuredMax)
            ? Math.max(configuredMax, min + 1)
            : Math.max(dataMax, min + 1)
        const heatmap = h337.create({
            container,
            radius: this.config.radius,
            blur: this.config.blur,
            gradient: this.config.gradient,
            maxOpacity: this.config.maxOpacity,
            minOpacity: this.config.minOpacity
        })
        heatmap.setData({ min, max, data: heatmapData })

        return { container, heatmap, width, height }
    }

    _resolveCanvasDimensions(bounds) {
        const maximum = clamp(Math.round(Number(this.config.canvasSize) || 1024), 256, 2048)
        const minimum = clamp(
            Math.round(Number(this.config.minCanvasSize) || 320),
            128,
            maximum
        )
        const longitudeSpan = Math.max(bounds[2] - bounds[0], 1e-6)
        const latitudeSpan = Math.max(bounds[3] - bounds[1], 1e-6)
        const centerLatitude = Cesium.Math.toRadians((bounds[1] + bounds[3]) / 2)
        const aspect = Math.max(
            (longitudeSpan * Math.max(Math.cos(centerLatitude), 0.01)) / latitudeSpan,
            1e-3
        )

        if (aspect >= 1) {
            return {
                width: maximum,
                height: Math.max(minimum, Math.round(maximum / aspect))
            }
        }
        return {
            width: Math.max(minimum, Math.round(maximum * aspect)),
            height: maximum
        }
    }

    _resolveRenderType() {
        return ['primitive', 'imagery', 'entity'].includes(this.config.renderType)
            ? this.config.renderType
            : 'primitive'
    }

    _createLayer(resources) {
        const rectangle = Cesium.Rectangle.fromDegrees(...resources.bounds)
        const canvas = resources.heatmap?._renderer?.canvas
        if (!canvas) throw new Error('HeatmapPrimitiveLayer failed to create the Canvas texture.')

        if (resources.providerType === 'imagery') {
            const imageryProvider = new Cesium.SingleTileImageryProvider({
                url: resources.heatmap.getDataURL(),
                rectangle,
                tileWidth: resources.width,
                tileHeight: resources.height
            })
            const provider = this.viewer.imageryLayers.addImageryProvider(imageryProvider)
            provider.alpha = 0
            provider.show = false
            resources.provider = provider
            resources.textureReady = false
            resources.texturePromise = imageryProvider.requestImage(0, 0, 0)
                .then(() => {
                    resources.textureReady = true
                    this.viewer?.scene?.requestRender()
                })
                .catch(error => {
                    resources.textureReady = true
                    console.error('HeatmapPrimitiveLayer imagery texture failed to load:', error)
                    this.viewer?.scene?.requestRender()
                })
            return
        }

        if (resources.providerType === 'entity') {
            resources.material = new Cesium.ImageMaterialProperty({
                image: canvas,
                transparent: true,
                color: Cesium.Color.WHITE.withAlpha(0)
            })
            resources.provider = this.viewer.entities.add({
                // 双缓冲期间新旧 Entity 会短暂共存，因此内部 ID 需要唯一。
                id: `${this.config.id}-${this._generation}`,
                show: false,
                rectangle: {
                    coordinates: rectangle,
                    height: Number(this.config.height) || 0,
                    material: resources.material
                }
            })
            return
        }

        resources.material = new Cesium.Material({
            fabric: {
                type: 'Image',
                uniforms: {
                    image: canvas,
                    repeat: new Cesium.Cartesian2(1, 1),
                    color: Cesium.Color.WHITE.withAlpha(0)
                }
            },
            translucent: true
        })
        resources.provider = this.viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: this.config.id,
                geometry: new Cesium.RectangleGeometry({
                    rectangle,
                    height: Number(this.config.height) || 0,
                    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
                })
            }),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                aboveGround: Number(this.config.height) > 0,
                material: resources.material,
                translucent: true,
                renderState: {
                    depthTest: { enabled: true },
                    depthMask: false,
                    blending: Cesium.BlendingState.ALPHA_BLEND
                }
            }),
            allowPicking: Boolean(this.config.allowPicking),
            asynchronous: false,
            show: false
        }))
    }

    _currentResources() {
        if (!this.provider && !this.container) return null
        return {
            provider: this.provider,
            providerType: this._providerType(this.provider),
            container: this.container,
            heatmap: this.heatmap,
            bounds: this.bounds,
            points: this.points
        }
    }

    _providerType(provider) {
        if (provider instanceof Cesium.Primitive) return 'primitive'
        if (provider instanceof Cesium.ImageryLayer) return 'imagery'
        if (provider instanceof Cesium.Entity) return 'entity'
        return this._resolveRenderType()
    }

    _applyResources(resources) {
        this.provider = resources?.provider || null
        this.container = resources?.container || null
        this.heatmap = resources?.heatmap || null
        this.bounds = resources?.bounds || null
        this.points = resources?.points || []
    }

    _disposeResources(resources) {
        if (!resources) return
        const provider = resources.provider
        if (provider && this._viewerAvailable()) {
            if (
                resources.providerType === 'primitive' &&
                !provider.isDestroyed?.() &&
                this.viewer.scene.primitives.contains(provider)
            ) this.viewer.scene.primitives.remove(provider)
            else if (
                resources.providerType === 'imagery' &&
                this.viewer.imageryLayers.contains(provider)
            ) this.viewer.imageryLayers.remove(provider, true)
            else if (
                resources.providerType === 'entity' &&
                this.viewer.entities.contains(provider)
            ) this.viewer.entities.remove(provider)
        }
        resources.container?.remove()
    }

    _cancelPendingSwap() {
        const pending = this._pendingSwap
        if (!pending) return
        pending.removeListener?.()
        this._disposeResources(pending.next)
        this._pendingSwap = null
    }

    _scheduleSwap(previous, next, generation) {
        let warmedUp = false
        const scene = this.viewer.scene
        const removeListener = scene.postRender.addEventListener(() => {
            if (generation !== this._generation || !this._viewerAvailable()) {
                removeListener()
                return
            }
            if (!this._resourceReady(next)) return

            if (!warmedUp) {
                this._setResourceShow(next, true)
                warmedUp = true
                scene.requestRender()
                return
            }

            this._setResourceOpacity(next, 1)
            this._setResourceShow(next, this._visible)
            this._applyResources(next)
            this._disposeResources(previous)
            this._pendingSwap = null
            removeListener()
            scene.requestRender()
        })

        this._pendingSwap = { next, removeListener }
        scene.requestRender()
    }

    _resourceReady(resources) {
        if (resources.providerType === 'primitive') return Boolean(resources.provider?.ready)
        if (resources.providerType === 'imagery') return Boolean(resources.textureReady)
        return true
    }

    _setResourceShow(resources, show) {
        if (resources?.provider) resources.provider.show = show
    }

    _setResourceOpacity(resources, alpha) {
        if (!resources?.provider) return
        if (resources.providerType === 'primitive') {
            resources.material.uniforms.color.alpha = alpha
        } else if (resources.providerType === 'imagery') {
            resources.provider.alpha = alpha
        } else if (resources.material) {
            resources.material.color = Cesium.Color.WHITE.withAlpha(alpha)
        }
    }

    _viewerAvailable() {
        return Boolean(this.viewer && !this.viewer.isDestroyed?.())
    }
}
