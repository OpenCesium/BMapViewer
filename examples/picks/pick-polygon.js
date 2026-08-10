export default {
  id: 'pick-polygon',
  name: 'pickPolygon',
  title: '多边形绘制',
  summary: '拾取三个以上节点生成闭合区域，并在绘制过程中实时显示填充面。',
  instruction: '左键添加顶点，双击闭合并结束；至少需要三个点',
  code: `const tools = new PickTools(viewer, {
  color: '#69b9ff',
  lineWidth: 3,
  pointSize: 10,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '左键添加顶点，双击结束'
  }
})

tools.pickPolygon((coordinates) => {
  onResult(coordinates)
})

return tools`,
}
