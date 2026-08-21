import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'

const DEFAULT_OPACITY_STOPS = {
    0: 1,
    0.2: 0.82,
    0.45: 0.56,
    0.7: 0.28,
    0.88: 0.1,
    1: 0
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * 使用 WallGraphics 渲染垂直渐变立体墙。
 *
 * 支持 LineString、MultiLineString、Polygon 与 MultiPolygon。
 * geometry.coordinates 中的第三位表示该顶点的绝对顶高；
 * 未传高度时使用 properties.height 或全局 config.height。
 */
export default class GradientWallLayer {
    constructor(viewer, config = {}) {
        if (!viewer) throw new Error('Viewer is required.')

        this.viewer = viewer
        this.config = {
            color: '#35eaff',
            height: 900,
            baseHeight: 0,
            opacity: 1,
            gradient: null,
            opacityStops: DEFAULT_OPACITY_STOPS,
            closed: false,
            outline: false,
            outlineColor: '#bffcff',
            idPrefix: 'bmap-viewer-gradient-wall',
            ...config
        }
        this.data = []
        this.entities = []
        this._visible = true
    }

    setData(features) {
        if (!Array.isArray(features)) {
            console.error('GradientWallLayer data must be an array.')
            return this
        }

        this.clearLayer()
        this.data = features
        features.forEach(feature => this.addLayer(feature))
        return this
    }

    setOptions(options = {}) {
        this.config = {
            ...this.config,
            ...options,
            opacityStops: options.opacityStops || this.config.opacityStops
        }
        if (this.data.length) this.setData(this.data)
        return this
    }

    addLayer(feature) {
        const coordinateSets = this._resolveCoordinateSets(feature)
        if (!coordinateSets.length) return null

        const properties = feature?.properties || {}
        const featureId = properties.id ?? uuid()
        const material = this._createMaterial(properties)
        const created = []

        coordinateSets.forEach((coordinateSet, index) => {
            const coordinates = this._normalizeCoordinates(
                coordinateSet.coordinates,
                coordinateSet.closed || Boolean(properties.closed ?? this.config.closed)
            )
            if (coordinates.length < 2) return

            const baseHeight = this._numberOrDefault(properties.baseHeight, this.config.baseHeight, 0)
            const wallHeight = Math.max(
                0,
                this._numberOrDefault(properties.height, this.config.height, 900)
            )
            const positions = []
            const minimumHeights = []
            const maximumHeights = []

            coordinates.forEach(coordinate => {
                positions.push(coordinate[0], coordinate[1])
                const coordinateHeight = coordinate[2]
                minimumHeights.push(baseHeight)
                maximumHeights.push(
                    Number.isFinite(coordinateHeight)
                        ? Math.max(coordinateHeight, baseHeight)
                        : baseHeight + wallHeight
                )
            })

            const entityId = this._uniqueEntityId(
                coordinateSets.length === 1 ? String(featureId) : `${featureId}-${index + 1}`
            )
            const entity = this.viewer.entities.add({
                id: entityId,
                name: properties.name || `渐变立体墙 ${featureId}`,
                show: this._visible,
                properties: new Cesium.PropertyBag(properties),
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArray(positions),
                    minimumHeights,
                    maximumHeights,
                    material,
                    outline: Boolean(properties.outline ?? this.config.outline),
                    outlineColor: this._parseColor(
                        properties.outlineColor || this.config.outlineColor,
                        Cesium.Color.WHITE
                    )
                }
            })
            entity._bmapLayerId = featureId
            entity._bmapFeature = feature
            this.entities.push(entity)
            created.push(entity)
        })

        if (!created.length) return null
        return created.length === 1 ? created[0] : created
    }

    removeLayer(entity) {
        if (!entity || !this.viewer) return false
        const removed = this.viewer.entities.remove(entity)
        if (removed) this.entities = this.entities.filter(item => item !== entity)
        return removed
    }

    removeLayerById(id) {
        const entities = this.getLayersById(id)
        entities.forEach(entity => this.removeLayer(entity))
        return entities.length
    }

    getLayerById(id) {
        return this.getLayersById(id)[0] || null
    }

    getLayersById(id) {
        return this.entities.filter(entity => (
            entity._bmapLayerId === id || String(entity.id) === String(id)
        ))
    }

    getLayerDataById(id) {
        return this.data.find(item => item?.properties?.id === id) || null
    }

    clearLayer() {
        if (this.viewer && !this.viewer.isDestroyed?.()) {
            this.entities.forEach(entity => this.viewer.entities.remove(entity))
        }
        this.entities = []
        return this
    }

    show() {
        this._visible = true
        this.entities.forEach(entity => { entity.show = true })
        return this
    }

    hide() {
        this._visible = false
        this.entities.forEach(entity => { entity.show = false })
        return this
    }

    destroy() {
        this.clearLayer()
        this.data = []
        this.viewer = null
    }

    _resolveCoordinateSets(feature) {
        const geometry = feature?.geometry
        const coordinates = geometry?.coordinates
        if (!Array.isArray(coordinates)) return []

        switch (geometry?.type) {
            case 'LineString':
                return [{ coordinates, closed: false }]
            case 'MultiLineString':
                return coordinates.map(line => ({ coordinates: line, closed: false }))
            case 'Polygon':
                return coordinates.map(ring => ({ coordinates: ring, closed: true }))
            case 'MultiPolygon':
                return coordinates.flatMap(polygon => (
                    polygon.map(ring => ({ coordinates: ring, closed: true }))
                ))
            default:
                return []
        }
    }

    _normalizeCoordinates(coordinates, closed) {
        const result = (Array.isArray(coordinates) ? coordinates : [])
            .map(coordinate => {
                if (!Array.isArray(coordinate) || coordinate.length < 2) return null
                const longitude = Number(coordinate[0])
                const latitude = Number(coordinate[1])
                const height = Number(coordinate[2])
                if (
                    !Number.isFinite(longitude) ||
                    !Number.isFinite(latitude) ||
                    longitude < -180 || longitude > 180 ||
                    latitude < -90 || latitude > 90
                ) return null
                return [
                    longitude,
                    latitude,
                    Number.isFinite(height) ? height : null
                ]
            })
            .filter(Boolean)

        if (closed && result.length > 2) {
            const first = result[0]
            const last = result[result.length - 1]
            if (first[0] !== last[0] || first[1] !== last[1]) result.push([...first])
        }
        return result
    }

    _createMaterial(properties) {
        return new Cesium.ImageMaterialProperty({
            transparent: true,
            image: this._createGradientCanvas(properties)
        })
    }

    _createGradientCanvas(properties) {
        const canvas = document.createElement('canvas')
        canvas.width = 2
        canvas.height = 256
        const context = canvas.getContext('2d')
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
        const opacity = clamp(
            this._numberOrDefault(properties.opacity, this.config.opacity, 1),
            0,
            1
        )
        const customGradient = properties.gradient || this.config.gradient
        const stops = []

        if (customGradient && typeof customGradient === 'object') {
            Object.entries(customGradient).forEach(([position, color]) => {
                const ratio = Number(position)
                if (!Number.isFinite(ratio)) return
                const parsed = this._parseColor(color, Cesium.Color.TRANSPARENT)
                parsed.alpha *= opacity
                stops.push({ position: 1 - clamp(ratio, 0, 1), color: parsed.toCssColorString() })
            })
        } else {
            const baseColor = this._parseColor(
                properties.color || this.config.color,
                Cesium.Color.CYAN
            )
            const opacityStops = properties.opacityStops || this.config.opacityStops
            Object.entries(opacityStops).forEach(([position, stopOpacity]) => {
                const ratio = Number(position)
                const alpha = Number(stopOpacity)
                if (!Number.isFinite(ratio) || !Number.isFinite(alpha)) return
                stops.push({
                    position: 1 - clamp(ratio, 0, 1),
                    color: baseColor
                        .withAlpha(baseColor.alpha * opacity * clamp(alpha, 0, 1))
                        .toCssColorString()
                })
            })
        }

        stops
            .sort((left, right) => left.position - right.position)
            .forEach(stop => gradient.addColorStop(stop.position, stop.color))

        if (!stops.length) {
            gradient.addColorStop(0, 'rgba(53, 234, 255, 0)')
            gradient.addColorStop(1, 'rgba(53, 234, 255, 1)')
        }
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
        return canvas
    }

    _parseColor(value, fallback) {
        if (value instanceof Cesium.Color) return Cesium.Color.clone(value)
        if (typeof value === 'string') {
            const parsed = Cesium.Color.fromCssColorString(value)
            if (parsed) return parsed
        }
        return Cesium.Color.clone(fallback)
    }

    _numberOrDefault(value, fallback, finalFallback) {
        const parsed = Number(value)
        if (Number.isFinite(parsed)) return parsed
        const parsedFallback = Number(fallback)
        return Number.isFinite(parsedFallback) ? parsedFallback : finalFallback
    }

    _uniqueEntityId(requestedId) {
        let candidate = `${this.config.idPrefix}:${requestedId}`
        while (this.viewer.entities.getById(candidate)) candidate = `${candidate}-${uuid()}`
        return candidate
    }
}
