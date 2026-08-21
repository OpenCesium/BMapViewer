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
uniform float depthMode;
uniform float depthStart;
uniform float depthRange;
uniform float nearDistance;
uniform float farDistance;
uniform float density;
uniform float skyAmount;
uniform vec4 fogColor;
in vec2 v_textureCoordinates;

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  float fogFactor;

  if (depthMode > 0.5) {
    // Reference depth-fog formula: f = (depth - 0.22) / 0.2.
    // depthStart and depthRange expose the two constants as runtime options.
    fogFactor = (depth - depthStart) / max(depthRange, 0.000001);
    fogFactor = clamp(fogFactor * density, 0.0, 1.0);
    if (depth >= 0.999999) {
      fogFactor = skyAmount;
    }
  } else if (depth < 0.999999) {
    vec4 eyePosition = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    float distanceToCamera = length(eyePosition.xyz);
    float rangeFog = smoothstep(nearDistance, max(farDistance, nearDistance + 1.0), distanceToCamera);
    fogFactor = 1.0 - exp(-rangeFog * density * 2.0);
  } else {
    fogFactor = skyAmount;
  }

  fogFactor = clamp(fogFactor * intensity * fogColor.a, 0.0, 1.0);
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
uniform sampler2D depthTexture;
uniform float intensity;
uniform float coverage;
uniform float baseHeight;
uniform float topHeight;
uniform float planetRadius;
uniform float scale;
uniform float speed;
uniform vec3 windDirectionWC;
uniform float maxDistance;
uniform float marchSteps;
uniform vec4 cloudColor;
in vec2 v_textureCoordinates;

const int BMV_MAX_CLOUD_STEPS = 72;

