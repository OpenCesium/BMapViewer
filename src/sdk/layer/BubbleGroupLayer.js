/**
 * 创建气泡图层
 * @param viewer
 * 使用BillboardCollection
 */
import * as Cesium from 'cesium'
import {uuid, createBillboardCanvas} from '../utils/utils.js'
import * as turf from '@turf/turf'
class BubbleGroupLayer {
    constructor(viewer, config) {
        this.viewer = viewer;
        this.config = {
            baseColor: "#40aee2",
            bodyColor: "#11374c",
            headerOpacity: 0.8,
            bodyOpacity: 0.5,
            offset: [0, 0],
            showTitle: false,
            align: 'left',
            // 新增碰撞检测配置
            enableCollisionDetection: true, // 是否启用碰撞检测
            collisionThreshold: 0.3, // 碰撞阈值（0-1），当相交面积超过这个比例时隐藏气泡
            hideStrategy: 'smaller', // 隐藏策略：'smaller'隐藏较小的，'newer'隐藏较新的，'distance'隐藏离中心较远的
            allowClick:false,
            ...config
        };
        this.billboardCollection = new Cesium.BillboardCollection();
        this.layer = this.viewer.scene.primitives.add(this.billboardCollection);
        this.data = [];

        // 用于存储气泡的原始尺寸信息
        this.bubbleSizes = new Map();

        // 事件监听器引用
        this.eventListener = null;
        // 新增：可视区域相关属性
        this.customVisibleArea = null; // 自定义可视区域（turf polygon 或 multipolygon）
        this.visibleAreaMode = 'screen'; // 'screen' 或 'custom'
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
        this.data = data;
        data.forEach(item => {
            this.addLayer(item);
        });
    }

    /**
     * 添加图标图层
     */
    addLayer(options) {
        if (!options || !options.geometry || !options.geometry.coordinates) {
            console.error("缺少coordinates字段");
            return;
        }

        let lon = options.geometry.coordinates[0];
        let lat = options.geometry.coordinates[1];
        let height = options.geometry.coordinates[2] || 0;

        const canvas = createBillboardCanvas({
            title: options.properties.title|| options?.title || "",
            showTitle: this.config?.showTitle || false,
            content: options?.properties?.content || options?.content ||[],
            baseColor: this.config?.baseColor,
            bodyColor: this.config?.bodyColor,
            headerOpacity: this.config?.headerOpacity,
            bodyOpacity: this.config?.bodyOpacity,
            align: this.config.align, // 注意这里应该是contentAlign，不是algin
            scale: 1,
            titleFontSize: this.config?.titleFontSize,
            contentFontSize: this.config?.contentFontSize
        });
// 强制检查 canvas 尺寸，防止极端情况
        if (canvas.width > 1920 || canvas.height > 1080) {
            console.warn("Canvas size too large, skipping...");
            return;
        }
        const id = options.properties.id || uuid();

        const config = {
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            image: canvas,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            id: id,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            scale: 1,
            scaleByDistance: new Cesium.NearFarScalar(150000, 1, 400000, 0.5),
            pixelOffset: new Cesium.Cartesian2(this.config.offset[0], this.config.offset[1]),
            pixelOffsetScaleByDistance:new Cesium.NearFarScalar(150000, 1, 400000,  0.5),
        };

        // 添加到BillboardCollection
        const billboard = this.billboardCollection.add(config);
        billboard.properties = {
            ...options.properties,
        };

        // 存储气泡的原始尺寸（用于碰撞检测）
        this.bubbleSizes.set(id, {
            width: canvas.width,
            height: canvas.height,
            createdTime: Date.now() // 记录创建时间，用于按时间隐藏策略
        });

        // 初始化事件监听
        if (!this.eventListener) {
            this.eventListener = clock => this.render();
            this.viewer.clock.onTick.addEventListener(this.eventListener);
        }
        if(!this.config.allowClick){
            billboard.pickPrimitive = this.config.allowClick
        }
        return billboard;
    }

