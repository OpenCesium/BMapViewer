export default {
  id: 'rain',
  name: 'RainEffect',
  title: '降雨',
  code: 'RAIN',
  summary: '仅展示细雨线效果，支持方向、粗细、速度、密度和风偏控制。',
  parameters: ['intensity', 'density', 'speed', 'size', 'angle', 'wind', 'color'],
  codeText: `const rain = new WeatherEffects.RainEffect(viewer, {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: -22.9183,
  wind: 0,
  color: '#99b3ccff',
})

return rain`,
}
