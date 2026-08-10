/**
 * 获取点位
 */
import * as Cesium from 'cesium'
import icon from '../assets/position.png'
export default class PickTools {
    constructor(viewer,config) {
        this.viewer = viewer
        this.config = {
            // 几何-边框宽度
            lineWidth: config?.lineWidth || 2,
            color: config?.color || "#00ffff",
            mouseHints: {
                show: config?.mouseHints?.show || false,
                text: config?.mouseHints?.text ||'左键拾取,双击结束'
            },
            isReserve: config?.isReserve || false,
            pointSize: config?.pointSize || 10,
            icon:{
                url: config?.icon?.url || icon,
                width: config?.icon?.width || 32,
                height: config?.icon?.height || 32
            }
        };
        this.handler = null
        this.label =  null
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    moveLabel(){
        if(this.handler && this.config.mouseHints.show){
            this.handler.setInputAction( (e)=>{
                const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
                const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
                const lon= Cesium.Math.toDegrees(randiansPos.longitude)
                const lat= Cesium.Math.toDegrees(randiansPos.latitude)
                this.addLabel(movePosition,[lon,lat])
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }

    /**
     * 拾取点
     * @param callback
     */
    pickPoint(callback,data=[]){
        let pointEntity = null
        let point = data
        const createPointEntity = () => {
            // 创建点实例
            if(!pointEntity){
                pointEntity = this.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(point[0], point[1]),
                    point: {
                        pixelSize: this.config.pointSize,
                        color: Cesium.Color.fromCssColorString(this.config.color),
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                    }
                });
            }else{
                pointEntity.position = Cesium.Cartesian3.fromDegrees(point[0], point[1])
            }
        }
        //开启拖拽点位编辑
        const startEdit = () => {
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            // 监听鼠标左键按下
            this.handler.setInputAction((e) => {
                const feature = this.viewer.scene.pick(e.position);
                if(Cesium.defined(feature) && feature.id === pointEntity){
                        document.body.style.cursor = 'move';
                        this.viewer.scene.screenSpaceCameraController.enableRotate = false;
                        this.viewer.scene.screenSpaceCameraController.enableTranslate = false;
                        this.viewer.scene.screenSpaceCameraController.enableZoom = false;
                        this.handler.setInputAction((e)=>{
                            const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
                            if (!movePosition) return; // 如果没有点击到地面，返回

                            const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
                            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
                            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
                            point = [lon,lat]
                            pointEntity.position = Cesium.Cartesian3.fromDegrees(point[0], point[1])
                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                    }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            this.handler.setInputAction((e)=>{
                this.viewer.scene.screenSpaceCameraController.enableRotate = true;
                this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
                this.viewer.scene.screenSpaceCameraController.enableZoom = true;
                document.body.style.cursor = 'default';
                this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                const feature = this.viewer.scene.pick(e.position);
                if(Cesium.defined(feature) && feature.id === pointEntity){
                    callback && callback(point);  // 触发回调，传递坐标点
                }
            },Cesium.ScreenSpaceEventType.LEFT_UP)
        }
        if( point && point.length){
            createPointEntity()
            startEdit()
            return
        }
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.moveLabel()
        this.handler.setInputAction( (e)=>{
            const clickPosition = this.viewer.scene.camera.pickEllipsoid(e.position);
            const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
            let lon= Cesium.Math.toDegrees(randiansPos.longitude)
            let lat = Cesium.Math.toDegrees(randiansPos.latitude)
            point = [lon, lat]
            createPointEntity()
            !this.config.isReserve && this.viewer.entities.remove(pointEntity)
            this.destroy()
            this.removeLabel()
            if(lon && lat){
                this.config.isReserve && startEdit()
                callback && callback(point)
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    /**
     * 拾取图标点
     */
    pickPointIcon(callback,data=[]){
        let pointEntity = null
        let point = data
        let clickId =  null
        const createPointEntity = () => {
            // 创建点实例
            if(!pointEntity){
                pointEntity = this.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(point[0], point[1]),
                    billboard: {
                        image: this.config.icon.url,
                        scaleByDistance: new Cesium.NearFarScalar(500000, 1, 1000000, 0.5),
                        show: true,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        width: this.config.icon.width,
                        height: this.config.icon.height,

                    }
                });
            }else{
                pointEntity.position = Cesium.Cartesian3.fromDegrees(point[0], point[1])
            }
        }
        //开启拖拽点位编辑
        const startEdit = () => {
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            // 监听鼠标左键按下
            this.handler.setInputAction((e) => {
                const feature = this.viewer.scene.pick(e.position);
                if(Cesium.defined(feature) && feature.id === pointEntity){
                    clickId = feature.id
                    document.body.style.cursor = 'move';
                    this.viewer.scene.screenSpaceCameraController.enableRotate = false;
                    this.viewer.scene.screenSpaceCameraController.enableTranslate = false;
                    this.viewer.scene.screenSpaceCameraController.enableZoom = false;
                    this.handler.setInputAction((e)=>{
                        const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
                        if (!movePosition) return; // 如果没有点击到地面，返回

                        const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
                        const lon = Cesium.Math.toDegrees(randiansPos.longitude);
                        const lat = Cesium.Math.toDegrees(randiansPos.latitude);
                        point = [lon,lat]
                        pointEntity.position = Cesium.Cartesian3.fromDegrees(point[0], point[1])
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            this.handler.setInputAction((e)=>{
                this.viewer.scene.screenSpaceCameraController.enableRotate = true;
                this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
                this.viewer.scene.screenSpaceCameraController.enableZoom = true;
                document.body.style.cursor = 'default';
                this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                if(clickId === pointEntity){
                    callback && callback(point);  // 触发回调，传递坐标点
                }
            },Cesium.ScreenSpaceEventType.LEFT_UP)
        }
        if( point && point.length){
            createPointEntity()
            startEdit()
            return
        }
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.moveLabel()
        this.handler.setInputAction( (e)=>{
            const clickPosition = this.viewer.scene.camera.pickEllipsoid(e.position);
            const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
            let lon= Cesium.Math.toDegrees(randiansPos.longitude)
            let lat = Cesium.Math.toDegrees(randiansPos.latitude)
            point = [lon, lat]
            createPointEntity()
            !this.config.isReserve && this.viewer.entities.remove(pointEntity)
            this.destroy()
            this.removeLabel()
            if(lon && lat){
                this.config.isReserve && startEdit()
                callback && callback(point)
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    /**
     * 拾取线
     * @param callback
     * @param data
     */
    pickLine(callback,data=[]) {
        let points = data;
        let polylineEntity = null;  // 用于存储绘制的线段
        let tempPolylineEntity = null;  // 临时线段，跟随鼠标移动
        let pointsEntity = []; // 用于存储绘制的点
        let clickIndex= -1
        // 初始化线实例
        const createLineEntity = () => {
            // 绘制线段
            if (points.length > 1) {
                // 更新现有的 polylineEntity 或者创建新的 polylineEntity
                if (!polylineEntity) {
                    polylineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(() => {
                                return points.map((point) => {
                                    return Cesium.Cartesian3.fromDegrees(point[0], point[1]);
                                });
                            }, false),
                            width: this.config.lineWidth,
                            material: Cesium.Color.fromCssColorString(this.config.color),
                            clampToGround:true,
                            zIndex:1
                        }
                    });
                } else {
                    // 更新 polyline 的坐标点
                    polylineEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                        return points.map((point) => {
                            return Cesium.Cartesian3.fromDegrees(point[0], point[1]);
                        });
                    }, false);
                }
            }
        }
        const createPointEntity = (position) => {
            // 创建点实例
            pointsEntity.push(this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(position[0], position[1]),
                point: {
                    pixelSize:this.config.pointSize,
                    color: Cesium.Color.fromCssColorString(this.config.color),
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    zIndex:2,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                }
            }));
        }
        //开启拖拽点位编辑
        const startEdit = () => {
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            // 监听鼠标左键按下
            this.handler.setInputAction((e) => {
                const feature = this.viewer.scene.pick(e.position);
                clickIndex =  -1
                if(Cesium.defined(feature)){
                    let index = pointsEntity.findIndex(item=>item===feature.id)
                    if(index!==-1){
                        clickIndex = index
                        document.body.style.cursor = 'move';
                        this.viewer.scene.screenSpaceCameraController.enableRotate = false;
                        this.viewer.scene.screenSpaceCameraController.enableTranslate = false;
                        this.viewer.scene.screenSpaceCameraController.enableZoom = false;
                        this.handler.setInputAction((e)=>{
                            const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
                            if (!movePosition) return; // 如果没有点击到地面，返回

                            const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
                            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
                            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
                            points[index] = [lon,lat]
                            // 更新 polyline 的坐标点
                            polylineEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                                return points.map((point) => {
                                    return Cesium.Cartesian3.fromDegrees(point[0], point[1]);
                                });
                            }, false);
                            pointsEntity[index].position.setValue(Cesium.Cartesian3.fromDegrees(lon, lat));
                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            this.handler.setInputAction((e)=>{
                this.viewer.scene.screenSpaceCameraController.enableRotate = true;
                this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
                this.viewer.scene.screenSpaceCameraController.enableZoom = true;
                document.body.style.cursor = 'default';
                this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                const feature = this.viewer.scene.pick(e.position);
                if(Cesium.defined(feature) && clickIndex>-1){
                    callback && callback(points);  // 触发回调，传递坐标点
                }
            },Cesium.ScreenSpaceEventType.LEFT_UP)
        }
        if(points.length>1){
            createLineEntity();
            points.forEach((point) => {
                createPointEntity(point);
            });
            startEdit()
            return
        }
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        // 监听鼠标移动，动态更新线段
        this.handler.setInputAction((e) => {
            const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
            if (!movePosition) return; // 如果没有点击到地面，返回

            const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
            this.addLabel(movePosition,[lon,lat])
            // 更新跟随鼠标的临时线段（只要鼠标移动时）
            if (points.length > 0) {
                if (!tempPolylineEntity) {
                    tempPolylineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(() => {
                                // 在最后一个点击点和鼠标当前位置之间画线
                                let lastPoint = points[points.length - 1];
                                return [
                                    Cesium.Cartesian3.fromDegrees(lastPoint[0], lastPoint[1]),
                                    Cesium.Cartesian3.fromDegrees(lon, lat)
                                ];
                            }, false),
                            width: this.config.lineWidth,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(this.config.color).withAlpha(0.5), // 虚线颜色及透明度
                                dashLength: 20 //短划线长度
                            })

                        }
                    });
                } else {
                    tempPolylineEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                        let lastPoint = points[points.length - 1];
                        return [
                            Cesium.Cartesian3.fromDegrees(lastPoint[0], lastPoint[1]),
                            Cesium.Cartesian3.fromDegrees(lon, lat)
                        ];
                    }, false);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // 监听左键点击，记录坐标并绘制线段
        this.handler.setInputAction((e) => {
            const clickPosition = this.viewer.scene.camera.pickEllipsoid(e.position);
            if (!clickPosition) return; // 如果没有点击到地面，返回

            const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
            if(points.length > 0){
                let lastLon = points[points.length - 1][0];
                let lastLat = points[points.length - 1][1];
                if(lastLon===lon && lastLat===lat){
                    return;
                }
            }
            points.push([lon, lat]);  // 保存坐标

            // 绘制线段
            createLineEntity()
            createPointEntity([lon, lat])

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 监听右键点击，结束绘制，回调并销毁事件
        this.handler.setInputAction((e) => {
            this.viewer.entities.remove(tempPolylineEntity);
            this.destroy()
            if(points.length<2){
                this.viewer.entities.remove(pointsEntity[0])
                console.warn('请至少选择两个点')
            }else{
                if(!this.config.isReserve){
                    this.viewer.entities.remove(polylineEntity);
                    pointsEntity.forEach(item=>{
                        this.viewer.entities.remove(item)
                    })
                }else {
                    startEdit()
                }
                callback && callback(points);  // 触发回调，传递坐标点
            }

        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    /**
     * 拾取面
     * @param callback
     */
    pickPolygon(callback,data= []) {
        let points = data;
        let polylineEntity = null;  // 用于存储绘制的线段
        let polygonEntity = null; // 用于存储绘制的面
        let tempPolylineEntity = null;  // 临时线段，跟随鼠标移动
        let pointsEntity = []; // 用于存储绘制的点

        let clickIndex= -1
        // 初始化线实例
        const createLineEntity = (points) => {
            // 绘制线段
            if (points.length > 1) {

                // 更新现有的 polylineEntity 或者创建新的 polylineEntity
                if (!polylineEntity) {
                    polylineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(() => {
                                return points.map((point) => {
                                    return Cesium.Cartesian3.fromDegrees(point[0], point[1]);
                                });
                            }, false),
                            width: this.config.lineWidth,
                            material: Cesium.Color.fromCssColorString(this.config.color),
                            clampToGround:true,
                            zIndex:1
                        }
                    });
                } else {
                    // 更新 polyline 的坐标点
                    polylineEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                        return points.map((point) => {
                            return Cesium.Cartesian3.fromDegrees(point[0], point[1]);
                        });
                    }, false);
                }
            }
        }
        // 初始化面实例
        const createPolygonEntity = () => {
            if(points.length>2){
                let nowPoints = []
                points.forEach(item=>{
                    nowPoints.push(item[0], item[1])
                })
                if(!polygonEntity){
                    polygonEntity = this.viewer.entities.add({
                        polygon: {
                            hierarchy: new Cesium.CallbackProperty(() => {
                                return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(nowPoints));
                            }, false),
                            material: Cesium.Color.fromCssColorString(this.config.color).withAlpha(0.5),
                            outline: false
                        }
                    })
                }else{
                    polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(() => {
                        return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(nowPoints));
                    }, false);
                }
            }
        }
        // 初始化点实例
        const createPointEntity = (position) => {
            // 创建点实例
            pointsEntity.push(this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(position[0], position[1]),
                point: {
                    pixelSize:this.config.pointSize,
                    color: Cesium.Color.fromCssColorString(this.config.color),
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    zIndex:2,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                }
            }));
        }
        //开启拖拽点位编辑
        const startEdit = () => {
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            // 监听鼠标左键按下
            this.handler.setInputAction((e) => {
                const feature = this.viewer.scene.pick(e.position);
                clickIndex =  -1
                if(Cesium.defined(feature)){
                    let index = pointsEntity.findIndex(item=>item===feature.id)
                    if(index!==-1){
                        clickIndex = index
                        document.body.style.cursor = 'move';
                        this.viewer.scene.screenSpaceCameraController.enableRotate = false;
                        this.viewer.scene.screenSpaceCameraController.enableTranslate = false;
                        this.viewer.scene.screenSpaceCameraController.enableZoom = false;
                        this.handler.setInputAction((e)=>{
                            const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
                            if (!movePosition) return; // 如果没有点击到地面，返回

                            const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
                            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
                            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
                            points[index] = [lon,lat]
                            let linePoints = [...points,points[0]]
                            // 更新 polyline 的坐标点
                            createLineEntity(linePoints)
                            let nowPoints = []
                            points.forEach(item=>{
                                nowPoints.push(item[0], item[1])
                            })
                            polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(() => {
                                return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(nowPoints));
                            }, false)
                            pointsEntity[index].position.setValue(Cesium.Cartesian3.fromDegrees(lon, lat));
                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            this.handler.setInputAction((e)=>{
                this.viewer.scene.screenSpaceCameraController.enableRotate = true;
                this.viewer.scene.screenSpaceCameraController.enableTranslate = true;
                this.viewer.scene.screenSpaceCameraController.enableZoom = true;
                document.body.style.cursor = 'default';
                this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                const feature = this.viewer.scene.pick(e.position);
                if(Cesium.defined(feature) && clickIndex>-1){
                    callback && callback(points);  // 触发回调，传递坐标点
                }
            },Cesium.ScreenSpaceEventType.LEFT_UP)
        }
        if(points.length>1){
            let linePoints = [...points,points[0]]
            createLineEntity(linePoints);
            createPolygonEntity()
            points.forEach((point) => {
                createPointEntity(point);
            });
            startEdit()
            return
        }
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        // 监听鼠标移动，动态更新线段
        this.handler.setInputAction((e) => {
            const movePosition = this.viewer.scene.camera.pickEllipsoid(e.endPosition);
            if (!movePosition) return; // 如果没有点击到地面，返回

            const randiansPos = Cesium.Cartographic.fromCartesian(movePosition);
            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
            this.addLabel(movePosition,[lon,lat])
            // 更新跟随鼠标的临时线段（只要鼠标移动时）
            if (points.length > 0) {
                if (!tempPolylineEntity) {
                    tempPolylineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(() => {
                                // 在最后一个点击点和鼠标当前位置之间画线
                                let firstPoint = points[0];
                                let lastPoint = points[points.length - 1];
                                return [
                                    Cesium.Cartesian3.fromDegrees(lastPoint[0], lastPoint[1]),
                                    Cesium.Cartesian3.fromDegrees(lon, lat),
                                    Cesium.Cartesian3.fromDegrees(firstPoint[0], firstPoint[1])
                                ];
                            }, false),
                            width: this.config.lineWidth,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(this.config.color).withAlpha(0.5), // 虚线颜色及透明度
                                dashLength: 20 //短划线长度
                            })

                        }
                    });
                } else {
                    tempPolylineEntity.polyline.positions = new Cesium.CallbackProperty(() => {
                        let lastPoint = points[points.length - 1];
                        let firstPoint = points[0];
                        return [
                            Cesium.Cartesian3.fromDegrees(lastPoint[0], lastPoint[1]),
                            Cesium.Cartesian3.fromDegrees(lon, lat),
                            Cesium.Cartesian3.fromDegrees(firstPoint[0], firstPoint[1])
                        ];
                    }, false);
                }
            }
            if(points.length>1){
                let nowPoints = []
                points.forEach(item=>{
                    nowPoints.push(item[0], item[1])
                })
                if(!polygonEntity){
                    polygonEntity = this.viewer.entities.add({
                        polygon: {
                            hierarchy: new Cesium.CallbackProperty(() => {
                                let lastLon = nowPoints[nowPoints.length - 2];
                                let lastLat = nowPoints[nowPoints.length - 1];
                                if(lastLon!==lon && lastLat!==lat){
                                    nowPoints.push(lon, lat)
                                }
                                return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(nowPoints));
                            }, false),
                            material: Cesium.Color.fromCssColorString(this.config.color).withAlpha(0.5),
                            outline: false
                        }
                    })
                }else{
                    polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(() => {
                        let lastLon = nowPoints[nowPoints.length - 2];
                        let lastLat = nowPoints[nowPoints.length - 1];
                        if(lastLon!==lon && lastLat!==lat){
                            nowPoints.push(lon, lat)
                        }
                        return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(nowPoints));
                    }, false);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // 监听左键点击，记录坐标并绘制线段
        this.handler.setInputAction((e) => {
            const clickPosition = this.viewer.scene.camera.pickEllipsoid(e.position);
            if (!clickPosition) return; // 如果没有点击到地面，返回

            const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
            const lon = Cesium.Math.toDegrees(randiansPos.longitude);
            const lat = Cesium.Math.toDegrees(randiansPos.latitude);
            if(points.length > 0){
                let lastLon = points[points.length - 1][0];
                let lastLat = points[points.length - 1][1];
                if(lastLon===lon && lastLat===lat){
                    return;
                }
            }
            points.push([lon, lat]);  // 保存坐标

            // 绘制线段
            createLineEntity(points)
            createPointEntity([lon, lat])

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 监听右键点击，结束绘制，回调并销毁事件
        this.handler.setInputAction((e) => {
            this.viewer.entities.remove(tempPolylineEntity);
            this.destroy()
            if(points.length<3){
                pointsEntity.forEach(item=>{
                    this.viewer.entities.remove(item)
                })
                this.viewer.entities.remove(polylineEntity)
                console.warn('请至少选择三个点')
            }else{
                if(!this.config.isReserve){
                    this.viewer.entities.remove(polylineEntity);
                    this.viewer.entities.remove(polygonEntity);
                    pointsEntity.forEach(item=>{
                        this.viewer.entities.remove(item)
                    })
                }else {
                    // 更新 polyline 的坐标点
                    let linePoints = []
                    points.forEach(item=>{
                        linePoints.push([item[0], item[1]])
                    })
                    linePoints.push([points[0][0], points[0][1]])
                    createLineEntity(linePoints)
                    startEdit()
                }
                callback && callback(points);  // 触发回调，传递坐标点
            }

        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
    addLabel(movePosition,position){
        if(!this.label){
            this.label = this.viewer.entities.add({
                label: {
                    text: '',
                    showBackground: true,
                    font: '14px sans-serif',
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(10, 10),
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                }
            })
        }
        this.label.position = movePosition
        this.label.label.text = this.config.mouseHints.text +'\n'+`经度：${position[0]}°\n纬度：${position[1]}°`
    }
    removeLabel(){
        this.label && this.viewer.entities.remove(this.label)
    }
    clear(){
        this.destroy()
        this.viewer.entities.removeAll()
    }
    destroy(){
        this.removeLabel()
        this.handler && this.handler.destroy()
        this.handler = null
    }


}
