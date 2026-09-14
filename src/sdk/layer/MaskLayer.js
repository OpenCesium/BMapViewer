import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'

const DEFAULT_OUTER_BOUNDS = Object.freeze([-179.999, -89.9, 179.999, 89.9])

function clamp(value, minimum, maximum, fallback = minimum) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue)
    ? Math.min(maximum, Math.max(minimum, numericValue))
    : fallback
}

function toColor(value, fallback, opacity = 1) {
  const color = Cesium.Color.fromCssColorString(value || fallback)
    || Cesium.Color.fromCssColorString(fallback)
    || Cesium.Color.WHITE
  return color.withAlpha(clamp(opacity, 0, 1, 1))
}

function isSameCoordinate(left, right) {
  return left?.[0] === right?.[0] && left?.[1] === right?.[1]
}

function normalizeRing(ring) {
  if (!Array.isArray(ring)) return []
  const normalized = ring
    .filter((coordinate) => (
      Array.isArray(coordinate)
      && Number.isFinite(Number(coordinate[0]))
      && Number.isFinite(Number(coordinate[1]))
    ))
    .map((coordinate) => [Number(coordinate[0]), Number(coordinate[1])])

  if (normalized.length > 3 && isSameCoordinate(normalized[0], normalized.at(-1))) {
    normalized.pop()
  }
  return normalized.length >= 3 ? normalized : []
}

function toPositions(ring, height = 0) {
  return normalizeRing(ring).map(([longitude, latitude]) => (
    Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
  ))
}

function toClosedPositions(ring, height = 0) {
  const normalized = normalizeRing(ring)
  if (!normalized.length) return []
  return [...normalized, normalized[0]].map(([longitude, latitude]) => (
    Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
  ))
}

function toPolygonHierarchy(rings, height = 0) {
  if (!Array.isArray(rings) || !rings.length) return null
  const positions = toPositions(rings[0], height)
  if (positions.length < 3) return null

  const holes = rings
    .slice(1)
    .map((ring) => toPositions(ring, height))
    .filter((holePositions) => holePositions.length >= 3)
    .map((holePositions) => new Cesium.PolygonHierarchy(holePositions))

  return new Cesium.PolygonHierarchy(positions, holes)
}

function getPolygonRings(item) {
  const geometry = item?.geometry
  if (!geometry?.coordinates) return []
  if (geometry.type === 'Polygon') return [geometry.coordinates]
  if (geometry.type === 'MultiPolygon') return geometry.coordinates
  return []
}

function createRectangleRing([west, south, east, north]) {
  return [
    [west, south],
    [east, south],
    [east, north],
    [west, north],
  ]
}

function getDataBounds(data) {
  const coordinates = data.flatMap((item) => (
    getPolygonRings(item).flatMap((rings) => (
      rings.flatMap((ring) => normalizeRing(ring))
    ))
  ))
  if (!coordinates.length) return null

  const longitudes = coordinates.map((coordinate) => coordinate[0])
  const latitudes = coordinates.map((coordinate) => coordinate[1])
  return [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ]
}

function createInnerBounds(dataBounds) {
  const [dataWest, dataSouth, dataEast, dataNorth] = dataBounds
  const longitudeSpan = dataEast - dataWest
  const latitudeSpan = dataNorth - dataSouth
  if (longitudeSpan >= 160 || latitudeSpan >= 160) {
    throw new Error('MaskLayer inverse polygons must span less than 160 degrees.')
  }

  // 中心孔洞面覆盖足够大的区域，把全球分片接缝放到业务视域之外。
  const longitudePadding = Math.max(40, longitudeSpan * 0.25)
  const latitudePadding = Math.max(30, latitudeSpan * 0.25)
  return [
    Math.max(DEFAULT_OUTER_BOUNDS[0], dataWest - longitudePadding),
    Math.max(DEFAULT_OUTER_BOUNDS[1], dataSouth - latitudePadding),
    Math.min(DEFAULT_OUTER_BOUNDS[2], dataEast + longitudePadding),
    Math.min(DEFAULT_OUTER_BOUNDS[3], dataNorth + latitudePadding),
  ]
}

