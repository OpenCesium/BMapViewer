export default {
  id: 'pick-icon',
  name: 'pickPointIcon',
  title: '图标点拾取',
  summary: '使用 PickTools 默认图标拾取位置，并保留 Billboard 供拖拽调整。',
  instruction: '左键单击地图放置图标；按住图标拖拽可更新坐标',
  code: `const tools = new PickTools(viewer, {
  color: '#69b9ff',
  isReserve: true,
  mouseHints: {
    show: true,
    text: '左键放置图标'
  },
  icon: {
    width: 34,
    height: 34
  }
})

tools.pickPointIcon((coordinates) => {
  onResult(coordinates)
})

return tools`,
}
