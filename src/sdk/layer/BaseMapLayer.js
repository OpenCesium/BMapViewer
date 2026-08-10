/**
 * 创建基础地图层
 * @param viewer
 * @param config
 */
import * as Cesium from 'cesium'
import AmapMercatorTilingScheme from '../utils/AmapMercatorTilingScheme.js'
import EarthColor from "../utils/EarthColor.js";
class BaseMapLayer {
    constructor(viewer, config) {
        if (!viewer) {
            console.error("viewer is required.");
            return;
        }
        if (!config || !config.url) {
            console.error("url is required.");
            return;
        }
        this.viewer = viewer;
        this.baseMapLayer = null;
        this.isDestroyed = false; // 新增一个标志位
        this.theme = null
        this.config = {
            url: config?.url,
            token: config?.token || '',
            maximumLevel: config?.maximumLevel || 18,
            minimumLevel: config?.minimumLevel || 3,
            rectangle: config?.rectangle,
            themeColor: config?.themeColor || '',
        };
        let resource = this.config.token
            ? new Cesium.Resource({
                url: this.config.url,
                headers: {
                    'Authorization': this.config.token
                }
            })
            : this.config.url;

        this.baseMapLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: resource,
                maximumLevel: this.config.maximumLevel,
                minimumLevel: this.config.minimumLevel,
                rectangle: this.config.rectangle,
                tilingScheme: new AmapMercatorTilingScheme(),
            })
        );
        console.log(this.baseMapLayer,'this.baseMapLayer')
        viewer.imageryLayers.add(this.baseMapLayer,0);

        if(this.config.themeColor){
            this.theme = new EarthColor(viewer);
            this.theme.addColor({
                invertColor:true,
                filterRGB: this.config.themeColor,
            })
        }
    }

    getBaseMapLayer() {
        if (this.isDestroyed) {
            console.error("Layer has been destroyed.");
            return null;
        }
        return this.baseMapLayer;
    }
    removeColor() {
        this.theme && this.theme.restore();
        this.theme = null
    }
    removeLayer() {
        if (!this.viewer || this.viewer.isDestroyed()) {
            this.theme = null;
            this.baseMapLayer = null;
            return;
        }
        this.removeColor()
        this.viewer.scene.imageryLayers.remove(this.baseMapLayer);
        this.baseMapLayer = null;
    }
}
export default BaseMapLayer;
