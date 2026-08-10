import BMapViewer from './components/BMapViewer.vue'
import PickTools from './utils/PickTools.js'
import EarthColor from './utils/EarthColor.js'
import MapLayers from './layer/index.js'
import * as turf from '@turf/turf'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import './styles/popup.css'

BMapViewer.install = (app) => {
    app.component('BMapViewer', BMapViewer)
}

const BMapViewerPlugin = {
    install(app) {
        app.use(BMapViewer)
    },
}

export { MapLayers }
export { PickTools, EarthColor, turf }
export { useCesium } from './composables/useCesium'
export { BMapViewer }
export default BMapViewerPlugin

