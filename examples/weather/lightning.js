export default {
  id: 'lightning',
  name: 'RainEffect · Lightning',
  title: '闪电',
  code: 'LIGHTNING',
  summary: '在 RainEffect 中开启 lightning，组合细雨、雷暴云层与程序化闪电。',
  parameters: ['intensity', 'density', 'speed', 'size', 'angle', 'wind', 'lightning', 'lightningMixFactor', 'lightningFallInterval', 'color'],
  codeText: `const thunderstorm = new WeatherEffects.RainEffect(viewer, {
  intensity: 0.5,
  density: 1,
  speed: 1,
  size: 1,
  angle: -22.9183,
  wind: 0,
  color: '#99b3ccff',
  lightning: true,
  lightningMixFactor: 0.35,
  lightningFallInterval: 0.8,
})

return thunderstorm`,
}
