export default {
  id: 'fog',
  name: 'FogEffect',
  title: '距离雾',
  code: 'FOG',
  summary: '读取场景深度并按相机距离混合雾色，通过 near 和 far 控制起止范围。',
  parameters: ['intensity', 'near', 'far', 'density', 'skyAmount', 'color'],
  codeText: `const fog = new WeatherEffects.FogEffect(viewer, {
  intensity: 0.78,
  near: 500,
  far: 12000,
  density: 1.15,
  skyAmount: 0.22,
  color: '#b9c7cddd',
})

return fog`,
}
