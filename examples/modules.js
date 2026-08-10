const hostedDocsBase = import.meta.env.VITE_DOCS_BASE_URL?.replace(/\/$/, '')
const githubRepository = 'https://github.com/banyan666/BMapViewer'

function createDocsLink(page) {
  if (hostedDocsBase) return `${hostedDocsBase}/${page}`
  return `${githubRepository}/blob/main/docs/${page}.md`
}

export const projectLinks = {
  docs: hostedDocsBase ? `${hostedDocsBase}/` : `${githubRepository}/tree/main/docs`,
  gettingStarted: createDocsLink('getting-started'),
  github: githubRepository,
}

export const exampleModules = [
  {
    id: 'layers',
    code: 'LYR',
    route: 'layers',
    eyebrow: 'MAP LAYERS',
    title: '图层示例',
    description: '在同一 Cesium 场景中浏览、编辑并运行点、线、面、气泡、热力图与三维场景示例。',
    status: '17 个示例可运行',
    metric: '17',
    metricLabel: 'LIVE EXAMPLES',
    action: '进入图层目录',
    accent: 'cyan',
    docs: createDocsLink('layers'),
    features: ['基础图层', '点位标注', '线面图层', '三维场景', '动态效果', '专题分析'],
  },
  {
    id: 'pick-tools',
    code: 'PICK',
    route: 'pick-tools',
    eyebrow: 'INTERACTION TOOLS',
    title: '拾取与绘制工具',
    description: '在 Cesium 场景中拾取点、图标点、线和多边形，并提供鼠标反馈与节点拖拽编辑。',
    status: 'SDK 已内置',
    metric: '04',
    metricLabel: 'PICK MODES',
    action: '进入拾取示例',
    accent: 'blue',
    docs: createDocsLink('tools/pick-tool'),
    features: ['点拾取', '图标点', '线绘制', '面绘制', '拖拽编辑'],
  },
  {
    id: 'spatial-analysis',
    code: 'GEO',
    eyebrow: 'SPATIAL ANALYSIS',
    title: '空间分析',
    description: 'SDK 直接导出 Turf，使用统一 GeoJSON 数据完成距离、缓冲、包含关系与空间计算。',
    status: 'Turf 已集成',
    metric: 'TURF',
    metricLabel: 'GEO ENGINE',
    action: '查看分析文档',
    accent: 'green',
    docs: createDocsLink('tools/turf'),
    features: ['GeoJSON', '距离计算', '缓冲分析', '空间关系', '数据转换'],
  },
  {
    id: 'weather',
    code: 'WX',
    route: 'weather',
    eyebrow: 'WEATHER PARTICLES',
    title: '天气粒子系统',
    description: '为降雨、降雪、雾、沙尘与闪电效果预留独立目录，后续示例按统一生命周期接入。',
    status: '目录骨架已建立',
    metric: '06',
    metricLabel: 'PLANNED EFFECTS',
    action: '查看天气目录',
    accent: 'amber',
    docs: createDocsLink('weather'),
    features: ['雨', '雪', '雾', '沙尘', '云层', '闪电'],
  },
]

export function findExampleModule(route) {
  return exampleModules.find((module) => module.route === route)
}
