import * as Cesium from 'cesium'

const MATERIAL_TYPE = 'PointRippleMaterial'
let registered = false

export function registerPointRippleMaterial() {
    if (registered) return
    if (!Cesium.Material || !Cesium.Material._materialCache) return

    Cesium.Material._materialCache.addMaterial(MATERIAL_TYPE, {
        fabric: {
            type: MATERIAL_TYPE,
            uniforms: {
                color: new Cesium.Color(1, 0, 0, 1),
                time: 1,
                speed: 1.0,
                innerFade: 1.5,   // 中心衰减强度
                ringWidth: 0.06  // 外圈宽度
            },
            source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);

          vec2 st = materialInput.st - 0.5;
          float dist = length(st) * 2.0;   // 0 ~ 1
          float t = fract(time * speed);

          if (dist > 1.0) discard;

          // 当前扩散半径
          float radius = t;

          // 外圈亮边
          float ring = smoothstep(radius, radius - ringWidth, dist);

          // 中心径向渐变（越靠近中心越透明）
          float centerFade = pow(dist, innerFade);

          float alpha = ring * centerFade;

          material.diffuse = color.rgb * 2.0;
          material.alpha = alpha * color.a;

          return material;
        }
      `
        },
        translucent: () => true
    })

    registered = true
}

export class PointRippleMaterialProperty {
    constructor(options = {}) {
        this._definitionChanged = new Cesium.Event()
        this.color = Cesium.Color.fromCssColorString(options.color || '#ff3b30')
        this.duration = options.duration || 2000
        this.speed = options.speed ?? 1.0
        this.innerFade = options.innerFade ?? 1.5
        this.ringWidth = options.ringWidth ?? 0.06
        this._startTime = Date.now()
    }

    get isConstant() { return false }
    get definitionChanged() { return this._definitionChanged }

    getType() {
        return MATERIAL_TYPE
    }

    getValue(time, result = {}) {
        result.color = this.color
        result.time = ((Date.now() - this._startTime) % this.duration) / this.duration
        result.speed = this.speed
        result.innerFade = this.innerFade
        result.ringWidth = this.ringWidth
        return result
    }

    equals(other) {
        return this === other
    }
}
