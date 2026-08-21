export default {
  id: 'fog',
  name: 'FogEffect',
  title: '距离雾',
  code: 'FOG',
  summary: '读取深度纹理并按深度阈值混合雾色，可调整起雾位置、过渡范围和浓度。',
  parameters: ['depthStart', 'depthRange', 'intensity', 'density', 'skyAmount', 'color'],
  codeText: `const fog = new WeatherEffects.FogEffect(viewer, {
  mode: 'depth',
  intensity: 0.5,
  depthStart: 0.22,
  depthRange: 0.2,
  density: 0.65,
  skyAmount: 0.55,
  color: '#ccccccff',
})

return fog`,
}
