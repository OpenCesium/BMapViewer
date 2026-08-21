export const DYNAMIC_WATER_VERTEX_SHADER = `
in vec3 position3DHigh;
in vec3 position3DLow;
in vec3 normal;
in vec3 tangent;
in vec3 bitangent;
in vec2 st;
in float batchId;

out vec3 v_positionEC;
out vec3 v_normalEC;
out vec3 v_tangentEC;
out vec3 v_bitangentEC;
out vec2 v_st;

uniform float u_vertexTime;
uniform float u_vertexWaveScale;
uniform float u_vertexWaveHeight;
uniform float u_vertexGeometryWaveHeight;
uniform float u_vertexChoppy;
uniform float u_vertexSpeed;
uniform float u_vertexNormalStrength;

float vertexHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vertexNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
        mix(vertexHash(i), vertexHash(i + vec2(1.0, 0.0)), u.x),
        mix(vertexHash(i + vec2(0.0, 1.0)), vertexHash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float vertexSeaOctave(vec2 uv, float choppy) {
    uv += vertexNoise(uv);
    vec2 wave = 1.0 - abs(sin(uv));
    vec2 swell = abs(cos(uv));
    wave = mix(wave, swell, wave);
    return pow(1.0 - pow(wave.x * wave.y, 0.65), choppy);
}

float vertexSeaHeight(vec2 uv) {
    float freq = 0.16;
    float amp = u_vertexWaveHeight;
    float choppy = u_vertexChoppy;
    float height = 0.0;
    float time = u_vertexTime * u_vertexSpeed;
    mat2 octaveMatrix = mat2(1.60, 1.20, -1.20, 1.60);

    uv.x *= 0.75;
    for (int i = 0; i < 5; i++) {
        float displacement = vertexSeaOctave((uv + time) * freq, choppy);
        displacement += vertexSeaOctave((uv - time) * freq, choppy);
        height += displacement * amp;
        uv = octaveMatrix * uv;
        freq *= 1.9;
        amp *= 0.22;
        choppy = mix(choppy, 1.0, 0.2);
    }
    return height;
}

void main() {
    v_st = st;
    vec3 positionRTE = czm_computePosition().xyz;
    vec2 centered = st * 2.0 - 1.0;
    vec2 waveUv = centered * u_vertexWaveScale;
    float macro = vertexNoise(
        waveUv * 0.055 + vec2(u_vertexTime * 0.018, -u_vertexTime * 0.012)
    );
    waveUv += vec2(macro * 1.7, -macro * 1.1);

    float height = vertexSeaHeight(waveUv) - (u_vertexWaveHeight * 1.05);
    float displacement = height * u_vertexGeometryWaveHeight;
    float epsilon = 0.055;
    float heightX = vertexSeaHeight(waveUv + vec2(epsilon, 0.0))
        - vertexSeaHeight(waveUv - vec2(epsilon, 0.0));
    float heightY = vertexSeaHeight(waveUv + vec2(0.0, epsilon))
        - vertexSeaHeight(waveUv - vec2(0.0, epsilon));
    vec3 objectNormal = normalize(
        normal
        - tangent * heightX * u_vertexNormalStrength * 0.16
        - bitangent * heightY * u_vertexNormalStrength * 0.16
    );

    vec3 displacedRTE = positionRTE + normal * displacement;
    vec4 position = vec4(displacedRTE, 1.0);
    v_positionEC = (czm_modelViewRelativeToEye * position).xyz;
    v_normalEC = normalize(czm_normal * objectNormal);
    v_tangentEC = normalize(czm_normal * tangent);
    v_bitangentEC = normalize(czm_normal * bitangent);
    gl_Position = czm_modelViewProjectionRelativeToEye * position;
}
`

