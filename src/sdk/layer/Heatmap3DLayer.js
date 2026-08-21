import * as Cesium from 'cesium'
import h337 from '../utils/heatmap.js'

const DEFAULT_GRADIENT = {
    0.3: '#0000ff',
    0.5: '#00c853',
    0.7: '#fff200',
    0.95: '#ff2600'
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * 将二维热力纹理抬升为 Cesium 三角网格。
 *
 * 数据遵循 SDK 的 GeoJSON Feature 数组规范：
 * geometry.coordinates = [longitude, latitude, height?]
 * properties.value = 热力值
 */
export default class Heatmap3DLayer {
    constructor(viewer, config = {}) {
        if (!viewer) throw new Error('Viewer is required.')

        this.viewer = viewer
        this.config = {
            radius: 28,
            blur: 0.75,
            gradient: DEFAULT_GRADIENT,
            maxOpacity: 0.72,
            minOpacity: 0,
            canvasSize: 256,
            gridSize: 160,
            padding: 0.14,
            heightScale: 1,
            heightExponent: 0.85,
            peakBoost: 320,
            baseHeight: null,
            minValue: 0,
            maxValue: null,
            bounds: null,
            allowPicking: false,
            id: 'bmap-viewer-heatmap-3d',
            ...config
        }

        this.data = []
        this.points = []
        this.bounds = null
        this.primitive = null
        this.container = null
        this.heatmap = null
        this._visible = true
        this._generation = 0
        this._pendingSwap = null
    }

    setData(features) {
        if (!Array.isArray(features)) {
            console.error('Heatmap3DLayer data must be an array.')
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
        const next = {
            ...this._createHeatmap(points, bounds),
            bounds,
            points,
            primitive: null
        }
        next.primitive = this._createPrimitive(points, next)
        this._scheduleSwap(previous, next, generation)
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

    show() {
        this._visible = true
        if (this.primitive) this.primitive.show = true
        return this
    }

    hide() {
        this._visible = false
        if (this.primitive) this.primitive.show = false
        return this
    }

    clearLayer() {
        this._generation += 1
        this._cancelPendingSwap()
        this._disposeResources(this._currentResources())
        this.primitive = null
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

    _currentResources() {
        if (!this.primitive && !this.container) return null
        return {
            primitive: this.primitive,
            container: this.container,
            heatmap: this.heatmap,
            bounds: this.bounds,
            points: this.points
        }
    }

    _applyResources(resources) {
        this.primitive = resources?.primitive || null
        this.container = resources?.container || null
        this.heatmap = resources?.heatmap || null
        this.bounds = resources?.bounds || null
        this.points = resources?.points || []
    }

    _disposeResources(resources) {
        if (!resources) return
        const primitive = resources.primitive
        if (primitive && this._viewerAvailable() && !primitive.isDestroyed?.()) {
            this.viewer.scene.primitives.remove(primitive)
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
            if (!next.primitive.ready) return

            if (!warmedUp) {
                // 首个可用帧保持透明，只完成着色器编译和 Canvas 纹理上传。
                next.primitive.show = true
                warmedUp = true
                scene.requestRender()
                return
            }

            next.primitive.appearance.material.uniforms.color.alpha = 1
            next.primitive.show = this._visible
            this._applyResources(next)
            this._disposeResources(previous)
            this._pendingSwap = null
            removeListener()
            scene.requestRender()
        })

        this._pendingSwap = { next, removeListener }
        scene.requestRender()
    }

    _viewerAvailable() {
        return Boolean(this.viewer && !this.viewer.isDestroyed?.())
    }

    _normalizeFeature(feature) {
        const geometry = feature?.geometry
        const coordinates = geometry?.coordinates
        if (geometry?.type && geometry.type !== 'Point') return null
        if (!Array.isArray(coordinates) || coordinates.length < 2) return null

        const longitude = Number(coordinates[0])
        const latitude = Number(coordinates[1])
        const altitude = Number(coordinates[2])
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
            altitude: Number.isFinite(altitude) ? altitude : null,
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
        const canvasSize = clamp(Math.round(Number(this.config.canvasSize) || 256), 64, 1024)
        const container = document.createElement('div')
        container.className = 'bmap-viewer-heatmap-3d-canvas'
        container.style.cssText = [
            `width:${canvasSize}px`,
            `height:${canvasSize}px`,
            'position:absolute',
            'left:-100000px',
            'top:-100000px',
            'pointer-events:none',
            'visibility:hidden'
        ].join(';')
        this.viewer.container.appendChild(container)

        const [west, south, east, north] = bounds
        const heatmapData = points.map(point => ({
            x: Math.round(((point.longitude - west) / (east - west)) * (canvasSize - 1)),
            y: Math.round(((north - point.latitude) / (north - south)) * (canvasSize - 1)),
            value: point.value,
            radius: point.radius
        }))
        const values = points.map(point => point.value)
        const configuredMin = Number(this.config.minValue)
        const configuredMax = Number(this.config.maxValue)
        const min = this.config.minValue != null && Number.isFinite(configuredMin) ? configuredMin : 0
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
        return {
            container,
            heatmap,
            valueRange: Math.max(0, max - min),
            canvasSize
        }
    }

    _createPrimitive(points, resources) {
        const geometry = this._createGeometry(points, resources)
        const canvas = resources.heatmap?._renderer?.canvas
        const material = new Cesium.Material({
            fabric: {
                type: 'Image',
                uniforms: {
                    image: canvas || resources.heatmap.getDataURL(),
                    repeat: new Cesium.Cartesian2(1, 1),
                    color: new Cesium.Color(1, 1, 1, 0)
                }
            },
            translucent: true
        })

        return this.viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: this.config.id,
                geometry
            }),
            appearance: new Cesium.MaterialAppearance({
                material,
                translucent: true,
                closed: false,
                faceForward: true,
                flat: true,
                renderState: {
                    depthTest: { enabled: true },
                    depthMask: false,
                    blending: Cesium.BlendingState.ALPHA_BLEND,
                    cull: { enabled: false }
                }
            }),
            allowPicking: Boolean(this.config.allowPicking),
            show: false,
            asynchronous: false
        }))
    }

    _createGeometry(points, resources) {
        const segments = clamp(Math.round(Number(this.config.gridSize) || 128), 16, 255)
        const rowLength = segments + 1
        const vertexCount = rowLength * rowLength
        const positions = new Float64Array(vertexCount * 3)
        const textureCoordinates = new Float32Array(vertexCount * 2)
        const indices = new Uint16Array(segments * segments * 6)
        const [west, south, east, north] = resources.bounds
        const baseHeight = this._resolveBaseHeight(points)
        const heightScale = Math.max(0, Number(this.config.heightScale) || 0)
        const heatFields = this._readHeatFields(resources)
        const heightExponent = clamp(Number(this.config.heightExponent) || 1, 0.1, 4)
        const peakBoost = Math.max(0, Number(this.config.peakBoost) || 0)
        let positionOffset = 0
        let textureOffset = 0

        for (let y = 0; y <= segments; y += 1) {
            const v = y / segments
            const latitude = north - (north - south) * v

            for (let x = 0; x <= segments; x += 1) {
                const u = x / segments
                const longitude = west + (east - west) * u
                const rawIntensity = this._sampleAlpha(heatFields?.alpha, u, v, resources)
                const intensity = Math.pow(rawIntensity, heightExponent)
                const hotColor = this._sampleChannel(
                    heatFields?.color,
                    u,
                    v,
                    0,
                    resources.canvasSize
                )
                const height = baseHeight
                    + intensity * resources.valueRange * heightScale
                    + hotColor * peakBoost
                const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)

                positions[positionOffset] = position.x
                positions[positionOffset + 1] = position.y
                positions[positionOffset + 2] = position.z
                positionOffset += 3

                textureCoordinates[textureOffset] = u
                textureCoordinates[textureOffset + 1] = 1 - v
                textureOffset += 2
            }
        }

        let indexOffset = 0
        for (let y = 0; y < segments; y += 1) {
            for (let x = 0; x < segments; x += 1) {
                const topLeft = y * rowLength + x
                const topRight = topLeft + 1
                const bottomLeft = topLeft + rowLength
                const bottomRight = bottomLeft + 1

                indices[indexOffset] = topLeft
                indices[indexOffset + 1] = bottomLeft
                indices[indexOffset + 2] = topRight
                indices[indexOffset + 3] = topRight
                indices[indexOffset + 4] = bottomLeft
                indices[indexOffset + 5] = bottomRight
                indexOffset += 6
            }
        }

        const geometry = new Cesium.Geometry({
            attributes: new Cesium.GeometryAttributes({
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: positions
                }),
                st: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 2,
                    values: textureCoordinates
                })
            }),
            indices,
            primitiveType: Cesium.PrimitiveType.TRIANGLES,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        })

        return Cesium.GeometryPipeline.computeNormal(geometry)
    }

    _resolveBaseHeight(points) {
        const configuredHeight = Number(this.config.baseHeight)
        if (this.config.baseHeight != null && Number.isFinite(configuredHeight)) {
            return configuredHeight
        }
        const altitudes = points
            .map(point => point.altitude)
            .filter(Number.isFinite)
        return altitudes.length ? Math.min(...altitudes) : 0
    }

    _readHeatFields(resources) {
        const renderer = resources.heatmap?._renderer
        if (!renderer?.shadowCtx || !renderer?.ctx) return null
        try {
            return {
                alpha: renderer.shadowCtx.getImageData(
                    0,
                    0,
                    resources.canvasSize,
                    resources.canvasSize
                ).data,
                color: renderer.ctx.getImageData(
                    0,
                    0,
                    resources.canvasSize,
                    resources.canvasSize
                ).data
            }
        } catch {
            return null
        }
    }

    _sampleAlpha(alphaField, u, v, resources) {
        if (!alphaField) {
            const value = resources.heatmap?.getValueAt({
                x: Math.round(u * (resources.canvasSize - 1)),
                y: Math.round(v * (resources.canvasSize - 1))
            })
            return resources.valueRange
                ? clamp(Number(value) / resources.valueRange, 0, 1)
                : 0
        }

        const x = u * (resources.canvasSize - 1)
        const y = v * (resources.canvasSize - 1)
        const x0 = Math.floor(x)
        const y0 = Math.floor(y)
        const x1 = Math.min(x0 + 1, resources.canvasSize - 1)
        const y1 = Math.min(y0 + 1, resources.canvasSize - 1)
        const tx = x - x0
        const ty = y - y0
        const alpha = (sampleX, sampleY) => alphaField[
            (sampleY * resources.canvasSize + sampleX) * 4 + 3
        ] / 255
        const top = alpha(x0, y0) * (1 - tx) + alpha(x1, y0) * tx
        const bottom = alpha(x0, y1) * (1 - tx) + alpha(x1, y1) * tx
        return top * (1 - ty) + bottom * ty
    }

    _sampleChannel(field, u, v, channel, canvasSize) {
        if (!field) return 0
        const x = u * (canvasSize - 1)
        const y = v * (canvasSize - 1)
        const x0 = Math.floor(x)
        const y0 = Math.floor(y)
        const x1 = Math.min(x0 + 1, canvasSize - 1)
        const y1 = Math.min(y0 + 1, canvasSize - 1)
        const tx = x - x0
        const ty = y - y0
        const sample = (sampleX, sampleY) => field[
            (sampleY * canvasSize + sampleX) * 4 + channel
        ] / 255
        const top = sample(x0, y0) * (1 - tx) + sample(x1, y0) * tx
        const bottom = sample(x0, y1) * (1 - tx) + sample(x1, y1) * tx
        return top * (1 - ty) + bottom * ty
    }
}
