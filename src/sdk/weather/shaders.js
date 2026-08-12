// 雨、雪、雾的屏幕空间算法参考 Cesium-Examples/weatherEffects.js，
// 已重写为 WebGL 2 语法并将方向、速度、密度、距离等常量改为可配置 uniform。
export const rainShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float size;
uniform float angle;
uniform float wind;
uniform vec4 tint;
in vec2 v_textureCoordinates;

float bmvRainHash(float value) {
  return fract(sin(value * 133.3) * 13.13);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0 * speed;
  vec2 resolution = czm_viewport.zw;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float radiansAngle = radians(angle);
  float sineAngle = sin(radiansAngle);
  float cosineAngle = cos(radiansAngle);
  uv *= mat2(cosineAngle, -sineAngle, sineAngle, cosineAngle);
  uv.x += time * wind * 0.05;
  uv *= length(uv + vec2(0.0, 4.9)) * 0.3 + 1.0;
  float velocity = 1.0 - sin(bmvRainHash(floor(uv.x * 100.0 * density)) * 2.0);
  float width = clamp(size, 0.1, 3.0) * 0.05;
  float threshold = 1.0 - width;
  float streak = clamp(
    abs(sin(20.0 * time * velocity + uv.y * (5.0 / (2.0 + velocity)))) - threshold,
    0.0,
    1.0
  ) / max(width, 0.0001);
  vec3 rainColor = tint.rgb * velocity * streak;
  float blend = clamp(intensity, 0.0, 1.0) * tint.a;
  out_FragColor = vec4(mix(sceneColor.rgb, rainColor, blend), sceneColor.a);
}
`

// 雷雨中的闪电算法参考用户提供的 Cesium 后处理实现。
// 仅进行 WebGL 2 语法适配和命名隔离，核心噪声、分形迭代与闪电路径计算保持一致。
export const rainLightningShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float enabled;
uniform float fallInterval;
uniform float mixFactor;
in vec2 v_textureCoordinates;

float bmvLightningHash(float value) {
  return fract(21654.6512 * sin(385.51 * value));
}

float bmvLightningHash(vec2 point) {
  return fract(1654.65157 * sin(15.5134763 * point.x + 45.5173247 * point.y + 5.21789));
}

vec2 bmvLightningHash2(vec2 point) {
  return vec2(
    bmvLightningHash(point * 0.754),
    bmvLightningHash(1.5743 * point + 4.5476351)
  );
}

vec2 bmvLightningNoise2(vec2 position) {
  const vec2 add = vec2(1.0, 0.0);
  vec2 cell = floor(position);
  vec2 local = fract(position);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(bmvLightningHash2(cell), bmvLightningHash2(cell + add.xy), local.x),
    mix(bmvLightningHash2(cell + add.yx), bmvLightningHash2(cell + add.xx), local.x),
    local.y
  );
}

vec2 bmvLightningFbm2(vec2 position) {
  vec2 result = vec2(0.0);
  float amplitude = 1.0;
  for (int index = 0; index < 8; index++) {
    result += bmvLightningNoise2(position) * amplitude;
    position *= 2.0;
    amplitude *= 0.5;
  }
  return result;
}

float bmvLightningSegmentDistance(vec2 segment, vec2 point) {
  float divisor = max(dot(segment, segment), 0.000001);
  float projection = clamp(dot(point, segment) / divisor, -0.2, 1.0);
  return length(point - segment * projection);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  if (enabled < 0.5) {
    out_FragColor = sceneColor;
    return;
  }

  vec2 pixel = gl_FragCoord.xy;
  float interval = clamp(fallInterval, 0.01, 1.0);
  float time = float(czm_frameNumber) * interval * clamp(interval * 0.1, 0.01, 0.1);
  vec2 point = pixel / czm_viewport.zw;
  vec2 direction;
  vec2 target = vec2(1.0, -1.0);
  float cloud = 0.0;

  if (point.y >= 0.0) {
    cloud = (1.0 - bmvLightningFbm2((point + 0.2) * point.y + 0.1 * time).x) * point.y;
  } else {
    cloud = (1.0 - bmvLightningFbm2(point + 0.2 + 0.1 * time).x) * point.y * point.y;
  }

  vec3 lightningColor = vec3(0.0);
  vec3 cloudColor = cloud * vec3(0.3, 0.5, 1.0);
  float minimumDistance = 100000.0;
  float eventSeed = bmvLightningHash(floor(5.0 * time));
  target += 4.0 * bmvLightningHash2(target + eventSeed) - 1.5;

  if (bmvLightningHash(eventSeed + 2.3) > 0.6) {
    for (int index = 0; index < 100; index++) {
      vec2 targetDelta = target - point;
      direction = 0.05 * (vec2(-0.5, -1.0) + bmvLightningHash2(vec2(float(index), eventSeed)));
      float distanceToSegment = bmvLightningSegmentDistance(direction, targetDelta);
      minimumDistance = min(minimumDistance, distanceToSegment);
      target -= direction;
      float glow = exp(-1.2 * distanceToSegment) + exp(-55.0 * minimumDistance);
      lightningColor = glow * vec3(0.7, 0.8, 1.0);
    }
  }

  lightningColor += cloudColor;
  float blend = clamp(mixFactor, 0.0, 1.0);
  out_FragColor = vec4(mix(sceneColor.rgb, lightningColor, blend), sceneColor.a);
}
`