export const DYNAMIC_WATER_FRAGMENT_SHADER = `
in vec3 v_positionEC;
in vec3 v_normalEC;
in vec3 v_tangentEC;
in vec3 v_bitangentEC;
in vec2 v_st;

uniform float u_time;
uniform float u_waveScale;
uniform float u_waveHeight;
uniform float u_choppy;
uniform float u_speed;
uniform float u_foam;
uniform float u_normalStrength;
uniform float u_fresnelPower;
uniform float u_specularStrength;
uniform float u_alpha;
uniform vec4 u_deepColor;
uniform vec4 u_shallowColor;
uniform vec4 u_foamColor;

float waterHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float waterNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
        mix(waterHash(i), waterHash(i + vec2(1.0, 0.0)), u.x),
        mix(waterHash(i + vec2(0.0, 1.0)), waterHash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float seaOctave(vec2 uv, float choppy) {
    uv += waterNoise(uv);
    vec2 wave = 1.0 - abs(sin(uv));
    vec2 swell = abs(cos(uv));
    wave = mix(wave, swell, wave);
    return pow(1.0 - pow(wave.x * wave.y, 0.65), choppy);
}

float seaHeight(vec2 uv) {
    float freq = 0.16;
    float amp = u_waveHeight;
    float choppy = u_choppy;
    float height = 0.0;
    float time = u_time * u_speed;
    mat2 octaveMatrix = mat2(1.60, 1.20, -1.20, 1.60);

    uv.x *= 0.75;
    for (int i = 0; i < 6; i++) {
        float displacement = seaOctave((uv + time) * freq, choppy);
        displacement += seaOctave((uv - time) * freq, choppy);
        height += displacement * amp;
        uv = octaveMatrix * uv;
        freq *= 1.9;
        amp *= 0.22;
        choppy = mix(choppy, 1.0, 0.2);
    }
    return height;
}

vec3 waterNormal(vec2 uv) {
    float epsilon = 0.045;
    float height = seaHeight(uv);
    float heightX = seaHeight(uv + vec2(epsilon, 0.0)) - height;
    float heightY = seaHeight(uv + vec2(0.0, epsilon)) - height;
    return normalize(vec3(
        -heightX * u_normalStrength,
        -heightY * u_normalStrength,
        epsilon
    ));
}

vec3 skyReflection(vec3 normalValue) {
    float up = clamp(normalValue.z * 0.5 + 0.5, 0.0, 1.0);
    return mix(
        vec3(0.54, 0.73, 0.86),
        vec3(0.06, 0.20, 0.31),
        pow(1.0 - up, 2.0)
    );
}

void main() {
    vec2 centered = v_st * 2.0 - 1.0;
    vec2 uv = centered * u_waveScale;
    float macro = waterNoise(
        uv * 0.055 + vec2(u_time * 0.018, -u_time * 0.012)
    );
    uv += vec2(macro * 1.7, -macro * 1.1);

    vec3 tangentSpaceNormal = waterNormal(uv);
    vec3 normalEC = normalize(v_normalEC);
    vec3 tangentEC = normalize(v_tangentEC);
    vec3 bitangentEC = normalize(v_bitangentEC);
    vec3 displacedNormalEC = normalize(
        tangentEC * tangentSpaceNormal.x
        + bitangentEC * tangentSpaceNormal.y
        + normalEC * (tangentSpaceNormal.z + 0.72)
    );

    float height = seaHeight(uv);
    float crest = smoothstep(0.58, 1.55, height) * u_foam;
    crest += smoothstep(0.72, 1.0, 1.0 - abs(tangentSpaceNormal.z)) * u_foam * 0.55;
    crest = clamp(crest, 0.0, 1.0);

    vec3 viewDirection = normalize(-v_positionEC);
    float fresnel = pow(
        1.0 - clamp(abs(dot(displacedNormalEC, viewDirection)), 0.0, 1.0),
        3.0
    );
    fresnel = clamp(fresnel * (0.55 + u_fresnelPower), 0.0, 1.0);

    vec3 base = mix(
        u_deepColor.rgb,
        u_shallowColor.rgb,
        clamp(height * 0.16 + 0.18 + macro * 0.12, 0.0, 1.0)
    );
    vec3 reflection = skyReflection(displacedNormalEC);
    vec3 lightDirection = normalize(czm_sunDirectionEC);
    float diffuse = pow(
        clamp(dot(displacedNormalEC, lightDirection) * 0.42 + 0.58, 0.0, 1.0),
        2.0
    );
    float sparkle = pow(
        max(dot(reflect(-lightDirection, displacedNormalEC), viewDirection), 0.0),
        72.0
    ) * u_specularStrength;
    float slopeGlint = pow(
        clamp(1.0 - abs(tangentSpaceNormal.z), 0.0, 1.0),
        3.0
    ) * u_specularStrength * 0.16;

    vec3 color = mix(base * (0.78 + diffuse * 0.30), reflection, fresnel);
    color += (sparkle + slopeGlint) * vec3(1.0, 0.94, 0.82);
    color = mix(color, u_foamColor.rgb, crest);
    color = czm_gammaCorrect(color);
    out_FragColor = vec4(color, clamp(u_alpha + crest * 0.14, 0.0, 1.0));
}
`