function splitLongitudeRange(west, east, maximumSpan = 120) {
  const span = east - west
  if (span <= 0) return []
  const segmentCount = Math.max(1, Math.ceil(span / maximumSpan))
  return Array.from({ length: segmentCount }, (_, index) => [
    west + (span * index) / segmentCount,
    west + (span * (index + 1)) / segmentCount,
  ])
}

function splitLatitudeRange(south, north, maximumSpan = 60) {
  const span = north - south
  if (span <= 0) return []
  const segmentCount = Math.max(1, Math.ceil(span / maximumSpan))
  return Array.from({ length: segmentCount }, (_, index) => [
    south + (span * index) / segmentCount,
    south + (span * (index + 1)) / segmentCount,
  ])
}

function createWorldCoverRings(innerBounds) {
  const [worldWest, worldSouth, worldEast, worldNorth] = DEFAULT_OUTER_BOUNDS
  const [innerWest, innerSouth, innerEast, innerNorth] = innerBounds
  const sections = []

  // 东西两侧使用纵向全球分片，使靠近数据区的接缝与中心面的经线完全重合。
  splitLongitudeRange(worldWest, innerWest).forEach(([west, east]) => {
    splitLatitudeRange(worldSouth, worldNorth).forEach(([south, north]) => {
      sections.push({
        ring: createRectangleRing([west, south, east, north]),
        arcType: Cesium.ArcType.GEODESIC,
      })
    })
  })
  splitLongitudeRange(innerEast, worldEast).forEach(([west, east]) => {
    splitLatitudeRange(worldSouth, worldNorth).forEach(([south, north]) => {
      sections.push({
        ring: createRectangleRing([west, south, east, north]),
        arcType: Cesium.ArcType.GEODESIC,
      })
    })
  })

  // 中心经度带的南北面与中心面使用相同的测地线边界，消除透明拼接线。
  if (innerSouth > worldSouth) {
    sections.push({
      ring: createRectangleRing([innerWest, worldSouth, innerEast, innerSouth]),
      arcType: Cesium.ArcType.GEODESIC,
    })
  }
  if (innerNorth < worldNorth) {
    sections.push({
      ring: createRectangleRing([innerWest, innerNorth, innerEast, worldNorth]),
      arcType: Cesium.ArcType.GEODESIC,
    })
  }

  return sections
}

function resolveClassificationType(value) {
  if (typeof value === 'number') return value
  const name = String(value || 'both').toLowerCase()
  if (name === 'terrain') return Cesium.ClassificationType.TERRAIN
  if (name === '3dtiles' || name === '3d-tiles' || name === 'cesium-3d-tiles') {
    return Cesium.ClassificationType.CESIUM_3D_TILE
  }
  return Cesium.ClassificationType.BOTH
}

/**
 * 多边形遮罩图层。
 *
 * 默认将 Polygon/MultiPolygon 数据作为透视区域，并在其外侧绘制半透明遮罩。
 * 设置 inverse: false 后，可将数据区域本身作为普通遮罩填充。
 */
class MaskLayer {
  constructor(viewer, config = {}) {
    if (!viewer) throw new Error('Viewer is required.')

    this.viewer = viewer
    this.config = {
      id: 'mask-layer',
      color: '#04131f',
      opacity: 0.68,
      inverse: true,
      outline: true,
      outlineColor: '#4ff4e1',
      outlineOpacity: 0.95,
      outlineWidth: 2,
      clampToGround: false,
      height: 0,
      classificationType: 'both',
      show: true,
      ...config,
    }
    this.data = []
    this.layer = null
    this.outlineLayer = null
    this._fillIds = new Set()
  }

  setData(data) {
    if (!Array.isArray(data)) {
      console.error('data must be an array.')
      return this
    }

    this.data = data.filter((item) => getPolygonRings(item).length)
    this._render()
    return this
  }

  addLayer(item) {
    if (!getPolygonRings(item).length) {
      console.error('MaskLayer requires Polygon or MultiPolygon coordinates.')
      return null
    }
    this.data.push(item)
    this._render()
    return this.getLayerById(item.properties?.id || this.config.id)
  }

