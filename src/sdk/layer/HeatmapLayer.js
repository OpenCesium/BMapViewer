import * as Cesium from 'cesium'

function safe(n, d) {
    return Number.isFinite(n) ? n : d
}

export default class HeatmapLayer {
    constructor(viewer, config = {}) {
        this.viewer = viewer
        this.config = {
            radius: 50,       // 像素半径（局部贴图下才有意义）
            maxValue: 100,
            gradient: {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "rgb(255,255,0)",
                1.0: "rgb(255,0,0)",
            },
            ...config
        }

        this._canvasSize = 1024
        this._canvas = document.createElement('canvas')
        this._canvas.width = this._canvasSize
        this._canvas.height = this._canvasSize
        this._ctx = this._canvas.getContext('2d', { willReadFrequently: true })

        this._createGradientMap()

        // 先给一个空矩形，等有数据再更新范围
        this._layer = viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(0, 0, 0, 0),
                material: new Cesium.ImageMaterialProperty({
                    image: this._canvas,
                    transparent: true
                })
            }
        })

        this._points = []
        this._rect = null
    }

    _createGradientMap() {
        const canvas = document.createElement('canvas')
        canvas.width = 256
        canvas.height = 1
        const ctx = canvas.getContext('2d')

        const grd = ctx.createLinearGradient(0, 0, 256, 0)
        const gradient = this.config.gradient

        Object.keys(gradient).forEach(k => {
            grd.addColorStop(Number(k), gradient[k])
        })

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, 256, 1)
        this._gradientData = ctx.getImageData(0, 0, 256, 1).data
    }

    _calcBounds(points) {
        let west = 180, south = 90, east = -180, north = -90

        points.forEach(p => {
            west = Math.min(west, p.lon)
            south = Math.min(south, p.lat)
            east = Math.max(east, p.lon)
            north = Math.max(north, p.lat)
        })

        const pad = 0.01
        return Cesium.Rectangle.fromDegrees(
            west - pad,
            south - pad,
            east + pad,
            north + pad
        )
    }

    setData(data = []) {
        this._points = []
        if (!Array.isArray(data)) return

        data.forEach(item => {
            if (!item?.geometry?.coordinates) return
            const [lon, lat] = item.geometry.coordinates
            const value = safe(item.properties?.value, 50)
            if (Number.isFinite(lon) && Number.isFinite(lat)) {
                this._points.push({ lon, lat, value })
            }
        })

        if (!this._points.length){
            return this.clearLayer()
        }

        this._rect = this._calcBounds(this._points)
        this._layer.rectangle.coordinates = this._rect

        this._draw()
    }

    _draw() {
        const ctx = this._ctx
        const size = this._canvasSize
        ctx.clearRect(0, 0, size, size)

        if (!this._rect) return

        const rect = this._rect
        const west = Cesium.Math.toDegrees(rect.west)
        const south = Cesium.Math.toDegrees(rect.south)
        const east = Cesium.Math.toDegrees(rect.east)
        const north = Cesium.Math.toDegrees(rect.north)

        const width = east - west || 1e-6
        const height = north - south || 1e-6

        this._points.forEach(p => {
            const x = ((p.lon - west) / width) * size
            const y = ((north - p.lat) / height) * size

            if (!Number.isFinite(x) || !Number.isFinite(y)) return

            const r = Math.max(1, safe(this.config.radius, 50))
            const grd = ctx.createRadialGradient(x, y, 0, x, y, r)

            const alpha = Math.min(p.value / this.config.maxValue, 1)
            grd.addColorStop(0, `rgba(0,0,0,${alpha})`)
            grd.addColorStop(1, 'rgba(0,0,0,0)')

            ctx.fillStyle = grd
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fill()
        })

        this._applyGradient()
    }

    _applyGradient() {
        const ctx = this._ctx
        const size = this._canvasSize
        const img = ctx.getImageData(0, 0, size, size)
        const data = img.data
        const gradient = this._gradientData

        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3]
            if (alpha === 0) continue

            const idx = Math.min(255, alpha)
            data[i] = gradient[idx * 4]
            data[i + 1] = gradient[idx * 4 + 1]
            data[i + 2] = gradient[idx * 4 + 2]
            // alpha 通道保留
        }

        ctx.putImageData(img, 0, 0)
    }

    clearLayer() {
        this._points = []
        const size = this._canvasSize
        this._ctx.clearRect(0, 0, size, size)

        // 🔥 强制刷新材质
        const rect = this._layer.rectangle
        const oldMaterial = rect.material

        rect.material = new Cesium.ImageMaterialProperty({
            image: this._canvas,
            transparent: true
        })

        // 可选：恢复引用（有些版本 Cesium 需要）
        rect.material = oldMaterial
    }



    show() {
        this._layer.show = true
    }

    hide() {
        this._layer.show = false
    }

    destroy() {
        this.viewer?.entities.remove(this._layer)
        this.viewer = null
    }
}
