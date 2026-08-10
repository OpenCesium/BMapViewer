/**
 * 3D radar scanner layer.
 */
import * as Cesium from 'cesium'

class RadarScanner3DLayer {
    constructor(viewer, options = {}) {
        this.viewer = viewer
        this.config = {
            position: [0, 0, 0],
            radius: 1000,
            color: 'rgb(5,251,248)',
            speed: 1,
            hemisphereAlpha: 0.5,
            scanAlpha: 0.6,
            outlineColor: '#f1f105',
            autoStart: false,
            ...options
        }

        const [lon, lat, height = 0] = this.config.position
        this.centerLongitude = lon
        this.centerLatitude = lat
        this.centerHeight = height
        this.radius = this.config.radius
        this.speed = this.config.speed
        this.color = this.getColor(this.config.color)
        this.outlineColor = this.getColor(this.config.outlineColor)

        this.heading = 0
        this.wallPositions = this.calculateScanPane(
            this.centerLongitude,
            this.centerLatitude,
            this.radius,
            this.heading
        )
        this.entities = []
        this.eventListener = null

        this.createRadar()
        if (this.config.autoStart) {
            this.start()
        }
    }

    createRadar() {
        if (!this.viewer || this.viewer.isDestroyed?.()) return
        if (this.entities.length) return
        this.createHemisphere()
        this.createScanWall()
    }

    start() {
        if (!this.viewer || this.viewer.isDestroyed?.()) return
        if (this.eventListener) return
        this.eventListener = () => {
            this.heading = (this.heading + this.speed) % 360
            this.wallPositions = this.calculateScanPane(
                this.centerLongitude,
                this.centerLatitude,
                this.radius,
                this.heading
            )
        }
        this.viewer.clock.onTick.addEventListener(this.eventListener)
    }

    createHemisphere() {
        const entity = this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(
                this.centerLongitude,
                this.centerLatitude,
                this.centerHeight
            ),
            name: '3D radar scanner',
            ellipsoid: {
                radii: new Cesium.Cartesian3(this.radius, this.radius, this.radius),
                maximumCone: Cesium.Math.toRadians(90),
                material: this.color.withAlpha(this.config.hemisphereAlpha),
                outline: true,
                outlineColor: this.outlineColor,
                outlineWidth: 1
            }
        })

        this.entities.push(entity)
        return entity
    }

    createScanWall() {
        const entity = this.viewer.entities.add({
            wall: {
                positions: new Cesium.CallbackProperty(() => {
                    return Cesium.Cartesian3.fromDegreesArrayHeights(this.wallPositions)
                }, false),
                material: this.color.withAlpha(this.config.scanAlpha)
            }
        })

        this.entities.push(entity)
        return entity
    }

    calculateScanPane(centerLon, centerLat, radius, heading) {
        const center = Cesium.Cartesian3.fromDegrees(centerLon, centerLat, this.centerHeight)
        const transformMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center)
        const radians = Cesium.Math.toRadians(heading)
        const translation = Cesium.Cartesian3.fromElements(
            radius * Math.cos(radians),
            radius * Math.sin(radians),
            0
        )
        const targetPoint = Cesium.Matrix4.multiplyByPoint(
            transformMatrix,
            translation,
            new Cesium.Cartesian3()
        )
        const cartographic = Cesium.Cartographic.fromCartesian(targetPoint)

        return this.calculateScanSector(
            centerLon,
            centerLat,
            Cesium.Math.toDegrees(cartographic.longitude),
            Cesium.Math.toDegrees(cartographic.latitude)
        )
    }

    calculateScanSector(centerLon, centerLat, targetLon, targetLat) {
        const positions = [centerLon, centerLat, this.centerHeight]
        const radius = Cesium.Cartesian3.distance(
            Cesium.Cartesian3.fromDegrees(centerLon, centerLat, this.centerHeight),
            Cesium.Cartesian3.fromDegrees(targetLon, targetLat, this.centerHeight)
        )

        for (let i = 0; i <= 90; i += 2) {
            const radians = Cesium.Math.toRadians(i)
            const height = this.centerHeight + radius * Math.sin(radians)
            const horizontalFactor = Math.cos(radians)

            positions.push((targetLon - centerLon) * horizontalFactor + centerLon)
            positions.push((targetLat - centerLat) * horizontalFactor + centerLat)
            positions.push(height)
        }

        return positions
    }

    getColor(color) {
        if (color instanceof Cesium.Color) return color
        return Cesium.Color.fromCssColorString(color || '#05fbf8')
    }
    stop() {
        if (this.viewer && this.eventListener) {
            this.viewer.clock.onTick.removeEventListener(this.eventListener)
        }
        this.eventListener = null
        // this.setVisible(false)
    }

    setVisible(visible) {
        this.entities.forEach(entity => {
            entity.show = visible
        })
    }
    show(){
        this.setVisible(true)
    }
    hide(){
        this.setVisible(false)
    }

    clearLayer() {
        this.stop()
        if (this.viewer) {
            this.entities.forEach(entity => this.viewer.entities.remove(entity))
        }
        this.entities = []
    }

    destroy() {
        this.clearLayer()
        this.viewer = null
    }
}

export default RadarScanner3DLayer
