/**
 * 创建圆图层
 * @param viewer
 * 使用 CustomDataSource
 */
import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'

class CircleGroupLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            fillColor: "#40aee2ff",
            outlineColor: "#11374cff",
            outlineWidth: 2,
            height: 0,
            extrudedHeight: undefined,
            radius:100,
            xRadius: 100,
            yRadius: 100,
            opacity: 1,
            ...config
        };

        // 使用 CustomDataSource
        this.layer = new Cesium.CustomDataSource('circle-group-layer');
        this.viewer.dataSources.add(this.layer);
    }

    /**
     * 新增数据
     */
    setData(data) {
        this.clearLayer();
        if (!Array.isArray(data)) {
            console.error("data must be an array.");
            return;
        }
        data.forEach(item => {
            this.addLayer(item);
        });
    }

    /**
     * 添加圆图层
     */
    addLayer(options) {
        if (!options || !options.geometry || !options.geometry.coordinates) {
            console.error("缺少coordinates字段");
            return;
        }
        let lon = options.geometry.coordinates[0];
        let lat = options.geometry.coordinates[1];
        let height = options.geometry.coordinates[2] || this.config.height;
        const xRadius = options.properties?.xRadius || this.config.xRadius || this.config.radius;
        const yRadius = options.properties?.yRadius || this.config.yRadius || this.config.radius;
        const fillColor = options.properties?.fillColor || this.config.fillColor;
        const outline = options.properties?.outline || this.config.outline || false;
        const outlineColor = options.properties?.outlineColor || this.config.outlineColor;
        const outlineWidth = options.properties?.outlineWidth || this.config.outlineWidth;
        const extrudedHeight = options.properties?.extrudedHeight || this.config.extrudedHeight;
        const rotation = options.properties?.rotation || this.config.rotation || 0;
        const opacity = options.properties?.opacity || this.config.opacity;
        const id = options.properties?.id || uuid();

        const circle = this.layer.entities.add({
            id,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            ellipse: {
                semiMajorAxis: xRadius,
                semiMinorAxis: yRadius,
                height: height,
                extrudedHeight: extrudedHeight,
                material: Cesium.Color.fromCssColorString(fillColor).withAlpha(opacity),
                outline: outline,
                outlineColor: Cesium.Color.fromCssColorString(outlineColor),
                outlineWidth: outlineWidth,
                numberOfVerticalLines: 32,
                rotation: rotation,
            }
        });
        // 保存自定义属性
        circle.properties = {
            ...options.properties,
            center: [lon, lat, height]
        };

        return circle;
    }

    /**
     * 清除全部
     */
    clearLayer() {
        this.layer.entities.removeAll();
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
    //销毁
    destroy() {
        if (this.viewer && this.layer) {
            this.viewer.dataSources.remove(this.layer);
        }
        this.layer = null;
        this.viewer = null;
    }
}

export default CircleGroupLayer;
