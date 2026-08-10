/**
 * 圆爆炸扩散
 */
import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'
import {
    registerCircleExplosionMaterial,
    CircleExplosionMaterialProperty
} from './material/explosion.js'

export default class CircleExplosionLayer {
    constructor(viewer, config = {}) {
        this.viewer = viewer
        this.config = {
            color: '#ff2a2a',
            radius: 1000,//半径
            duration: 2000,//持续时间
            speed: 1.0,//速度
            fillAlpha: 0.25,//填充透明度
            edgeWidth: 0.03,//边缘宽度
            waveWidth: 0.05,//扩散波宽度
            height: 0,
            ...config
        }

        this.layer = new Cesium.CustomDataSource('circle-explosion-layer')
        this.viewer.dataSources.add(this.layer)

        // 注册材质（只会注册一次）
        registerCircleExplosionMaterial()
    }

    setData(data = []) {
        this.clearLayer()
        if (!Array.isArray(data)) return
        data.forEach(item => this.addLayer(item))
    }

    addLayer(options) {
        if (!this.viewer || this.viewer.isDestroyed()) return
        if (!options?.geometry?.coordinates) return

        const [lon, lat, height = this.config.height] = options.geometry.coordinates
        const props = options.properties || {}

        const id = props.id || uuid()

        const entity = this.layer.entities.add({
            id,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            ellipse: {
                semiMajorAxis: props.radius || this.config.radius,
                semiMinorAxis: props.radius || this.config.radius,
                material: new CircleExplosionMaterialProperty({
                    color: props.color || this.config.color,
                    duration: props.duration || this.config.duration,
                    speed: props.speed ?? this.config.speed,
                    fillAlpha: props.fillAlpha ?? this.config.fillAlpha,
                    edgeWidth: props.edgeWidth ?? this.config.edgeWidth,
                    waveWidth: props.waveWidth ?? this.config.waveWidth
                })
            }
        })

        entity.properties = {
            ...props,
            center: [lon, lat, height]
        }

        return entity
    }

    clearLayer() {
        this.layer.entities.removeAll()
    }

    show() {
        this.layer.show = true
    }

    hide() {
        this.layer.show = false
    }

    getLayerById(id) {
        return this.layer.entities.getById(id) || null
    }

    removeLayerById(id) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }
        const entity = this.getLayerById(id)
        if (entity) this.layer.entities.remove(entity)
    }

    destroy() {
        if (this.viewer && this.layer) {
            this.viewer.dataSources.remove(this.layer)
        }
        this.layer = null
        this.viewer = null
    }
}
