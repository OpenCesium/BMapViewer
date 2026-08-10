/**
 * 高性能材质线图层 - 使用Primitive API
 * 相比PolylineCollection，Primitive有更好的渲染性能和内存管理
 */
import * as Cesium from 'cesium'
import {uuid} from '../utils/utils.js'
class LineMaterialLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            type: "glow",
            width: 2,
            color: '#ffffff',
            outlineColor: '#ff0000',
            ...config
        };
        this.linePrimitive = null;
        this.data = []
    }

    getAppearance(type){
        const color = Cesium.Color.fromCssColorString(this.config.color);
        switch (type){
            case "dash":
                return new Cesium.PolylineMaterialAppearance({
                    material: Cesium.Material.fromType(Cesium.Material.PolylineDashType, {
                        color: color,//颜色
                        gapColor:this.config?.gapColor ? new Cesium.Color.fromCssColorString(this.config?.gapColor): Cesium.Color.TRANSPARENT,//间隙颜色
                        dashLength:this.config?.dashLength || 16.0, //虚线长度
                    }),
                    translucent: false,
                })
            case "glow":
                return new Cesium.PolylineMaterialAppearance({
                    material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType, {
                        color: color,
                        glowPower:this.config?.glowPower|| 0.25,
                        taperPower: this.config?.taperPower || 1.0
                    }),
                    translucent: false,
                })
            case "outline":
                return new Cesium.PolylineMaterialAppearance({
                    material: Cesium.Material.fromType(Cesium.Material.PolylineOutlineType, {
                        color: color,
                        outlineWidth:this.config?.outlineWidth || 1.0,
                        outlineColor:new Cesium.Color.fromCssColorString(this.config?.outlineColor)
                    }),
                    translucent: false,
                })
            case "arrow":
                return new Cesium.PolylineMaterialAppearance({
                    material: Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
                        color: color
                    }),
                    translucent: false,
                })
        }
    }
    /**
     * 新增数据
     */
    setData(data) {
        // 如果数据为空，清空已有图层并返回
        if (!Array.isArray(data)) {
            console.error("data must be an array.");
            return;
        }
        this.data = data;
        // 清空旧的图层（如果存在）
        this.clearLayer();

        // 创建新的 geometry 实例
        let instance = [];
        data.forEach(item => {
            let coordinates = item.geometry.coordinates;
            let positions = [];
            coordinates.forEach(coordinate => {
                positions.push(coordinate[0], coordinate[1]);  // 确保坐标顺序正确
            });

            // 确保 geometry 创建无误
            const polyline = new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray(positions),
                width: item?.properties?.width || this.config.width,
                vertexFormat : Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
            });
            polyline.properties = {
                ...item.properties
            };
            // 创建 geometryInstance
            instance.push(
                new Cesium.GeometryInstance({
                    geometry: polyline,
                    id: item.properties.id || uuid(),
                    attributes: {
                        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                            item.properties.color ? new Cesium.Color.fromCssColorString(item.properties.color) : new Cesium.Color.fromCssColorString(this.config.color)
                        ),
                    }
                })
            );
        });
        // 创建外观
        const appearance = this.getAppearance(this.config.type)

        // 创建新的 Primitive 对象
        const primitive = new Cesium.Primitive({
            geometryInstances: instance,
            appearance,
            asynchronous: false,
            // 设置较低的绘制顺序，让线先绘制
            depthFailAppearance: undefined,
        });

        // 添加新的 Primitive 到场景中
        this.linePrimitive = this.viewer.scene.primitives.add(primitive,0);
        console.log(this.linePrimitive, 'linePrimitive');
    }

    /**
     * 清空所有线
     */
    clearLayer() {
        if (this.linePrimitive) {
            this.viewer.scene.primitives.remove(this.linePrimitive);
            this.linePrimitive = null;
        }
    }

    /**
     * 显示
     */
    show() {
        if (!this.linePrimitive) {
            return;
        }
        this.linePrimitive.show = true;
    }
    /**
     * 隐藏
     */
    hide() {
        if (!this.linePrimitive) {
            return;
        }
        this.linePrimitive.show = false;
    }
    /**
     * 根据ID获取线对象
     * @param {string | symbol} id 线的唯一标识符
     */
    getLayerById(id) {
        return this.linePrimitive.getGeometryInstanceAttributes(id);
    }

    /**
     * 根据Id获取线数据
     */
    getLayerDataById(id) {
        let item = null
        item = this.data.find(item => item.properties.id === id)
        return item
    }

    /**
     * 销毁
     */
    destroy() {
        this.clearLayer();
    }
}

export default LineMaterialLayer;
