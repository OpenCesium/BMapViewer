export default {
  id: 'pick-rectangle',
  name: 'pickRectangle',
  title: '矩形绘制',
  summary: '拾取两个对角点创建矩形，结果包含边界、宽高、中心点与顶点坐标。',
  instruction: '左键确定第一个角点，移动鼠标预览，再次单击完成矩形',
  code: `const tools = new PickTools(viewer, {
  color: '#ffc85c',
  lineWidth: 3,
  pointSize: 10,
  fillOpacity: 0.28,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '单击角点，再次单击完成'
  }
})

tools.pickRectangle((result) => {
  onResult(result)
})

return tools`,
}
