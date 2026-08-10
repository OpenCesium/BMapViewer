/**
 * 创建label图层
 * @param viewer
 * 使用LabelCollection
 */
import * as Cesium from 'cesium'
import {uuid} from '../utils/utils.js'
class LabelGroupLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            text: 'label',
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            showBackground: false,
            offsetZ: 0,
            offsetY: 0,
            ...config
        };
        this.labelCollection = new Cesium.LabelCollection();
        this.layer = this.viewer.scene.primitives.add(this.labelCollection);
    }
    /**
     * 新增数据
     */
    setData(data){
        this.clearLayer();
        if (!Array.isArray(data)) {
            console.error("data must be an array.");
            return;
        }
        data.forEach(item => {
            this.addLayer(item)
        })
    }
    /**
     * 添加label图层
     * @param {Object} options 图标配置参数
     */
    addLayer(options) {
        if (!options || !options.geometry || !options.geometry.coordinates) {
            console.error("缺少coordinates字段");
            return;
        }

        let lon = options.geometry.coordinates[0];
        let lat = options.geometry.coordinates[1];
        let height = options.geometry.coordinates[2] || 0;

        const config = {
            scaleByDistance: new Cesium.NearFarScalar(500000, 1, 1000000, 0.5),
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            text: options.properties.text || options.text || this.config.text,
            font: this.config.fontSize||'12px',
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,  // 从底部锚定
            pixelOffset: new Cesium.Cartesian2(this.config.offsetZ||0, this.config.offsetY||0),
            backgroundColor: this.config.backgroundColor?new Cesium.Color.fromCssColorString(this.config.backgroundColor):Cesium.Color(0, 0, 0, 0.5),
            showBackground:this.config.showBackground||false,
            fillColor: this.config.color?new Cesium.Color.fromCssColorString(this.config.color):Cesium.Color.WHITE,
            id: options.properties.id||uuid(),  // 确保有唯一的标识符
        };

        // 添加到BillboardCollection
        const label = this.labelCollection.add(config);
        label.properties ={
            ...options.properties
        }
        return label; // 返回创建的 billboard，方便后续操作
    }

    /**
     * 移除指定的label
     * @param {Object} label label对象
     */
    removeLayer(label) {
        if (!label) {
            console.error("Billboard is required to remove.");
            return;
        }

        this.labelCollection.remove(label);
    }

    /**
     * 清空所有label
     */
    clearLayer() {
        this.labelCollection.removeAll();
    }

    /**
     * 显示
     */
    show() {
        if (!this.labelCollection) {
            return;
        }
        this.labelCollection.show = true;
    }
    /**
     * 隐藏
     */
    hide() {
        if (!this.labelCollection) {
            return;
        }
        this.labelCollection.show = false;
    }
    /**
     * 根据ID获取label实例
     * @param {string | symbol} id label的唯一标识符
     * @returns {Object | null} label实例，如果没有找到则返回null
     */
    getLayerById(id) {
        if (!id) {
            console.error("ID is required to get.");
            return;
        }
        // 遍历所有label，找到指定id的label并返回
        for (let i = 0; i < this.labelCollection.length; i++) {
            const ll = this.labelCollection.get(i);
            if (ll.id===id) {
                return ll;
            }
        }
        return null;
    }
    /**
     * 根据ID移除label
     * @param {string | symbol} id label的唯一标识符
     */
    removeLayerById(id) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }
        // 遍历所有label，找到指定id的label并移除
        for (let i = 0; i < this.labelCollection.length; i++) {
            const ll = this.labelCollection.get(i);
            if (ll.id===id) {
                this.labelCollection.remove(ll);
                break;
            }
        }
    }

    /**
     * 销毁
     */
    destroy() {
        this.labelCollection.removeAll();
        this.viewer.scene.primitives.remove(this.layer);
        this.layer = null;
        this.labelCollection = null;
    }
}
export default LabelGroupLayer;