  setOptions(options = {}) {
    this.config = { ...this.config, ...options }
    this._render()
    return this
  }

  _render() {
    this._removePrimitives()
    if (!this.data.length) return

    const fillInstances = []
    const outlineInstances = []
    this._fillIds.clear()

    if (this.config.inverse !== false) {
      this._buildInverseInstances(fillInstances, outlineInstances)
    } else {
      this._buildPolygonInstances(fillInstances, outlineInstances)
    }

    const renderFillInstances = (
      this.config.inverse !== false
      && this.config.clampToGround === false
      && fillInstances.length > 1
    ) ? this._combineInverseFillInstances(fillInstances) : fillInstances

    if (renderFillInstances.length) this.layer = this._createFillPrimitive(renderFillInstances)
    if (outlineInstances.length) this.outlineLayer = this._createOutlinePrimitive(outlineInstances)
  }

  _buildInverseInstances(fillInstances, outlineInstances) {
    const firstItem = this.data[0]
    const properties = firstItem.properties || {}
    const height = properties.height ?? this.config.height
    const holes = this.data.flatMap((item) => (
      getPolygonRings(item)
        .map((rings) => toPolygonHierarchy(rings, height))
        .filter(Boolean)
    ))
    if (!holes.length) return

    const dataBounds = getDataBounds(this.data)
    if (!dataBounds) return
    const innerBounds = createInnerBounds(dataBounds)
    const hierarchy = new Cesium.PolygonHierarchy(
      toPositions(createRectangleRing(innerBounds), height),
      holes,
    )
    const id = properties.id || this.config.id || uuid()
    fillInstances.push(this._createFillInstance(id, hierarchy, properties))
    this._fillIds.add(id)

    createWorldCoverRings(innerBounds).forEach(({ ring, arcType }, index) => {
      const outsideId = `${id}:outside:${index}`
      fillInstances.push(this._createFillInstance(
        outsideId,
        new Cesium.PolygonHierarchy(toPositions(ring, height)),
        properties,
        arcType,
        Cesium.Math.toRadians(5),
      ))
    })
    this._appendOutlineInstances(outlineInstances, id, properties, this.data)
  }

  _buildPolygonInstances(fillInstances, outlineInstances) {
    this.data.forEach((item) => {
      const properties = item.properties || {}
      const height = properties.height ?? this.config.height
      const baseId = properties.id || uuid()

      getPolygonRings(item).forEach((rings, polygonIndex) => {
        const hierarchy = toPolygonHierarchy(rings, height)
        if (!hierarchy) return
        const id = polygonIndex === 0 ? baseId : `${baseId}:${polygonIndex}`
        fillInstances.push(this._createFillInstance(id, hierarchy, properties))
        this._fillIds.add(id)
      })
      this._appendOutlineInstances(outlineInstances, baseId, properties, [item])
    })
  }

