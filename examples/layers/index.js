import iconGroup from './icon-group.js'
import labelGroup from './label-group.js'
import lineGroup from './line-group.js'
import linePrimitive from './line-primitive.js'
import build3d from './build-3d.js'
import bubbleDom from './bubble-dom.js'
import bubbleGroup from './bubble-group.js'
import circleGroup from './circle-group.js'
import circleWave from './circle-wave.js'
import circleExplosion from './circle-explosion.js'
import pointRipple from './point-ripple.js'
import polygonPrimitive from './polygon-primitive.js'
import lineMaterial from './line-material.js'
import heatmap from './heatmap.js'
import heatmapPrimitive from './heatmap-primitive.js'
import radarScanner3d from './radar-scanner-3d.js'

export const layerExamples = [
  iconGroup,
  labelGroup,
  lineGroup,
  linePrimitive,
  build3d,
  bubbleDom,
  bubbleGroup,
  circleGroup,
  circleWave,
  circleExplosion,
  pointRipple,
  polygonPrimitive,
  lineMaterial,
  heatmap,
  heatmapPrimitive,
  radarScanner3d,
]

export const layerGroups = [...new Set(layerExamples.map((item) => item.group))]