    /**
     * 渲染和碰撞检测
     */
    render() {
        const visibleBubbles = [];
        const bubbleScreenRects = new Map();

        // 第一步：获取所有在可视区域内的气泡
        this.billboardCollection._billboards.forEach(billboard => {
            const position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.viewer.scene,
                billboard.position
            );

            // 获取地理坐标
            const cartographic = Cesium.Cartographic.fromCartesian(billboard.position);

            // 判断是否在可视区域内
            let shouldShow = false;

            if (this.visibleAreaMode === 'custom' && this.customVisibleArea) {
                // 自定义区域模式：检查是否在自定义区域内
                shouldShow = this.isPointInVisibleArea(cartographic);

                if (!shouldShow) {
                    billboard.show = false;
                    return;
                }

                // 如果在自定义区域内，还需要检查是否在屏幕内
                shouldShow = position && position.x && position.y;
            } else {
                // 屏幕模式：检查是否在屏幕视口内
                if (position && position.x && position.y) {
                    // 检查是否在视口内
                    if (Math.abs(position.x) > (window.innerWidth) ||
                        Math.abs(position.y) > (window.innerHeight)) {
                        billboard.show = false;
                        return;
                    } else {
                        shouldShow = true;
                    }
                }
            }

            if (shouldShow) {
                billboard.show = true;

                // 获取气泡尺寸信息
                const bubbleSize = this.bubbleSizes.get(billboard.id);
                if (!bubbleSize) return;

                // 计算气泡在屏幕上的矩形区域
                const width = bubbleSize.width * billboard.scale;
                const height = bubbleSize.height * billboard.scale;

                // 考虑像素偏移
                const offsetX = billboard.pixelOffset ? billboard.pixelOffset.x : 0;
                const offsetY = billboard.pixelOffset ? billboard.pixelOffset.y : 0;

                const screenRect = {
                    id: billboard.id,
                    billboard: billboard,
                    left: position.x + offsetX - width / 2,
                    right: position.x + offsetX + width / 2,
                    top: position.y + offsetY - height,
                    bottom: position.y + offsetY,
                    width: width,
                    height: height,
                    area: width * height,
                    createdTime: bubbleSize.createdTime,
                    screenPosition: position
                };

                bubbleScreenRects.set(billboard.id, screenRect);
                visibleBubbles.push(screenRect);
            } else {
                billboard.show = false;
            }
        });

