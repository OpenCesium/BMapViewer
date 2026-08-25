export default {
  id: 'tencent',
  name: 'TencentImageryProvider',
  title: '腾讯地图',
  group: '互联网底图',
  summary: '加载腾讯电子地图，Provider 内部处理反向 Y 与影像分块标签。',
  code: `const baseMap = new BaseMaps.BaseMap(viewer, {
  type: 'tencent',
  style: '1', // img、1（经典地图）
  maximumLevel: 18,
})

return baseMap`,
}
