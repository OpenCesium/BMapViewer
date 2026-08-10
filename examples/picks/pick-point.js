export default {
  id: 'pick-point',
  name: 'pickPoint',
  title: '点拾取',
  summary: '左键拾取一个 WGS84 坐标，保留点位后可以继续拖拽编辑。',
  instruction: '左键单击地图完成拾取；按住点位拖拽可更新坐标',
  code: `const tools = new PickTools(viewer, {
  color: '#69b9ff',
  pointSize: 12,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '左键拾取点位'
  }
})

tools.pickPoint((coordinates) => {
  onResult(coordinates)
})

return tools`,
}
