export default {
  id: 'sandstorm',
  name: 'SandstormEffect',
  title: '沙尘',
  code: 'SAND',
  summary: '流动噪声、颗粒和暖色低能见度组合的沙尘天气效果。',
  parameters: ['intensity', 'density', 'speed', 'wind', 'color'],
  codeText: `const sandstorm = new WeatherEffects.SandstormEffect(viewer, {
  intensity: 0.72,
  density: 0.9,
  speed: 1,
  wind: 0.8,
  color: '#c8894de6',
})

return sandstorm`,
}
