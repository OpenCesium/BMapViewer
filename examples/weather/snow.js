export default {
  id: 'snow',
  name: 'SnowEffect',
  title: '降雪',
  code: 'SNOW',
  summary: '以参考着色器的四层雪花为默认效果，支持方向、粒径、速度、密度和飘移控制。',
  parameters: ['intensity', 'density', 'speed', 'angle', 'size', 'drift'],
  codeText: `const snow = new WeatherEffects.SnowEffect(viewer, {
  intensity: 0.5,
  density: 1,
  size: 1,
  speed: 1,
  angle: 18.4349,
  drift: 1,
})

return snow`,
}
