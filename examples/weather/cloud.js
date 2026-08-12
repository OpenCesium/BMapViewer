export default {
  id: 'cloud',
  name: 'CloudEffect',
  title: '动态云层',
  code: 'CLOUD',
  summary: '分形噪声形成屏幕空间动态云带，支持云量、高度、尺度和流速。',
  parameters: ['intensity', 'coverage', 'altitude', 'scale', 'speed'],
  codeText: `const cloud = new WeatherEffects.CloudEffect(viewer, {
  intensity: 0.75,
  coverage: 0.58,
  altitude: 0.66,
  scale: 3.8,
  speed: 0.65,
})

return cloud`,
}