        // 第二步：碰撞检测
        if (this.config.enableCollisionDetection && visibleBubbles.length > 1) {
            this.performCollisionDetection(visibleBubbles, bubbleScreenRects);
        }
    }
    /**
     * 设置自定义可视区域
     * @param {Object} geometry - turf 多边形或多边形集合
     */
    setVisibleArea(geometry) {
        if (geometry && (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon')) {
            this.customVisibleArea = geometry;
            this.visibleAreaMode = 'custom';
        } else {
            console.error('Invalid geometry type. Must be Polygon or MultiPolygon.');
        }
    }

    /**
     * 清除自定义可视区域，恢复屏幕视口判断
     */
    clearVisibleArea() {
        this.customVisibleArea = null;
        this.visibleAreaMode = 'screen';
    }

    /**
     * 检查点是否在可视区域内
     */
    isPointInVisibleArea(cartographic) {
        if (this.visibleAreaMode === 'custom' && this.customVisibleArea) {
            const lon = Cesium.Math.toDegrees(cartographic.longitude);
            const lat = Cesium.Math.toDegrees(cartographic.latitude);
            const point = turf.point([lon, lat]);

            return turf.booleanWithin(point, this.customVisibleArea);
        }
        return true; // 屏幕模式下，在 render 方法中判断
    }
    /**
     * 执行碰撞检测
     */
    performCollisionDetection(visibleBubbles, bubbleScreenRects) {
        // 根据不同的隐藏策略排序
        let sortedBubbles;
        switch (this.config.hideStrategy) {
            case 'smaller':
                // 按面积降序排序，先处理大气泡
                sortedBubbles = [...visibleBubbles].sort((a, b) => b.area - a.area);
                break;
            case 'newer':
                // 按创建时间升序排序，先处理较早的气泡
                sortedBubbles = [...visibleBubbles].sort((a, b) => a.createdTime - b.createdTime);
                break;
            case 'distance':
                // 按距离屏幕中心的距离升序排序，先处理靠近中心的气泡
                sortedBubbles = [...visibleBubbles].sort((a, b) => {
                    const distA = this.calculateDistanceToScreenCenter(a.screenPosition);
                    const distB = this.calculateDistanceToScreenCenter(b.screenPosition);
                    return distA - distB;
                });
                break;
            default:
                // 默认按面积排序
                sortedBubbles = [...visibleBubbles].sort((a, b) => b.area - a.area);
        }

        // 用于存储应该显示的气泡ID
        const bubblesToShow = new Set();

        // 遍历所有可见气泡
        for (const bubbleA of sortedBubbles) {
            let shouldShow = true;

            // 检查与已决定显示的气泡是否碰撞
            for (const shownBubbleId of bubblesToShow) {
                const bubbleB = bubbleScreenRects.get(shownBubbleId);
                if (bubbleB && this.checkCollision(bubbleA, bubbleB)) {
                    // 发生碰撞，根据策略决定隐藏哪个
                    shouldShow = this.decideWhichToHide(bubbleA, bubbleB);
                    if (!shouldShow) {
                        break; // 隐藏当前气泡，继续下一个
                    } else {
                        // 隐藏另一个气泡
                        bubbleB.billboard.show = false;
                        bubblesToShow.delete(bubbleB.id);
                    }
                }
            }

            if (shouldShow) {
                bubbleA.billboard.show = true;
                bubblesToShow.add(bubbleA.id);
            } else {
                bubbleA.billboard.show = false;
            }
        }
    }

    /**
     * 检查两个气泡是否碰撞
     */
    checkCollision(bubbleA, bubbleB) {
        // 计算相交矩形
        const left = Math.max(bubbleA.left, bubbleB.left);
        const right = Math.min(bubbleA.right, bubbleB.right);
        const top = Math.max(bubbleA.top, bubbleB.top);
        const bottom = Math.min(bubbleA.bottom, bubbleB.bottom);

        // 如果没有相交
        if (left >= right || top >= bottom) {
            return false;
        }

        // 计算相交面积
        const intersectionArea = (right - left) * (bottom - top);

        // 计算较小气泡的面积
        const minArea = Math.min(bubbleA.area, bubbleB.area);

        // 检查相交面积是否超过阈值
        return intersectionArea / minArea > this.config.collisionThreshold;
    }

    /**
     * 根据策略决定隐藏哪个气泡
     */
    decideWhichToHide(bubbleA, bubbleB) {
        switch (this.config.hideStrategy) {
            case 'smaller':
                // 隐藏较小的气泡
                return bubbleA.area >= bubbleB.area;
            case 'newer':
                // 隐藏较新的气泡
                return bubbleA.createdTime <= bubbleB.createdTime;
            case 'distance':
                // 隐藏离屏幕中心较远的气泡
                const distA = this.calculateDistanceToScreenCenter(bubbleA.screenPosition);
                const distB = this.calculateDistanceToScreenCenter(bubbleB.screenPosition);
                return distA <= distB;
            default:
                // 默认隐藏较小的气泡
                return bubbleA.area >= bubbleB.area;
        }
    }

    /**
     * 计算到屏幕中心的距离
     */
    calculateDistanceToScreenCenter(screenPosition) {
        const canvas = this.viewer.scene.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const dx = screenPosition.x - centerX;
        const dy = screenPosition.y - centerY;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 移除指定的图标
     */
    removeLayer(billboard) {
        if (!billboard) {
            console.error("Billboard is required to remove.");
            return;
        }

        // 从尺寸映射中移除
        this.bubbleSizes.delete(billboard.id);
        this.billboardCollection.remove(billboard);
    }

    /**
     * 清空所有图标
     */
    clearLayer() {
        this.bubbleSizes.clear();
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
     * 根据id重新绘制图标
     */
    updateLayerById(id, options) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }

        let index = this.billboardCollection._billboards.findIndex(item => item.id === id);
        if (index !== -1) {
            const billboard = this.billboardCollection.get(index);
            const canvas = createBillboardCanvas({
                title: options.title || "",
                showTitle: this.config.showTitle || false,
                content: options.content || [],
                baseColor: this.config.baseColor,
                bodyColor: this.config.bodyColor,
                headerOpacity: this.config.headerOpacity,
                bodyOpacity: this.config.bodyOpacity,
                align: this.config.align,
                scale: 1,
                titleFontSize: this.config?.titleFontSize,
                contentFontSize: this.config?.contentFontSize
            });

            billboard.setImage('', canvas);

            // 更新尺寸信息
            this.bubbleSizes.set(id, {
                width: canvas.width,
                height: canvas.height,
                createdTime: Date.now() // 重置创建时间
            });
        }
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
     */
    removeLayerById(id) {
        if (!id) {
            console.error("ID is required to remove.");
            return;
        }

        // 从尺寸映射中移除
        this.bubbleSizes.delete(id);

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
     * 销毁图层，清理资源
     */
    destroy() {
        // 移除事件监听
        if (this.eventListener) {
            this.viewer.clock.onTick.removeEventListener(this.eventListener);
            this.eventListener = null;
        }

        // 清理数据结构
        this.bubbleSizes.clear();

        // 移除图层
        this.clearLayer();
        if (this.layer && this.viewer && this.viewer.scene) {
            this.viewer.scene.primitives.remove(this.layer);
        }
        this.layer = null;
        this.billboardCollection = null;
        this.viewer = null;
    }

    /**
     * 更新配置
     */
    updateConfig(newConfig) {
        this.config = {
            ...this.config,
            ...newConfig
        };
    }
}

export default BubbleGroupLayer;