float bmvCloudHash(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float bmvCloudNoise(vec3 p) {
  vec3 cell = floor(p);
  vec3 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float n000 = bmvCloudHash(cell + vec3(0.0, 0.0, 0.0));
  float n100 = bmvCloudHash(cell + vec3(1.0, 0.0, 0.0));
  float n010 = bmvCloudHash(cell + vec3(0.0, 1.0, 0.0));
  float n110 = bmvCloudHash(cell + vec3(1.0, 1.0, 0.0));
  float n001 = bmvCloudHash(cell + vec3(0.0, 0.0, 1.0));
  float n101 = bmvCloudHash(cell + vec3(1.0, 0.0, 1.0));
  float n011 = bmvCloudHash(cell + vec3(0.0, 1.0, 1.0));
  float n111 = bmvCloudHash(cell + vec3(1.0, 1.0, 1.0));
  float nearPlane = mix(mix(n000, n100, local.x), mix(n010, n110, local.x), local.y);
  float farPlane = mix(mix(n001, n101, local.x), mix(n011, n111, local.x), local.y);
  return mix(nearPlane, farPlane, local.z);
}

vec2 bmvRaySphere(vec3 origin, vec3 direction, float radius) {
  float projected = dot(origin, direction);
  float discriminant = projected * projected - (dot(origin, origin) - radius * radius);
  if (discriminant < 0.0) return vec2(-1.0);
  float root = sqrt(discriminant);
  return vec2(-projected - root, -projected + root);
}

bool bmvCloudShellInterval(
  vec3 origin,
  vec3 direction,
  float innerRadius,
  float outerRadius,
  out float startDistance,
  out float endDistance
) {
  vec2 outerHit = bmvRaySphere(origin, direction, outerRadius);
  if (outerHit.y <= 0.0) return false;

  vec2 innerHit = bmvRaySphere(origin, direction, innerRadius);
  float cameraRadius = length(origin);

  if (cameraRadius < innerRadius) {
    if (innerHit.y <= 0.0) return false;
    startDistance = innerHit.y;
    endDistance = outerHit.y;
  } else if (cameraRadius > outerRadius) {
    startDistance = max(outerHit.x, 0.0);
    endDistance = outerHit.y;
    if (innerHit.x > startDistance) {
      endDistance = min(endDistance, innerHit.x);
    }
  } else {
    startDistance = 0.0;
    endDistance = outerHit.y;
    if (innerHit.x > 0.0) {
      endDistance = min(endDistance, innerHit.x);
    }
  }

  return endDistance > startDistance;
}

float bmvCloudDensity(vec3 positionWC, vec3 windOffset, out float heightRatio) {
  float height = length(positionWC) - planetRadius;
  heightRatio = (height - baseHeight) / max(topHeight - baseHeight, 1.0);
  if (heightRatio <= 0.0 || heightRatio >= 1.0) return 0.0;

  // The following shape model follows the reference implementation: a broad
  // weather field chooses the cloud type, while higher-frequency noise erodes
  // the body into isolated cumulus volumes.
  vec3 noisePosition = positionWC * (0.002 * scale) + windOffset;
  float shape = bmvCloudNoise(noisePosition * 0.30);
  float shapeHeight = bmvCloudNoise(noisePosition * 0.05);
  float erosion = bmvCloudNoise(noisePosition) * 0.50;
  erosion += bmvCloudNoise(noisePosition * 2.11 + vec3(3.7, 9.2, 1.4)) * 0.20;

  float cumulonimbus = clamp((shapeHeight - 0.5) * 2.0, 0.0, 1.0);
  cumulonimbus *= clamp(1.0 - pow(heightRatio - 0.5, 2.0) * 4.0, 0.0, 1.0);
  float cumulus = clamp(1.0 - pow(heightRatio - 0.25, 2.0) * 25.0, 0.0, 1.0);
  cumulus *= shapeHeight;
  float stratoCumulus = clamp(1.0 - pow(heightRatio - 0.12, 2.0) * 60.0, 0.0, 1.0);
  stratoCumulus *= 1.0 - shapeHeight;

  float cloudType = clamp(stratoCumulus + cumulus + cumulonimbus, 0.0, 1.0);
  float density = cloudType * 2.0 * coverage;
  density -= 1.0 - shape;
  density -= erosion;
  return clamp(density, 0.0, 1.0) * intensity;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float depth = czm_readDepth(depthTexture, v_textureCoordinates);
  bool isSky = depth <= 0.0 || depth >= 0.999999;
  if (isSky) depth = 1.0;

  vec4 eyePosition = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
  vec4 worldPosition = czm_inverseView * eyePosition;
  vec3 targetWC = worldPosition.xyz / max(worldPosition.w, 0.000001);
  vec3 rayDirection = normalize(targetWC - czm_viewerPositionWC);
  float sceneDistance = isSky
    ? maxDistance
    : min(length(targetWC - czm_viewerPositionWC), maxDistance);

  float cloudStart;
  float cloudEnd;
  float innerRadius = planetRadius + baseHeight;
  float outerRadius = planetRadius + topHeight;
  if (!bmvCloudShellInterval(
    czm_viewerPositionWC,
    rayDirection,
    innerRadius,
    outerRadius,
    cloudStart,
    cloudEnd
  )) {
    out_FragColor = sceneColor;
    return;
  }

  cloudEnd = min(cloudEnd, sceneDistance);
  if (cloudEnd <= cloudStart) {
    out_FragColor = sceneColor;
    return;
  }

  float stepCount = clamp(floor(marchSteps + 0.5), 16.0, float(BMV_MAX_CLOUD_STEPS));
  float stepLength = (cloudEnd - cloudStart) / stepCount;
  float jitter = bmvCloudHash(vec3(gl_FragCoord.xy, float(czm_frameNumber))) - 0.5;
  float distanceAlongRay = cloudStart + stepLength * (0.5 + jitter * 0.35);
  float time = float(czm_frameNumber) / 60.0;
  vec3 windOffset = normalize(windDirectionWC) * time * speed * 0.035;
  vec3 sunDirection = normalize(czm_sunPositionWC);
  vec4 cloudAccumulation = vec4(0.0);

  for (int index = 0; index < BMV_MAX_CLOUD_STEPS; index++) {
    if (float(index) >= stepCount || cloudAccumulation.a > 0.985) break;
    vec3 samplePosition = czm_viewerPositionWC + rayDirection * distanceAlongRay;
    float heightRatio;
    float density = bmvCloudDensity(samplePosition, windOffset, heightRatio);

    if (density > 0.001) {
      float sampleAlpha = 1.0 - exp(-density * stepLength * 0.00125);
      sampleAlpha *= cloudColor.a;
      vec3 upDirection = normalize(samplePosition);
      float sunLight = max(dot(upDirection, sunDirection), 0.0);
      float silverLining = pow(max(dot(rayDirection, sunDirection), 0.0), 10.0);
      float heightLight = mix(0.62, 1.08, heightRatio);
      float lighting = heightLight + sunLight * 0.28 + silverLining * 0.42;
      vec3 sampleColor = cloudColor.rgb * lighting;
      float remainingAlpha = 1.0 - cloudAccumulation.a;
      cloudAccumulation.rgb += sampleColor * sampleAlpha * remainingAlpha;
      cloudAccumulation.a += sampleAlpha * remainingAlpha;
    }

    distanceAlongRay += stepLength;
  }

  vec3 composited = sceneColor.rgb * (1.0 - cloudAccumulation.a) + cloudAccumulation.rgb;
  out_FragColor = vec4(composited, sceneColor.a);
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
