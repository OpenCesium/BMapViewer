export default {
  id: 'pick-square',
  name: 'pickSquare',
  title: '正方形绘制',
  summary: '通过两个对角控制点生成等边区域，回调返回四个顶点、中心点与边长。',
  instruction: '左键确定第一个角点，移动鼠标预览，再次单击完成正方形',
  code: `const tools = new PickTools(viewer, {
  color: '#63e6be',
  lineWidth: 3,
  pointSize: 10,
  fillOpacity: 0.28,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '单击角点，再次单击完成'
  }
})

tools.pickSquare((result) => {
  onResult(result)
})

return tools`,
}
