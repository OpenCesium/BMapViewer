import offline from './offline.js'
import customProvider from './custom-provider.js'
import amap from './amap.js'
import arcgis from './arcgis.js'
import baidu from './baidu.js'
import tencent from './tencent.js'
import google from './google.js'
import tdt from './tdt.js'
import geovis from './geovis.js'

export const baseMapExamples = [
  offline,
  customProvider,
  amap,
  arcgis,
  baidu,
  tencent,
  google,
  tdt,
  geovis,
]

export const baseMapGroups = [...new Set(baseMapExamples.map((item) => item.group))]
