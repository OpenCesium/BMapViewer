import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'
import {
    DYNAMIC_WATER_FRAGMENT_SHADER,
    DYNAMIC_WATER_VERTEX_SHADER
} from './material/dynamicWater.js'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const DEFAULT_CONFIG = {
    autoStart: true,
    animate: true,
    timeScale: 1,
    waveScale: 12,
    waveHeight: 0.82,
    geometryWaveHeight: 260,
    choppy: 4.2,
    speed: 0.72,
    foam: 0.58,
    normalStrength: 1.9,
    fresnel: 0.78,
    specular: 2.35,
    alpha: 0.92,
    height: 120,
    width: 7200,
    depth: 4200,
    deepColor: '#084260',
    shallowColor: '#36c0c6',
    foamColor: '#e7faff',
    meshSegments: 128,
    allowPicking: false,
    idPrefix: 'bmap-viewer-dynamic-water'
}

/**
 * 基于细分网格、顶点位移和自定义着色器的动态体积水图层。
 *
 * Polygon / MultiPolygon 定义任意水域；
 * Point 配合 properties.width / depth 定义矩形水面。
 */
export default class DynamicWaterLayer {
    constructor(viewer, config = {}) {
        if (!viewer) throw new Error('Viewer is required.')

        this.viewer = viewer
        this.config = { ...DEFAULT_CONFIG, ...config }
        this.data = []
        this.resources = []
        this._visible = true
        this._running = false
        this._lastFrameTime = null
        this._preRenderListener = this._update.bind(this)
    }

    setData(features) {
        if (!Array.isArray(features)) {
            console.error('DynamicWaterLayer data must be an array.')
            return this
        }

        this._removeAllResources()
        this.data = features
        features.forEach(feature => this.addLayer(feature, false))

        if (this.config.autoStart) this.start()
        else this.viewer.scene.requestRender()
        return this
    }

    setOptions(options = {}) {
        const wasRunning = this._running
        this.config = { ...this.config, ...options }
        if (this.data.length) {
            const currentData = this.data
            this._removeAllResources()
            currentData.forEach(feature => this.addLayer(feature, false))
        }
        if (wasRunning) this.start()
        else this.viewer?.scene?.requestRender()
        return this
    }

    addLayer(feature, ensureAnimation = true) {
        if (!this._viewerAvailable()) return null
        const areas = this._resolveFeatureAreas(feature)
        if (!areas.length) return null

        const properties = feature?.properties || {}
        const businessId = properties.id ?? uuid()
        const params = this._createParams(properties)
        const created = areas.map((area, index) => (
            this._createResource(feature, businessId, params, area, index)
        )).filter(Boolean)
        this.resources.push(...created)

        if (ensureAnimation && this.config.autoStart) this.start()
        this.viewer.scene.requestRender()
        if (!created.length) return null
        return created.length === 1 ? created[0].primitive : created.map(item => item.primitive)
    }

    removeLayer(primitive) {
        const resource = this.resources.find(item => item.primitive === primitive)
        if (!resource) return false
        this._removeResource(resource)
        if (!this.resources.length) this.stop()
        this.viewer?.scene?.requestRender()
        return true
    }

    removeLayerById(id) {
        const matches = this.resources.filter(resource => resource.businessId === id)
        matches.forEach(resource => this._removeResource(resource))
        if (!this.resources.length) this.stop()
        this.viewer?.scene?.requestRender()
        return matches.length
    }

    getLayerById(id) {
        return this.getLayersById(id)[0] || null
    }

    getLayersById(id) {
        return this.resources
            .filter(resource => resource.businessId === id)
            .map(resource => resource.primitive)
    }

    getLayerDataById(id) {
        return this.data.find(item => item?.properties?.id === id) || null
    }

    start() {
        if (!this._viewerAvailable() || !this.resources.length) return this
        this._running = true
        this._lastFrameTime = null
        this.viewer.scene.preRender.removeEventListener(this._preRenderListener)
        if (this.resources.some(resource => resource.params.animate)) {
            this.viewer.scene.preRender.addEventListener(this._preRenderListener)
        }
        this.viewer.scene.requestRender()
        return this
    }

    stop() {
        if (this.viewer) {
            this.viewer.scene?.preRender?.removeEventListener(this._preRenderListener)
        }
        this._running = false
        this._lastFrameTime = null
        return this
    }

