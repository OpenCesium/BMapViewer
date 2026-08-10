/**
 * 水波纹扩散
 */
import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'
import {
    registerCircleWaveMaterial,
    CircleWaveMaterialProperty
} from './material/wave.js'

export default class CircleWaveLayer {
    constructor(viewer,config) {
        this.viewer = viewer
        this.config = {
            color:'#fbad06',
            radius:1000,
            duration:3000,
            count:5,
            ...config
        };
        // 使用 CustomDataSource
        this.layer = new Cesium.CustomDataSource('circle-wave-layer');
        this.viewer.dataSources.add(this.layer);
        registerCircleWaveMaterial()
    }

    setData(data = []) {
        this.clearLayer();
        if (!Array.isArray(data)) {
            console.error("data must be an array.");
            return;
        }
        data.forEach(item => this.addLayer(item))
    }

    addLayer(options) {
        if (!this.viewer || this.viewer.isDestroyed()) return
        if (!options?.geometry?.coordinates) return

        const [lon, lat, height = 0] = options.geometry.coordinates
        const props = options.properties || {}

        const id = props.id || uuid()

        const entity = this.layer.entities.add({
            id,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            ellipse: {
                semiMajorAxis: props.radius || this.config.radius,
                semiMinorAxis: props.radius || this.config.radius,
                material: new CircleWaveMaterialProperty({
                    color: props.color || this.config.color,
                    duration: props.duration || this.config.duration,
                    count: props.count || this.config.count,
                    gradient: 0
                })
            }
        })
        entity.properties = {
            ...props,
            center: [lon, lat, height]
        }
        return entity;
    }

    /**
     * 清除全部
     */
    clearLayer() {
        this.layer.entities.removeAll()
    }
    /**
     * 显示
     */
    show() {
        this.layer.show = true;
    }
    /**
     * 隐藏
     */
    hide() {
        this.layer.show = false;
    }
    /**
     * 根据ID获取圆实例
     * @param id
     * @returns {Entity|null}
     */
    getLayerById(id) {
        return this.layer.entities.getById(id) || null;
    }

    /**
     * 删除圆实例
     * @param circle
     */
    removeLayer(circle) {
        if (!circle) return;
        this.layer.entities.remove(circle);
    }

    /**
     * 根据id删除圆实例
     * @param id
     */
    removeLayerById(id) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }
        const circle = this.getLayerById(id);
        if (circle) {
            this.layer.entities.remove(circle);
        }
    }
    destroy() {
        if (this.viewer && this.layer) {
            this.viewer.dataSources.remove(this.layer);
        }
        this.layer = null;
        this.viewer = null;
    }
}
