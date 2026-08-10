/**
 * 创建图标图层
 * @param viewer
 * 使用BillboardCollection
 */
import * as Cesium from 'cesium'
import {uuid} from '../utils/utils.js'
class IconGroupLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            width: 60,
            height: 60,
            ...config
        };
        this.billboardCollection = new Cesium.BillboardCollection();
        this.layer = this.viewer.scene.primitives.add(this.billboardCollection);
        this.data = []
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
        this.data = data;
        data.forEach(item => {
            this.addLayer(item)
        })
    }
    /**
     * 添加图标图层
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
            ...this.config,
            scaleByDistance: new Cesium.NearFarScalar(150000, 1, 400000, 0.5),
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            image: options.properties.icon || options.icon || this.config.icon,
            width: this.config.width || 60,  // 默认宽度
            height: this.config.height || 60,  // 默认高度
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,  // 从底部锚定
            id: options.properties.id || uuid(),  // 确保有唯一的标识符
            disableDepthTestDistance: this.config.disableDepthTestDistance || 100,// 在相机100米时进行深度测试
            color: options.properties.color ? new Cesium.Color.fromCssColorString(options.properties.color) : this.config.color?new Cesium.Color.fromCssColorString(this.config.color):new Cesium.Color.fromCssColorString("#ffffff"),
        };

        // 添加到BillboardCollection
        const billboard = this.billboardCollection.add(config);
        billboard.properties ={
            ...options.properties
        }
        return billboard; // 返回创建的 billboard，方便后续操作
    }

    /**
     * 移除指定的图标
     * @param {Object} billboard Billboard对象
     */
    removeLayer(billboard) {
        if (!billboard) {
            console.error("Billboard is required to remove.");
            return;
        }

        this.billboardCollection.remove(billboard);
    }

    /**
     * 清空所有图标
     */
    clearLayer() {
        this.billboardCollection.removeAll();
    }
    /**
     * 显示
     */
    show() {
        if (!this.billboardCollection) {
            return;
        }
        this.billboardCollection.show = true;
    }
    /**
     * 隐藏
     */
    hide() {
        if (!this.billboardCollection) {
            return;
        }
        this.billboardCollection.show = false;
    }
    /**
     * 根据ID获取图标
     * @param {string | symbol} id 图标的唯一标识符
     */
    getLayerById(id) {
        if (!id) {
            console.error("ID is required to get.");
            return;
        }

        // 遍历所有Billboard，找到指定id的图标并返回
        for (let i = 0; i < this.billboardCollection.length; i++) {
            const bb = this.billboardCollection.get(i);
            if (bb.id === id) {
                return bb;
            }
        }
        return null;
    }
    /**
     * 根据ID移除图标
     * @param {string | symbol} id 图标的唯一标识符
     */
    removeLayerById(id) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }

        // 遍历所有Billboard，找到指定id的图标并移除
        for (let i = 0; i < this.billboardCollection.length; i++) {
            const bb = this.billboardCollection.get(i);
            if (bb.id === id) {
                this.billboardCollection.remove(bb);
                break;
            }
        }
    }

    /**
     * 销毁
     */
    destroy() {
        this.billboardCollection.removeAll();
        this.viewer.scene.primitives.remove(this.billboardCollection);
        this.billboardCollection = null;
        this.viewer = null;
        this.data = null
    }
}
export default IconGroupLayer;
