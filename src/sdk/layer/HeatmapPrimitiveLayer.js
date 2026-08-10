import * as Cesium from 'cesium'
import h337 from "../utils/heatmap.js"

export default class HeatmapPrimitiveLayer {

    constructor(viewer, config = {}) {

        this.viewer = viewer

        this.config = {
            renderType: "primitive",

            radius: config.radius || 40,

            gradient: config.gradient || {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "rgb(255,255,0)",
                1.0: "rgb(255,0,0)",
            },

            blur: config.blur ?? 0.85,
            maxOpacity: config.maxOpacity ?? 1,
            minOpacity: config.minOpacity ?? 0,

            maxValue: config.maxValue,
            minValue: config.minValue,

            ...config
        }

        this.data = []

        this.container = null
        this.heatmap = null
        this.provider = null
        this.bounds = null
    }

    /*----------------------------------*/
    /* 数据接口 */
    /*----------------------------------*/

    setData(geojson) {

        // 容错：空数据直接清除
        if (!Array.isArray(geojson) || geojson.length === 0) {
            this.clearLayer()
            this.data = []
            return
        }

        // 过滤非法点
        const validFeatures = geojson.filter(f => {
            return (
                f &&
                f.geometry &&
                Array.isArray(f.geometry.coordinates) &&
                f.geometry.coordinates.length >= 2
            )
        })

        // 如果过滤完没数据
        if (validFeatures.length === 0) {
            this.clearLayer()
            this.data = []
            return
        }

        this.data = validFeatures

        const points = validFeatures.map(f => {

            const [lon, lat] = f.geometry.coordinates

            return {
                x: lon,
                y: lat,
                value: Number(f.properties?.value ?? 1)
            }

        })

        this._createHeatmap(points)

    }


    /*----------------------------------*/
    /* 创建heatmap */
    /*----------------------------------*/

    _createHeatmap(points) {

        this.clearLayer()

        const bounds = this._getBounds(points)
        this.bounds = bounds

        const { container, width, height } = this._createContainer(bounds)
        this.container = container

        const datas = []
        const values = []

        points.forEach(p => {

            const x = ((p.x - bounds[0]) / (bounds[2] - bounds[0])) * width
            const y = ((bounds[3] - p.y) / (bounds[3] - bounds[1])) * height

            datas.push({
                x,
                y,
                value: p.value
            })

            values.push(p.value)

        })

        const min = this.config.minValue ?? Math.min(...values)
        const max = this.config.maxValue ?? Math.max(...values)

        const heatmapData = {
            min,
            max,
            data: datas
        }

        this.heatmap = h337.create({
            container,
            radius: this.config.radius,
            blur: this.config.blur,
            gradient: this.config.gradient,
            maxOpacity: this.config.maxOpacity,
            minOpacity: this.config.minOpacity
        })

        this.heatmap.setData(heatmapData)

        this._createLayer()
    }


    /*----------------------------------*/
    /* Cesium Layer */
    /*----------------------------------*/

    _createLayer() {

        const url = this.heatmap.getDataURL()

        if (this.config.renderType === "primitive") {

            this.provider = this.viewer.scene.primitives.add(
                new Cesium.Primitive({

                    geometryInstances: new Cesium.GeometryInstance({

                        geometry: new Cesium.RectangleGeometry({
                            rectangle: Cesium.Rectangle.fromDegrees(...this.bounds),
                            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
                        })

                    }),

                    appearance: new Cesium.EllipsoidSurfaceAppearance({
                        aboveGround: false
                    })

                })
            )

            this.provider.appearance.material = new Cesium.Material({
                fabric: {
                    type: "Image",
                    uniforms: {
                        image: url
                    }
                }
            })

        }

        else if (this.config.renderType === "imagery") {

            this.provider = this.viewer.imageryLayers.addImageryProvider(

                new Cesium.SingleTileImageryProvider({
                    url,
                    rectangle: Cesium.Rectangle.fromDegrees(...this.bounds)
                })

            )

        }

        else {

            this.provider = this.viewer.entities.add({

                rectangle: {
                    coordinates: Cesium.Rectangle.fromDegrees(...this.bounds),
                    material: new Cesium.ImageMaterialProperty({
                        image: url
                    })
                }

            })

        }

    }


    /*----------------------------------*/
    /* 更新 */
    /*----------------------------------*/

    _updateLayer() {

        const url = this.heatmap.getDataURL()

        if (this.provider instanceof Cesium.Primitive) {

            this.provider.appearance.material.uniforms.image = url

        }

        if (this.provider instanceof Cesium.Entity) {

            this.provider.rectangle.material = new Cesium.ImageMaterialProperty({
                image: url
            })

        }

        if (this.provider instanceof Cesium.ImageryLayer) {

            this.viewer.imageryLayers.remove(this.provider)

            this.provider = this.viewer.imageryLayers.addImageryProvider(
                new Cesium.SingleTileImageryProvider({
                    url,
                    rectangle: Cesium.Rectangle.fromDegrees(...this.bounds)
                })
            )

        }

    }


    /*----------------------------------*/
    /* 显示隐藏 */
    /*----------------------------------*/

    show() {

        if (this.provider) {
            this.provider.show = true
        }

    }

    hide() {

        if (this.provider) {
            this.provider.show = false
        }

    }


    /*----------------------------------*/
    /* 清除 */
    /*----------------------------------*/

    clearLayer() {

        if (!this.provider) return

        if (this.provider instanceof Cesium.Primitive) {
            this.viewer.scene.primitives.remove(this.provider)
        }

        if (this.provider instanceof Cesium.ImageryLayer) {
            this.viewer.imageryLayers.remove(this.provider)
        }

        if (this.provider instanceof Cesium.Entity) {
            this.viewer.entities.remove(this.provider)
        }

        this.provider = null

        if (this.container) {
            document.body.removeChild(this.container)
            this.container = null
        }

    }


    destroy() {

        this.clearLayer()

        this.data = []
        this.heatmap = null

    }


    /*----------------------------------*/
    /* utils */
    /*----------------------------------*/

    _getBounds(points) {

        let lonMin = 180
        let lonMax = -180
        let latMin = 90
        let latMax = -90

        points.forEach(p => {

            lonMin = Math.min(lonMin, p.x)
            lonMax = Math.max(lonMax, p.x)

            latMin = Math.min(latMin, p.y)
            latMax = Math.max(latMax, p.y)

        })

        const xRange = lonMax - lonMin || 1
        const yRange = latMax - latMin || 1

        return [
            lonMin - xRange / 10,
            latMin - yRange / 10,
            lonMax + xRange / 10,
            latMax + yRange / 10
        ]

    }


    _createContainer(bounds) {

        const container = document.createElement("div")

        const width = 1000

        const height = parseInt(
            ((1000 / (bounds[2] - bounds[0])) * (bounds[3] - bounds[1])).toFixed(0)
        )

        container.style = `
        width:${width}px;
        height:${height}px;
        position:absolute;
        left:-9999px;
        top:-9999px;
        background: transparent
        `

        document.body.appendChild(container)

        return { container, width, height }

    }

}
