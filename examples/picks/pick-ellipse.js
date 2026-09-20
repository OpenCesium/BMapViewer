export default {
  id: 'pick-ellipse',
  name: 'pickEllipse',
  title: '椭圆绘制',
  summary: '以中心点和外接矩形控制点生成椭圆，返回长短半轴及东西、南北方向半径。',
  instruction: '左键确定中心，沿斜向移动鼠标，再次单击确定椭圆长短轴',
  code: `const tools = new PickTools(viewer, {
  color: '#c89bff',
  lineWidth: 3,
  pointSize: 10,
  fillOpacity: 0.28,
  isReserve: true,
  mouseHints: {
    show: true,
    text: '单击中心，再次单击确定长短轴'
  }
})

tools.pickEllipse((result) => {
  onResult(result)
})

return tools`,
}