    resetTime() {
        this.resources.forEach(resource => {
            resource.uniforms.u_time = 0
            resource.uniforms.u_vertexTime = 0
        })
        this._lastFrameTime = null
        this.viewer?.scene?.requestRender()
        return this
    }

    show() {
        this._visible = true
        this.resources.forEach(resource => { resource.primitive.show = true })
        this.viewer?.scene?.requestRender()
        return this
    }

    hide() {
        this._visible = false
        this.resources.forEach(resource => { resource.primitive.show = false })
        this.viewer?.scene?.requestRender()
        return this
    }

    clearLayer() {
        this.stop()
        this._removeAllResources()
        return this
    }

    flyTo(id = null, duration = 1.2) {
        const resource = id == null
            ? this.resources[0]
            : this.resources.find(item => item.businessId === id)
        if (!resource || !this._viewerAvailable()) return this

        const area = resource.area
        const center = Cesium.Matrix4.multiplyByPoint(
            area.modelMatrix,
            Cesium.Cartesian3.ZERO,
            new Cesium.Cartesian3()
        )
        const radius = Math.sqrt(area.width ** 2 + area.depth ** 2) * 0.5
            + resource.params.geometryWaveHeight
        this.viewer.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(center, radius),
            {
                duration,
                offset: new Cesium.HeadingPitchRange(
                    Cesium.Math.toRadians(28),
                    Cesium.Math.toRadians(-22),
                    Math.max(radius * 2.1, 2800)
                )
            }
        )
        return this
    }

    destroy() {
        this.clearLayer()
        this.data = []
        this.viewer = null
    }

    _update() {
        if (!this._running || !this._viewerAvailable()) return
        const now = performance.now()
        const deltaSeconds = this._lastFrameTime == null
            ? 0
            : Math.min((now - this._lastFrameTime) * 0.001, 0.1)
        this._lastFrameTime = now
        let shouldRender = false

        this.resources.forEach(resource => {
            if (!resource.params.animate || !resource.primitive.show) return
            const timeDelta = deltaSeconds * resource.params.timeScale
            resource.uniforms.u_time += timeDelta
            resource.uniforms.u_vertexTime = resource.uniforms.u_time
            shouldRender = true
        })
        if (shouldRender) this.viewer.scene.requestRender()
    }

    _resolveFeatureAreas(feature) {
        const geometry = feature?.geometry
        const coordinates = geometry?.coordinates
        const properties = feature?.properties || {}
        if (!geometry || !Array.isArray(coordinates)) return []

        if (geometry.type === 'Point') {
            const longitude = Number(coordinates[0])
            const latitude = Number(coordinates[1])
            if (!this._validLongitudeLatitude(longitude, latitude)) return []
            const coordinateHeight = Number(coordinates[2])
            const height = Number.isFinite(coordinateHeight)
                ? coordinateHeight
                : this._numberOrDefault(
                    properties.height ?? properties.planeHeight,
                    this.config.height,
                    120
                )
            const width = Math.max(1, this._numberOrDefault(
                properties.width ?? properties.planeWidth,
                this.config.width,
                7200
            ))
            const depth = Math.max(1, this._numberOrDefault(
                properties.depth ?? properties.planeDepth,
                this.config.depth,
                4200
            ))
            return [this._createRectangleArea(longitude, latitude, height, width, depth)]
        }

        const polygons = geometry.type === 'Polygon'
            ? [coordinates]
            : geometry.type === 'MultiPolygon'
                ? coordinates
                : []

        return polygons.map(polygon => {
            const outerRing = this._normalizePolygon(polygon?.[0])
            if (outerRing.length < 3) return null
            const coordinateHeight = outerRing.find(point => Number.isFinite(point.height))?.height
            const height = Number.isFinite(coordinateHeight)
                ? coordinateHeight
                : this._numberOrDefault(
                    properties.height ?? properties.planeHeight,
                    this.config.height,
                    120
                )
            return this._createPolygonArea(outerRing, height)
        }).filter(Boolean)
    }

    _normalizePolygon(coordinates) {
        if (!Array.isArray(coordinates)) return []
        const result = coordinates.map(coordinate => {
            if (!Array.isArray(coordinate) || coordinate.length < 2) return null
            const longitude = Number(coordinate[0])
            const latitude = Number(coordinate[1])
            const height = Number(coordinate[2])
            if (!this._validLongitudeLatitude(longitude, latitude)) return null
            return {
                longitude,
                latitude,
                height: Number.isFinite(height) ? height : null
            }
        }).filter(Boolean)

        const first = result[0]
        const last = result[result.length - 1]
        if (
            first && last &&
            Math.abs(first.longitude - last.longitude) < 1e-10 &&
            Math.abs(first.latitude - last.latitude) < 1e-10
        ) result.pop()
        return result
    }

    _createRectangleArea(longitude, latitude, height, width, depth) {
        const modelMatrix = this._createModelMatrix(longitude, latitude, height)
        return {
            mode: 'rectangle',
            centerLongitude: longitude,
            centerLatitude: latitude,
            height,
            width,
            depth,
            minX: -width * 0.5,
            maxX: width * 0.5,
            minY: -depth * 0.5,
            maxY: depth * 0.5,
            modelMatrix,
            containsPoint: () => true
        }
    }

    _createPolygonArea(coordinates, height) {
        const centerLongitude = coordinates.reduce(
            (total, point) => total + point.longitude,
            0
        ) / coordinates.length
        const centerLatitude = coordinates.reduce(
            (total, point) => total + point.latitude,
            0
        ) / coordinates.length
        const modelMatrix = this._createModelMatrix(centerLongitude, centerLatitude, height)
        const inverseFrame = Cesium.Matrix4.inverseTransformation(
            modelMatrix,
            new Cesium.Matrix4()
        )
        const polygon = coordinates.map(point => {
            const world = Cesium.Cartesian3.fromDegrees(
                point.longitude,
                point.latitude,
                height
            )
            const local = Cesium.Matrix4.multiplyByPoint(
                inverseFrame,
                world,
                new Cesium.Cartesian3()
            )
            return { x: local.x, y: local.y }
        })
        const bounds = this._getLocalBounds(polygon)

        return {
            mode: 'polygon',
            centerLongitude,
            centerLatitude,
            height,
            width: Math.max(bounds.maxX - bounds.minX, 1),
            depth: Math.max(bounds.maxY - bounds.minY, 1),
            minX: bounds.minX,
            maxX: bounds.maxX,
            minY: bounds.minY,
            maxY: bounds.maxY,
            modelMatrix,
            polygon,
            containsPoint: (x, y) => this._isPointInPolygon(x, y, polygon)
        }
    }

    _createModelMatrix(longitude, latitude, height) {
        return Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
        )
    }

    _createParams(properties) {
        const source = { ...this.config, ...properties }
        return {
            animate: source.animate !== false,
            timeScale: this._numberOrDefault(source.timeScale, 1, 1),
            waveScale: Math.max(0.1, this._numberOrDefault(source.waveScale, 12, 12)),
            waveHeight: Math.max(0, this._numberOrDefault(source.waveHeight, 0.82, 0.82)),
            geometryWaveHeight: Math.max(
                0,
                this._numberOrDefault(source.geometryWaveHeight, 260, 260)
            ),
            choppy: Math.max(0.1, this._numberOrDefault(source.choppy, 4.2, 4.2)),
            speed: this._numberOrDefault(source.speed, 0.72, 0.72),
            foam: clamp(this._numberOrDefault(source.foam, 0.58, 0.58), 0, 1),
            normalStrength: Math.max(
                0,
                this._numberOrDefault(source.normalStrength, 1.9, 1.9)
            ),
            fresnel: Math.max(0, this._numberOrDefault(source.fresnel, 0.78, 0.78)),
            specular: Math.max(0, this._numberOrDefault(source.specular, 2.35, 2.35)),
            alpha: clamp(this._numberOrDefault(source.alpha, 0.92, 0.92), 0, 1),
            meshSegments: clamp(
                Math.round(this._numberOrDefault(source.meshSegments, 128, 128)),
                8,
                260
            ),
            deepColor: source.deepColor,
            shallowColor: source.shallowColor,
            foamColor: source.foamColor,
            allowPicking: Boolean(source.allowPicking)
        }
    }

    _createResource(feature, businessId, params, area, index) {
        const geometry = this._createMeshGeometry(params, area)
        if (!geometry) return null
        const uniforms = this._createUniforms(params)
        const appearance = new Cesium.Appearance({
            vertexShaderSource: DYNAMIC_WATER_VERTEX_SHADER,
            fragmentShaderSource: DYNAMIC_WATER_FRAGMENT_SHADER,
            renderState: Cesium.Appearance.getDefaultRenderState(true, false, {
                depthTest: { enabled: true },
                depthMask: false,
                blending: Cesium.BlendingState.ALPHA_BLEND,
                cull: { enabled: false }
            }),
            translucent: true,
            closed: false
        })
        appearance.uniforms = uniforms
        const primitive = this.viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                id: `${this.config.idPrefix}:${businessId}-${index + 1}-${uuid()}`,
                geometry
            }),
            modelMatrix: area.modelMatrix,
            appearance,
            allowPicking: params.allowPicking,
            asynchronous: false,
            show: this._visible
        }))
        primitive._bmapLayerId = businessId
        primitive.properties = { ...feature?.properties }

        return { feature, businessId, params, area, primitive, uniforms }
    }

    _createUniforms(params) {
        return {
            u_time: 0,
            u_waveScale: params.waveScale,
            u_waveHeight: params.waveHeight,
            u_geometryWaveHeight: params.geometryWaveHeight,
            u_choppy: params.choppy,
            u_speed: params.speed,
            u_foam: params.foam,
            u_normalStrength: params.normalStrength,
            u_fresnelPower: params.fresnel,
            u_specularStrength: params.specular,
            u_alpha: params.alpha,
            u_deepColor: this._colorToCartesian4(params.deepColor, DEFAULT_CONFIG.deepColor),
            u_shallowColor: this._colorToCartesian4(
                params.shallowColor,
                DEFAULT_CONFIG.shallowColor
            ),
            u_foamColor: this._colorToCartesian4(params.foamColor, DEFAULT_CONFIG.foamColor),
            u_vertexTime: 0,
            u_vertexWaveScale: params.waveScale,
            u_vertexWaveHeight: params.waveHeight,
            u_vertexGeometryWaveHeight: params.geometryWaveHeight,
            u_vertexChoppy: params.choppy,
            u_vertexSpeed: params.speed,
            u_vertexNormalStrength: params.normalStrength
        }
    }

    _createMeshGeometry(params, area) {
        const longestSegments = params.meshSegments
        const aspect = area.width / area.depth
        const xSegments = aspect >= 1
            ? longestSegments
            : Math.max(8, Math.round(longestSegments * aspect))
        const ySegments = aspect >= 1
            ? Math.max(8, Math.round(longestSegments / aspect))
            : longestSegments
        const gridIndexByCell = new Map()
        const positionValues = []
        const stValues = []
        const normalValues = []
        const tangentValues = []
        const bitangentValues = []
        const batchIdValues = []
        const indices = []

        for (let y = 0; y <= ySegments; y += 1) {
            const v = y / ySegments
            for (let x = 0; x <= xSegments; x += 1) {
                const u = x / xSegments
                const positionX = area.minX + u * area.width
                const positionY = area.minY + v * area.depth
                if (
                    area.mode === 'polygon' &&
                    !this._shouldKeepPolygonVertex(
                        x,
                        y,
                        xSegments,
                        ySegments,
                        area,
                        positionX,
                        positionY
                    )
                ) continue

                const vertexIndex = positionValues.length / 3
                gridIndexByCell.set(`${x}:${y}`, vertexIndex)
                positionValues.push(positionX, positionY, 0)
                normalValues.push(0, 0, 1)
                tangentValues.push(1, 0, 0)
                bitangentValues.push(0, 1, 0)
                stValues.push(u, v)
                batchIdValues.push(0)
            }
        }

        for (let y = 0; y < ySegments; y += 1) {
            for (let x = 0; x < xSegments; x += 1) {
                const topLeft = gridIndexByCell.get(`${x}:${y}`)
                const topRight = gridIndexByCell.get(`${x + 1}:${y}`)
                const bottomLeft = gridIndexByCell.get(`${x}:${y + 1}`)
                const bottomRight = gridIndexByCell.get(`${x + 1}:${y + 1}`)
                if ([topLeft, topRight, bottomLeft, bottomRight].some(Number.isNaN)) continue
                if ([topLeft, topRight, bottomLeft, bottomRight].some(value => value == null)) continue
                indices.push(topLeft, bottomLeft, topRight, topRight, bottomLeft, bottomRight)
            }
        }
        if (!indices.length) return null

        const positions = new Float64Array(positionValues)
        const vertexCount = positionValues.length / 3
        const typedIndices = vertexCount > 65535
            ? new Uint32Array(indices)
            : new Uint16Array(indices)

        return new Cesium.Geometry({
            attributes: new Cesium.GeometryAttributes({
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: positions
                }),
                normal: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: new Float32Array(normalValues)
                }),
                tangent: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: new Float32Array(tangentValues)
                }),
                bitangent: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: new Float32Array(bitangentValues)
                }),
                st: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 2,
                    values: new Float32Array(stValues)
                }),
                batchId: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 1,
                    values: new Float32Array(batchIdValues)
                })
            }),
            indices: typedIndices,
            primitiveType: Cesium.PrimitiveType.TRIANGLES,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        })
    }

    _shouldKeepPolygonVertex(
        x,
        y,
        xSegments,
        ySegments,
        area,
        positionX,
        positionY
    ) {
        const halfCellX = (area.width / xSegments) * 0.5
        const halfCellY = (area.depth / ySegments) * 0.5
        return (
            area.containsPoint(positionX, positionY) ||
            area.containsPoint(positionX - halfCellX, positionY) ||
            area.containsPoint(positionX + halfCellX, positionY) ||
            area.containsPoint(positionX, positionY - halfCellY) ||
            area.containsPoint(positionX, positionY + halfCellY)
        )
    }

    _getLocalBounds(points) {
        return points.reduce((bounds, point) => ({
            minX: Math.min(bounds.minX, point.x),
            maxX: Math.max(bounds.maxX, point.x),
            minY: Math.min(bounds.minY, point.y),
            maxY: Math.max(bounds.maxY, point.y)
        }), {
            minX: Number.POSITIVE_INFINITY,
            maxX: Number.NEGATIVE_INFINITY,
            minY: Number.POSITIVE_INFINITY,
            maxY: Number.NEGATIVE_INFINITY
        })
    }

    _isPointInPolygon(x, y, polygon) {
        let inside = false
        for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
            const currentPoint = polygon[index]
            const previousPoint = polygon[previous]
            const crossesY = currentPoint.y > y !== previousPoint.y > y
            if (!crossesY) continue
            const crossingX = (
                (previousPoint.x - currentPoint.x) * (y - currentPoint.y)
            ) / (previousPoint.y - currentPoint.y) + currentPoint.x
            if (x < crossingX) inside = !inside
        }
        return inside
    }

    _colorToCartesian4(value, fallback) {
        if (value instanceof Cesium.Cartesian4) return Cesium.Cartesian4.clone(value)
        if (value instanceof Cesium.Color) {
            return new Cesium.Cartesian4(value.red, value.green, value.blue, value.alpha)
        }
        if (Array.isArray(value) && value.length >= 3) {
            const divisor = value.some(channel => Number(channel) > 1) ? 255 : 1
            return new Cesium.Cartesian4(
                clamp(Number(value[0]) / divisor, 0, 1),
                clamp(Number(value[1]) / divisor, 0, 1),
                clamp(Number(value[2]) / divisor, 0, 1),
                clamp(Number(value[3] ?? divisor) / divisor, 0, 1)
            )
        }
        const color = Cesium.Color.fromCssColorString(
            typeof value === 'string' ? value : fallback
        ) || Cesium.Color.fromCssColorString(fallback)
        return new Cesium.Cartesian4(color.red, color.green, color.blue, color.alpha)
    }

    _removeResource(resource) {
        if (!resource) return
        if (
            this._viewerAvailable() &&
            resource.primitive &&
            !resource.primitive.isDestroyed?.() &&
            this.viewer.scene.primitives.contains(resource.primitive)
        ) this.viewer.scene.primitives.remove(resource.primitive)
        this.resources = this.resources.filter(item => item !== resource)
    }

    _removeAllResources() {
        const current = [...this.resources]
        current.forEach(resource => this._removeResource(resource))
        this.resources = []
    }

    _validLongitudeLatitude(longitude, latitude) {
        return (
            Number.isFinite(longitude) &&
            Number.isFinite(latitude) &&
            longitude >= -180 && longitude <= 180 &&
            latitude >= -90 && latitude <= 90
        )
    }

    _numberOrDefault(value, fallback, finalFallback) {
        const parsed = Number(value)
        if (Number.isFinite(parsed)) return parsed
        const parsedFallback = Number(fallback)
        return Number.isFinite(parsedFallback) ? parsedFallback : finalFallback
    }

    _viewerAvailable() {
        return Boolean(this.viewer && !this.viewer.isDestroyed?.())
    }
}
