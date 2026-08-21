export default {
  id: 'cloud',
  name: 'CloudEffect',
  title: '体积云',
  code: 'CLOUD',
  summary: '在地球上空构建世界空间云壳，通过三维噪声和光线步进形成具有视差的体积云。',
  parameters: ['coverage', 'baseHeight', 'topHeight', 'scale', 'speed', 'windDirection', 'steps'],
  codeText: `const cloud = new WeatherEffects.CloudEffect(viewer, {
  intensity: 1,
  coverage: 0.52,
  baseHeight: 4800,
  topHeight: 8800,
  scale: 1,
  speed: 0.55,
  windDirection: 35,
  maxDistance: 160000,
  steps: 72,
  color: '#f1f4f6e6',
})

return cloud`,
}
