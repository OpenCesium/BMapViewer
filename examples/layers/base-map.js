export default {
  id: 'base-map',
  name: 'BaseMapLayer',
  title: '离线底图',
  group: '基础图层',
  summary: '离线底图已在 Viewer 初始化时加载，此处只读取现有图层，不再重复叠加。',
  code: `// 离线底图已在 Viewer ready 阶段通过 public/tiles 初始化
const offlineLayer = viewer.imageryLayers.get(0)

if (!offlineLayer) {
  throw new Error('离线底图尚未初始化')
}

offlineLayer.show = true
return () => {}`,
}
