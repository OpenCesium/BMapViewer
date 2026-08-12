export default {
  id: 'tdt',
  name: 'TdtImageryProvider',
  title: '天地图',
  group: '令牌服务',
  summary: '天地图需要开发者 Key；将示例中的占位内容替换后运行。',
  code: `const key = '替换为你的天地图 Key'
if (key.startsWith('替换')) {
  throw new Error('请先填写天地图 Key')
}

return new BaseMaps.BaseMap(viewer, {
  type: 'tdt',
  style: 'vec',
  key,
})`,
}