export const snowShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float size;
uniform float angle;
uniform float drift;
uniform vec4 tint;
in vec2 v_textureCoordinates;

float bmvSnow(vec2 uv, float scale, float time, vec2 direction) {
  float layerScale = scale * density;
  float verticalFade = 1.0 - smoothstep(0.0, 1.0, -uv.y * (layerScale / 10.0));
  if (verticalFade < 0.1) return 0.0;

  uv += direction * time * 3.16227766 / layerScale;
  uv.x += sin(uv.y + time * 0.5) * drift / layerScale;
  uv *= layerScale;

  vec2 cell = floor(uv);
  vec2 local = fract(uv);
  vec2 point = vec2(0.0);
  point = 0.5 + 0.35 * sin(
    11.0 * fract(sin((cell + point + layerScale) * mat2(7.0, 3.0, 6.0, 5.0)) * 5.0)
  ) - local;
  float distanceToFlake = length(point);
  float flake = smoothstep(
    0.0,
    distanceToFlake,
    sin(local.x + local.y) * 0.01 * size
  );
  return flake * verticalFade;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  vec2 resolution = czm_viewport.zw;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float radiansAngle = radians(angle);
  vec2 direction = vec2(sin(radiansAngle), cos(radiansAngle));
  float time = float(czm_frameNumber) / 60.0 * speed;
  float snow = 0.0;
  snow += bmvSnow(uv, 10.0, time, direction);
  snow += bmvSnow(uv, 8.0, time, direction);
  snow += bmvSnow(uv, 6.0, time, direction);
  snow += bmvSnow(uv, 5.0, time, direction);
  vec3 snowColor = tint.rgb * snow;
  float blend = clamp(intensity, 0.0, 1.0) * tint.a;
  out_FragColor = vec4(mix(sceneColor.rgb, snowColor, blend), sceneColor.a);
}
`

export const fogShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float intensity;
uniform float nearDistance;
uniform float farDistance;
uniform float density;
uniform float skyAmount;
uniform vec4 fogColor;
in vec2 v_textureCoordinates;

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  float fogFactor = skyAmount;
  if (depth < 0.999999) {
    vec4 eyePosition = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    float distanceToCamera = length(eyePosition.xyz);
    float rangeFog = smoothstep(nearDistance, max(farDistance, nearDistance + 1.0), distanceToCamera);
    fogFactor = 1.0 - exp(-rangeFog * density * 2.0);
  }
  fogFactor = clamp(fogFactor * intensity, 0.0, fogColor.a);
  out_FragColor = vec4(mix(sceneColor.rgb, fogColor.rgb, fogFactor), sceneColor.a);
}
`

