/*
 * @class {Popup} 气泡(dom)弹窗
 * @param {viewer} viewer 三维视图
 * @param {className} string 样式名
 * */
import * as Cesium from 'cesium'
import { uuid } from '../utils/utils.js'

class BubbleLayer {
    constructor(viewer, option = {}) {
        this.options = option
        this.viewer = viewer
        this.className = option?.className
        this.html = option?.html || null
        this.ctnList = {}
        this.allVisible = true
        this.eventListener = null
        this.collisionThreshold = Number.isFinite(option?.collisionThreshold)
            ? Math.max(0, Math.min(1, option.collisionThreshold))
            : 0.3
    }

    setData(data) {
        this.clearLayer()
        if (!Array.isArray(data)) {
            console.error('data must be an array.')
            return
        }
        this.data = data
        data.forEach(item => {
            this.addLayer(item)
        })
    }

    addLayer(conf) {
        const geometry = conf.geometry?.coordinates
        if (!geometry) {
            console.error('coordinates is required.')
            return
        }

        const coordinates = Cesium.Cartesian3.fromDegrees(geometry[0], geometry[1])
        const id = conf?.properties?.id || uuid()
        const ctn = document.createElement('div')

        ctn.className = conf.className || this.className || 'bx-popup-ctn0'
        ctn.id = id
        document.getElementById(this.viewer.container.id).appendChild(ctn)

        let contentData = conf.content || conf?.properties?.content

        const updateContent = (newContent) => {
            contentData = newContent
            ctn.innerHTML = this.createHtml(contentData.header, contentData.body, conf.isClose)
            if (conf.isClose === true) {
                const closeBtn = ctn.querySelector('.bx-popup-close')
                if (closeBtn) closeBtn.onclick = () => this.close(id)
            }
            this.render()
        }

        updateContent(contentData)

        this.ctnList[id] = {
            geometry: coordinates,
            dom: ctn,
            visible: true,
            updateContent
        }

        if (conf.isClose === true) {
            const closeBtn = ctn.querySelector('.bx-popup-close')
            if (closeBtn) closeBtn.onclick = () => this.close(id)
        }

        if (typeof this.eventListener !== 'function') {
            this.eventListener = () => this.render()
            this.viewer.clock.onTick.addEventListener(this.eventListener)
        }

        return { id, element: ctn, updateContent }
    }

    render() {
        const visiblePopups = []

        Object.keys(this.ctnList).forEach(id => {
            const popup = this.ctnList[id]
            const position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.viewer.scene,
                popup.geometry
            )

            if (!position) {
                popup.dom.style.display = 'none'
                return
            }

            popup.dom.style.left = position.x + 'px'
            popup.dom.style.top = position.y + 'px'
            popup.dom.style.display = (popup.visible && this.allVisible) ? '' : 'none'

            if (popup.visible && this.allVisible) {
                visiblePopups.push({
                    id,
                    dom: popup.dom,
                    rect: popup.dom.getBoundingClientRect()
                })
            }
        })

        if (!visiblePopups.length) return

        const activePopups = []

        visiblePopups.forEach(current => {
            let collision = false

            for (const active of activePopups) {
                if (this.checkOverlap(current.rect, active.rect, this.collisionThreshold)) {
                    collision = true
                    break
                }
            }

            current.dom.style.display = collision ? 'none' : ''
            if (!collision) activePopups.push(current)
        })
    }

    checkOverlap(rect1, rect2, threshold = 0.5) {
        const xOverlap = Math.max(0,
            Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)
        )
        const yOverlap = Math.max(0,
            Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top)
        )

        const overlapArea = xOverlap * yOverlap
        const minArea = Math.min(rect1.width * rect1.height, rect2.width * rect2.height)
        return (overlapArea / minArea) > threshold
    }

    updateContent(id, content) {
        const popup = this.ctnList[id]
        if (popup?.updateContent) popup.updateContent(content)
    }

    setPopupVisible(id, visible) {
        const popup = this.ctnList[id]
        if (popup) {
            popup.visible = visible
            this.render()
        }
    }

    show() {
        this.allVisible = true
        this.render()
    }

    hide() {
        this.allVisible = false
        Object.values(this.ctnList).forEach(p => {
            p.dom.style.display = 'none'
        })
    }

    setAllVisible(visible) {
        this.allVisible = visible
        this.render()
    }

    close(id) {
        const popup = this.ctnList[id]
        if (!popup) return

        popup.dom.remove()
        delete this.ctnList[id]

        if (Object.keys(this.ctnList).length === 0) {
            if (typeof this.eventListener === 'function') {
                this.viewer.clock.onTick.removeEventListener(this.eventListener)
                this.eventListener = null
            }
        }
    }

    clearLayer() {
        Object.values(this.ctnList).forEach(p => p.dom.remove())
        this.ctnList = {}

        if (typeof this.eventListener === 'function') {
            this.viewer.clock.onTick.removeEventListener(this.eventListener)
            this.eventListener = null
        }
    }

    createHtml(header, body, isClose) {
        if (this.html) return this.html(header, body)
        return `
            ${isClose ? `<div class="bx-popup-close">×</div>` : ''}
            <div class="divpoint-wrap">
                <div class="divpoint-border">
                    <div class="divpoint-center">
                        <div class="bx-popup-header-ctn">${header}</div>
                        <div class="bx-popup-content-ctn">
                            <div class="bx-popup-content">${body}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="directional"></div>
        `
    }

    /**
     * 更新碰撞阈值
     * @param val
     */
    setCollisionThreshold(val) {
        if (!Number.isFinite(val)) return
        this.collisionThreshold = Math.max(0, Math.min(1, val))
        this.render()
    }
    destroy() {
        this.clearLayer()
        this.viewer = null
    }
}

export default BubbleLayer
