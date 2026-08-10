export default {
  id: 'pick-line',
  name: 'pickLine',
  title: '线绘制',
  summary: '连续拾取折点生成贴地折线，结束后可拖拽任意节点编辑。',
  instruction: '左键添加折点，双击结束绘制；至少需要两个点',
  code: `const tools = new PickTools(viewer, {
  color: '#69b9ff',
  lineWidth: 3,
  pointSize: 10,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '左键添加折点，双击结束'
  }
})

tools.pickLine((coordinates) => {
  onResult(coordinates)
})

return tools`,
}
