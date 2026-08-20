import {getOffsetLat} from '../utils/utils.js'
import * as Cesium from 'cesium'
import { printBMapViewerWelcome } from '../utils/welcome.js'
export function useCesium() {
    let viewer = null
    let minimumHeight = 1;
    let maximumHeight = 1500000
    //初始化Cesium
    const initCesium = async (container, props) => {
        printBMapViewerWelcome()
        try {
            // 创建 Viewer
            viewer = new Cesium.Viewer(container, {
                animation: false,//是否创建动画小器件，左下角仪表

                baseLayerPicker: false,//是否显示图层选择器，右上角图层选择按钮

                fullscreenButton: false,//是否显示全屏按钮，右下角全屏选择按钮

                geocoder: false,//是否显示geocoder小器件，右上角查询按钮

                homeButton: false,//是否显示Home按钮，右上角home按钮

                sceneMode: props?.sceneMode === 0 ? Cesium.SceneMode.SCENE2D : Cesium.SceneMode.SCENE3D,//初始场景模式

                sceneModePicker: false,//是否显示3D/2D选择器，右上角按钮

                navigationHelpButton: false,//是否显示右上角的帮助按钮

                selectionIndicator: false,//是否显示选取指示器组件

                timeline: false,//是否显示时间轴

                infoBox: false,//是否显示信息框

                scene3DOnly:props?.sceneMode === 0 ?false: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源

                orderIndependentTranslucency: false, //是否启用无序透明

                contextOptions: { webgl: { alpha: true } },

                skyBox: new Cesium.SkyBox({ show: false }),

                baseLayer: false, // 不显示默认图层

                showRenderLoopErrors:false
            })

            if(props.mapConfig){
                console.log('mapConfig',props)
                minimumHeight = props.mapConfig?.minHeight || 1
                maximumHeight = props.mapConfig?.maxHeight || 1500000
                setMapCenter(props.mapConfig)
            }
            // 在渲染阶段前添加事件监听器
            viewer.scene.preRender.addEventListener(restrictMaxiHeight)
            if(props.baseColor){
                viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString(props.baseColor);
            }
            // 获取相机控制器
            let controller = viewer.scene.screenSpaceCameraController;

            // 设置右键用于旋转
            controller.tiltEventTypes = [
                Cesium.CameraEventType.RIGHT_DRAG,  // 右键拖动旋转
                Cesium.CameraEventType.PINCH,  // 保留多点触控旋转
                {
                    eventType: Cesium.CameraEventType.LEFT_DRAG,
                    modifier: Cesium.KeyboardEventModifier.CTRL  // 保留Ctrl+左键拖动旋转
                },
                {
                    eventType: Cesium.CameraEventType.RIGHT_DRAG,
                    modifier: Cesium.KeyboardEventModifier.CTRL  // 保留Ctrl+右键拖动旋转
                }
            ];

            // 禁用右键缩放
            controller.zoomEventTypes = [
                Cesium.CameraEventType.WHEEL,  // 保留滚轮缩放
                Cesium.CameraEventType.PINCH,  // 保留多点触控缩放
                // {
                //     eventType: Cesium.CameraEventType.LEFT_DRAG,
                //     modifier: Cesium.KeyboardEventModifier.CTRL  // 保留Ctrl+左键缩放
                // }
                // 不包含 RIGHT_DRAG，这样右键就不会缩放了
            ];
            return viewer

        } catch (err) {
            console.error('Failed to initialize Cesium:', err)
            throw err
        }
    }
    // 销毁Cesium
    const destroyCesium = () => {
        if (viewer && !viewer.isDestroyed()) {
            viewer.scene.preRender.removeEventListener(restrictMaxiHeight)
            viewer.destroy()
            viewer = null
        }
    }
    const setMapCenter = (config) =>{
        let {
            longitude=125.83372000975274,
            latitude = 44.14712267403385,
            height=10000,
            pitch = 0
        } = config
        viewer.scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(longitude,getOffsetLat({lat:latitude,pitch:pitch,height:height}), height),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(pitch),
                roll: 0.0,
            },
        });
    }
    // 移动到指定位置
    const flyTo = (destination, duration = 3) => {
        if (!viewer) return
        if(destination?.longitude == null || destination?.latitude == null) return;
        let offestLon = {
            lon: destination.longitude,
            lat: destination.latitude,
            height: destination.height || 800,
            pitch:destination.pitch || -90
        }
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                destination.longitude,
                getOffsetLat(offestLon),
                destination.height || 800
            ),
            duration,
            orientation: destination.orientation || {
                heading: Cesium.Math.toRadians(0.0),
                pitch: Cesium.Math.toRadians(offestLon.pitch),
                roll: 0.0
            }
        })
    }


    const getViewer = () => viewer
    const setViewer = (view) => {
        viewer = view
    }
    // 相机高度限制
    const restrictMaxiHeight = () =>{
        let eye = viewer.camera.positionCartographic;
        // 判断相机坐标是否小于阈值，若小于阈值，则保持视点方位，修改相机高度
        if (eye.height < minimumHeight) {
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromRadians(eye.longitude, eye.latitude, minimumHeight),
                orientation: {
                    direction: viewer.camera.direction,
                    up: viewer.camera.up
                }
            });
        }
        if(eye.height >= maximumHeight){
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromRadians(eye.longitude, eye.latitude, maximumHeight),
                orientation: {
                    direction: viewer.camera.direction,
                    up: viewer.camera.up
                }
            });
        }
    }
    return {
        getViewer,
        setViewer,
        setMapCenter,
        initCesium,
        destroyCesium,
        flyTo,
    }
}
