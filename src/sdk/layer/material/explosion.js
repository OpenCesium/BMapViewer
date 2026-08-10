/**
 * 爆炸效果材质
 */
import * as Cesium from 'cesium'

const MATERIAL_TYPE = 'CircleExplosionMaterial'
let registered = false

export function registerCircleExplosionMaterial() {
    if (registered) return
    if (!Cesium.Material || !Cesium.Material._materialCache) return

    Cesium.Material._materialCache.addMaterial(MATERIAL_TYPE, {
        fabric: {
            type: MATERIAL_TYPE,
            uniforms: {
                color: Cesium.Color.RED.clone(),
                time: 0,
                speed: 1.0,
                fillAlpha: 0.25,
                edgeWidth: 0.03,
                waveWidth: 0.05
            },
            source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);

          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5));
          float t = fract(time * speed);

          // 圆半径
          float radius = 0.5;

          if (dis > radius) discard;

          // 底层填充
          float baseAlpha = fillAlpha * (1.0 - dis / radius);

          // 外圈亮边
          float edge = smoothstep(radius - edgeWidth, radius, dis);

          // 扩散波
          float waveRadius = t * radius;
          float wave = smoothstep(waveRadius - waveWidth, waveRadius, dis) *
                       (1.0 - smoothstep(waveRadius, waveRadius + waveWidth, dis));

          material.diffuse = color.rgb;

          material.alpha = baseAlpha + edge * 0.8 + wave;

          return material;
        }
      `
        },
        translucent: () => true
    })

    registered = true
}

export class CircleExplosionMaterialProperty {
    constructor(options = {}) {
        this._definitionChanged = new Cesium.Event()
        this.color = Cesium.Color.fromCssColorString(options.color || '#ff0000')
        this.duration = options.duration || 2000
        this.speed = options.speed || 1.0
        this.fillAlpha = options.fillAlpha ?? 0.25
        this.edgeWidth = options.edgeWidth ?? 0.03
        this.waveWidth = options.waveWidth ?? 0.05
        this._startTime = Date.now()
    }

    get isConstant() { return false }
    get definitionChanged() { return this._definitionChanged }

    getType() {
        return MATERIAL_TYPE
    }

    getValue(time, result = {}) {
        result.color = Cesium.Color.clone(this.color, result.color)
        result.time = ((Date.now() - this._startTime) % this.duration) / this.duration
        result.speed = this.speed
        result.fillAlpha = this.fillAlpha
        result.edgeWidth = this.edgeWidth
        result.waveWidth = this.waveWidth
        return result
    }

    equals(other) {
        return this === other
    }
}

