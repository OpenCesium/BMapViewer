/**
 * 高性能线图层 - 使用Primitive API
 * 相比PolylineCollection，Primitive有更好的渲染性能和内存管理
 */
import * as Cesium from 'cesium'
import {uuid} from '../utils/utils.js'
class LinePrimitiveLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            width: 2,
            color: '#ffffff',
            ...config
        };
        this.linePrimitive = null;
        this.data = []
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
                width: item?.properties?.width||this.config.width ,
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
        const appearance = new Cesium.PolylineColorAppearance(
            {
                translucent: false,
                renderState: Cesium.RenderState.fromCache({
                    depthTest: { enabled: true },
                    depthMask: true, //写入深度，防止颜色污染
                    blending: Cesium.BlendingState.ALPHA_BLEND
                })
            }
        );

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

export default LinePrimitiveLayer;