export const sandstormShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float density;
uniform float speed;
uniform float wind;
uniform vec4 sandColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float bmvNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float a = bmvHash(cell);
  float b = bmvHash(cell + vec2(1.0, 0.0));
  float c = bmvHash(cell + vec2(0.0, 1.0));
  float d = bmvHash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  vec2 uv = v_textureCoordinates;
  vec2 flow = vec2(time * speed * (0.12 + wind * 0.08), time * speed * 0.025);
  float haze = bmvNoise(uv * 4.0 + flow);
  haze += bmvNoise(uv * 13.0 + flow * 2.7) * 0.45;
  float grain = bmvHash(gl_FragCoord.xy + time * 37.0);
  float dust = clamp((haze * 0.68 + grain * 0.32) * density, 0.0, 1.0);
  float mixAmount = clamp(intensity * (0.38 + dust * 0.42), 0.0, sandColor.a);
  vec3 desaturated = mix(sceneColor.rgb, vec3(dot(sceneColor.rgb, vec3(0.299, 0.587, 0.114))), intensity * 0.32);
  out_FragColor = vec4(mix(desaturated, sandColor.rgb, mixAmount), sceneColor.a);
}
`

export const cloudShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float coverage;
uniform float scale;
uniform float speed;
uniform float altitude;
uniform vec4 cloudColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float bmvNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(bmvHash(cell), bmvHash(cell + vec2(1.0, 0.0)), local.x),
    mix(bmvHash(cell + vec2(0.0, 1.0)), bmvHash(cell + vec2(1.0, 1.0)), local.x),
    local.y
  );
}

float bmvFbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.55;
  for (int index = 0; index < 5; index++) {
    value += amplitude * bmvNoise(p);
    p = p * 2.03 + vec2(7.1, 3.7);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  float aspect = czm_viewport.z / max(czm_viewport.w, 1.0);
  vec2 uv = v_textureCoordinates * vec2(aspect, 1.0);
  vec2 flow = vec2(time * speed * 0.025, time * speed * 0.006);
  float field = bmvFbm(uv * scale + flow);
  float threshold = mix(0.82, 0.28, coverage);
  float cloud = smoothstep(threshold, threshold + 0.22, field);
  float center = clamp(altitude, 0.15, 0.92);
  float band = 1.0 - smoothstep(0.28, 0.64, abs(v_textureCoordinates.y - center));
  cloud *= band * intensity * cloudColor.a;
  vec3 shadowed = sceneColor.rgb * (1.0 - cloud * 0.18);
  out_FragColor = vec4(mix(shadowed, cloudColor.rgb, cloud), sceneColor.a);
}
`

export const lightningShader = /* glsl */ `
uniform sampler2D colorTexture;
uniform float intensity;
uniform float frequency;
uniform float brightness;
uniform float width;
uniform vec4 flashColor;
in vec2 v_textureCoordinates;

float bmvHash(vec2 p) {
  return fract(sin(dot(p, vec2(91.7, 137.3))) * 43758.5453);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = float(czm_frameNumber) / 60.0;
  float eventTime = time * max(frequency, 0.01);
  float eventId = floor(eventTime);
  float phase = fract(eventTime);
  float chance = step(0.38, bmvHash(vec2(eventId, 4.7)));
  float pulse = exp(-phase * 22.0) + exp(-abs(phase - 0.18) * 42.0) * 0.55;
  pulse *= chance * intensity;

  vec2 uv = v_textureCoordinates;
  float origin = 0.25 + bmvHash(vec2(eventId, 9.2)) * 0.5;
  float path = origin
    + sin(uv.y * 25.0 + eventId) * 0.025
    + sin(uv.y * 63.0 + eventId * 2.3) * 0.012;
  float bolt = 1.0 - smoothstep(width * 0.25, width, abs(uv.x - path));
  bolt *= smoothstep(0.08, 0.28, uv.y) * (1.0 - smoothstep(0.72, 1.0, uv.y));
  float branchPath = path + (0.58 - uv.y) * 0.22;
  float branch = 1.0 - smoothstep(width * 0.18, width * 0.65, abs(uv.x - branchPath));
  branch *= smoothstep(0.34, 0.5, uv.y) * (1.0 - smoothstep(0.56, 0.72, uv.y));
  float lightning = clamp((bolt + branch * 0.55) * pulse * brightness, 0.0, 1.0);
  float flash = clamp(pulse * brightness * 0.22, 0.0, 0.82);
  vec3 flashed = mix(sceneColor.rgb, flashColor.rgb, flash * flashColor.a);
  out_FragColor = vec4(mix(flashed, flashColor.rgb, lightning), sceneColor.a);
}
`
