/**
 * 点扩散
 */

import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'
import { registerPointRippleMaterial, PointRippleMaterialProperty } from './material/pointRipple.js'

export default class PointRippleLayer {
    constructor(viewer, config = {}) {
        this.viewer = viewer
        this.config = {
            color: '#ff2d2d',
            radius: 1500,//半径
            duration: 3000,//持续时间
            speed: 1.0,//速度
            innerFade: 1.5,//内环淡入
            ringWidth: 0.01,//环宽度
            height: 0,
            ...config
        }

        this.layer = new Cesium.CustomDataSource('point-ripple-layer')
        this.viewer.dataSources.add(this.layer)

        // 注册材质（只会注册一次）
        registerPointRippleMaterial()
    }

    /**
     * data: [{ geometry: { coordinates: [lon, lat, height?] }, properties: { radius, color, duration, speed } }]
     */
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
                // height,
                // 🔥 关键
                // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                // classificationType: Cesium.ClassificationType.BOTH,
                material: new PointRippleMaterialProperty({
                    color: props.color || this.config.color,
                    duration: props.duration || this.config.duration,
                    speed: props.speed ?? this.config.speed,
                    innerFade: props.innerFade ?? this.config.innerFade,
                    ringWidth: props.ringWidth ?? this.config.ringWidth
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

    removeById(id) {
        const e = this.getById(id)
        if (e) this.layer.entities.remove(e)
    }

    destroy() {
        if (this.viewer && this.layer) {
            this.viewer.dataSources.remove(this.layer)
        }
        this.layer = null
        this.viewer = null
    }
}
