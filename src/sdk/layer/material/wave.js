/**
 * 水波纹材质
 */
import * as Cesium from 'cesium'

const MATERIAL_TYPE = 'CircleWaveMaterial'
let registered = false

export function registerCircleWaveMaterial() {
    if (registered) return
    if (!Cesium.Material || !Cesium.Material._materialCache) return

    Cesium.Material._materialCache.addMaterial(MATERIAL_TYPE, {
        fabric: {
            type: MATERIAL_TYPE,
            uniforms: {
                color: Cesium.Color.YELLOW.clone(),
                time: 0,
                count: 2,
                gradient: 1
            },
            source: `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          czm_material material = czm_getDefaultMaterial(materialInput);
          material.diffuse = 1.5 * color.rgb;

          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5));
          float per = fract(time);

          if (dis > 0.5) discard;

          float perDis = 0.5 / count;
          float bl = 0.0;

          for (int i = 0; i < 10; i++) {
            if (float(i) <= count) {
              float disNum = perDis * float(i) - dis + per / count;
              if (disNum > 0.0 && disNum < perDis) {
                bl = 1.0 - disNum / perDis;
              }
            }
          }

          material.alpha = pow(bl, gradient);
          return material;
        }
      `
        },
        translucent: () => true
    })

    registered = true
}

export class CircleWaveMaterialProperty {
    constructor(options = {}) {
        this._definitionChanged = new Cesium.Event()
        this.color = Cesium.Color.fromCssColorString(options.color || '#FFCB33')
        this.duration = options.duration || 3000
        this.count = options.count || 3
        this.gradient = options.gradient ?? 0.1
        this._startTime = Date.now()
    }

    get isConstant() { return false }
    get definitionChanged() { return this._definitionChanged }

    getType() {
        return MATERIAL_TYPE
    }

    getValue(time, result = {}) {
        result.color = Cesium.Color.clone(this.color, result.color)   // ✅ 关键修复
        result.time = ((Date.now() - this._startTime) % this.duration) / this.duration
        result.count = this.count
        result.gradient = 1 + 10 * (1 - this.gradient)
        return result
    }

    equals(other) {
        return this === other
    }
}