  _createFillInstance(
    id,
    hierarchy,
    properties = {},
    arcType = Cesium.ArcType.GEODESIC,
    granularity = Cesium.Math.RADIANS_PER_DEGREE,
  ) {
    const clampToGround = this.config.clampToGround !== false
    const height = properties.height ?? this.config.height
    const geometryOptions = {
      polygonHierarchy: hierarchy,
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      arcType,
      granularity,
    }
    if (!clampToGround) geometryOptions.height = height

    return new Cesium.GeometryInstance({
      id,
      geometry: new Cesium.PolygonGeometry(geometryOptions),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(toColor(
          properties.color || this.config.color,
          this.config.color,
          properties.opacity ?? this.config.opacity,
        )),
      },
    })
  }

  _combineInverseFillInstances(instances) {
    const createdInstances = instances
      .map((instance) => Cesium.PolygonGeometry.createGeometry(instance.geometry))
      .filter(Boolean)
      .map((geometry) => new Cesium.GeometryInstance({ geometry }))
    if (!createdInstances.length) return []

    const combinedGeometries = Cesium.GeometryPipeline.combineInstances(createdInstances)
    const baseId = instances[0].id
    const color = instances[0].attributes.color
    return combinedGeometries.map((geometry, index) => {
      const id = index === 0 ? baseId : `${baseId}:batch:${index}`
      this._fillIds.add(id)
      return new Cesium.GeometryInstance({
        id,
        geometry,
        attributes: { color },
      })
    })
  }

  _appendOutlineInstances(instances, baseId, properties = {}, items = this.data) {
    if (!(properties.outline ?? this.config.outline)) return

    const clampToGround = this.config.clampToGround !== false
    const height = properties.height ?? this.config.height
    const color = toColor(
      properties.outlineColor || this.config.outlineColor,
      this.config.outlineColor,
      properties.outlineOpacity ?? this.config.outlineOpacity,
    )
    const width = Math.max(1, Number(properties.outlineWidth ?? this.config.outlineWidth) || 1)
    let outlineIndex = 0

    items.forEach((item) => {
      getPolygonRings(item).forEach((rings) => {
        const positions = toClosedPositions(rings[0], height)
        if (positions.length < 4) return
        const geometry = clampToGround
          ? new Cesium.GroundPolylineGeometry({ positions, width })
          : new Cesium.PolylineGeometry({ positions, width })
        instances.push(new Cesium.GeometryInstance({
          id: `${baseId}:outline:${outlineIndex}`,
          geometry,
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
          },
        }))
        outlineIndex += 1
      })
    })
  }

  _createFillPrimitive(instances) {
    const clampToGround = this.config.clampToGround !== false
    const commonOptions = {
      geometryInstances: instances,
      appearance: clampToGround
        ? new Cesium.PerInstanceColorAppearance({ translucent: true, closed: false })
        : new Cesium.PerInstanceColorAppearance({
          translucent: false,
          closed: true,
          faceForward: true,
          flat: true,
          renderState: {
            depthTest: { enabled: true },
            depthMask: true,
            blending: Cesium.BlendingState.ALPHA_BLEND,
          },
        }),
      show: this.config.show !== false,
    }

    const primitive = clampToGround
      ? new Cesium.GroundPrimitive({
        ...commonOptions,
        classificationType: resolveClassificationType(this.config.classificationType),
      })
      : new Cesium.Primitive({ ...commonOptions, asynchronous: false })
    return this.viewer.scene.primitives.add(primitive)
  }

  _createOutlinePrimitive(instances) {
    const clampToGround = this.config.clampToGround !== false
    const commonOptions = {
      geometryInstances: instances,
      appearance: new Cesium.PolylineColorAppearance({ translucent: true }),
      show: this.config.show !== false,
    }
    const primitive = clampToGround
      ? new Cesium.GroundPolylinePrimitive({ ...commonOptions })
      : new Cesium.Primitive({ ...commonOptions, asynchronous: false })
    return this.viewer.scene.primitives.add(primitive)
  }

  _removePrimitives() {
    if (!this.viewer || this.viewer.isDestroyed?.()) {
      this.layer = null
      this.outlineLayer = null
      return
    }
    if (this.layer) this.viewer.scene.primitives.remove(this.layer)
    if (this.outlineLayer) this.viewer.scene.primitives.remove(this.outlineLayer)
    this.layer = null
    this.outlineLayer = null
  }

  getLayerById(id) {
    if (!this.layer || !this._fillIds.has(id)) return null
    try {
      return this.layer.getGeometryInstanceAttributes(id)
    } catch {
      return { id, primitive: this.layer }
    }
  }

  getLayerDataById(id) {
    return this.data.find((item) => item.properties?.id === id) || null
  }

  removeLayerById(id) {
    const nextData = this.data.filter((item) => item.properties?.id !== id)
    if (nextData.length === this.data.length) return false
    this.data = nextData
    this._render()
    return true
  }

  clearLayer() {
    this.data = []
    this._fillIds.clear()
    this._removePrimitives()
  }

  show() {
    if (this.layer) this.layer.show = true
    if (this.outlineLayer) this.outlineLayer.show = true
  }

  hide() {
    if (this.layer) this.layer.show = false
    if (this.outlineLayer) this.outlineLayer.show = false
  }

  destroy() {
    this.clearLayer()
    this.viewer = null
  }
}

export default MaskLayer
