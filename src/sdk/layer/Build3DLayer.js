/**
 * 3D楼宇图层类 - 用于加载和管理3D Tileset楼宇数据
 * @class Build3DLayer
 */
import * as Cesium from 'cesium'
// import {GUI} from 'lil-gui'
class Build3DLayer {
    /**
     * 创建3D楼宇图层实例
     * @param {Cesium.Viewer} viewer - Cesium Viewer实例
     * @param {Object} config - 图层配置
     * @param {string} config.url - 3D Tileset的URL
     * @param {boolean} [config.show=true] - 是否显示图层
     */
    constructor(viewer, config) {
        if (!viewer) {
            throw new Error("Viewer is required.");
        }

        if (!config || !config.url) {
            throw new Error("URL is required in config.");
        }

        this.viewer = viewer;
        this.config = {
            ...config
        };

        this.tileset = null;
        this.name = this.config.name || 'Build3DLayer';
    }

    /**
     * 加载3D Tileset
     * @returns {Promise<Cesium.Cesium3DTileset>}
     */
    async load(url) {

        try {
            // 创建3D Tileset
            this.tileset = await Cesium.Cesium3DTileset.fromUrl(url || this.config.url, {
                show: this.config.show||true,
                ...this.config.options // 允许传入其他Cesium3DTileset选项
            });

            this.tileset.tileLoad.addEventListener((tile) => {
                // 触发瓦片加载事件
                const batchTable = tile.content?.batchTable;
                if (!batchTable) return;
                const tileData = batchTable.featuresLength;
                for (let i = 0; i < tileData; i++) {
                    const buildingId = batchTable.getProperty(i,'id');// 获取楼宇 ID
                    if(this.config.alertList && this.config.alertList.length>0 && this.config.alertKey){
                        let findObj = {}
                        if(this.config.alertList.some(item=>{
                            if(buildingId === String(item.id)){
                                findObj = item
                                return true
                            }
                        })){
                            batchTable.setProperty(i,this.config.alertKey, findObj[this.config.alertKey]);
                        }
                    }
                }

            });
            console.log(this.tileset,'this.tileset')
            // 添加到场景
            this.viewer.scene.primitives.add(this.tileset);

            let customShader = new Cesium.CustomShader({
                // 不考虑光照模型
                lightingModel: Cesium.LightingModel.UNLIT,
                fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float _baseHeight = 20.0; // 物体的基础高度
            float _heightRange = 100.0; // 高亮的范围
            float _glowRange = 50.0; // 光环的移动范围(高度)
            
            float vtxf_height = fsInput.attributes.positionMC.z - _baseHeight;

            // 计算高亮强度，移除动态时间因素
            float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
            float staticGlowIntensity = 0.5; // 固定的光强度（可以根据需要调整）

            // 根据高度计算 diffuse 值
            material.diffuse *= vec3(vtxf_h * staticGlowIntensity);

            // 确保高于一定高度的对象显示光环效果
            if (vtxf_h > 0.01) {
                material.diffuse += material.diffuse * (1.0 - step(0.01, vtxf_h));
            }
        }
    `,
            });

            // 将自定义着色器应用到 tileset
            this.tileset.customShader = customShader;



            console.log(`loaded successfully.`);
            return this.tileset;

        } catch (error) {
            console.error(`Failed to load:`, error);
            throw error;
        }
    }
    setStyle(style) {
        let conditions = style || []
        if (this.tileset) {
            this.tileset.style = new Cesium.Cesium3DTileStyle({
                color: {
                    conditions: conditions
                }
            });
        }
    }
    /**
     * 设置3D Tileset的着色器
     * @param obj
     */
    setShader(obj) {
        const config = {
            sweepColor: obj?.sweepColor || '#00aeeb',
            minColor: obj?.minColor || '#09090EFF',
            maxColor: obj?.maxColor || '#0080FFFF',
            sweepWidth: obj?.sweepWidth || 0.02,
            modelHeight: obj?.modelHeight || 100,
            heightOffset: obj?.heightOffset || 0,
            minInterval: obj?.minInterval || 0.0,
            maxInterval: obj?.maxInterval || 1.0,
            speed: obj?.speed || 2.0,
            active: obj?.active || true,
        }
        // 创建自定义着色器
        const uniforms = {
            u_sweep_color: { value: Cesium.Color.fromCssColorString(config.sweepColor), type: Cesium.UniformType.VEC3 },
            u_mix_color1: { value: Cesium.Color.fromCssColorString(config.minColor), type: Cesium.UniformType.VEC3 },
            u_mix_color2: { value: Cesium.Color.fromCssColorString(config.maxColor), type: Cesium.UniformType.VEC3 },
            u_sweep_width: { value: config.sweepWidth, type: Cesium.UniformType.FLOAT },
            u_time: { value: 0, type: Cesium.UniformType.FLOAT },
            u_model_height: { value: config.modelHeight, type: Cesium.UniformType.FLOAT },
            u_height_offset: { value: config.heightOffset, type: Cesium.UniformType.FLOAT },
            u_min_interval : { value: config.minInterval, type: Cesium.UniformType.FLOAT },
            u_max_interval : { value: config.maxInterval, type: Cesium.UniformType.FLOAT },
            u_speed: { value: config.speed, type: Cesium.UniformType.FLOAT },
        }
       /* const gui = new GUI()
        gui.addColor({ sweepColor: '#2ba7ff' }, 'sweepColor').onChange(v => {
            const hex = v.replace('#', '')
            const r = parseInt(hex.substring(0, 2), 16)
            const g = parseInt(hex.substring(2, 4), 16)
            const b = parseInt(hex.substring(4, 6), 16)
            uniforms.u_sweep_color.value = Cesium.Color.fromBytes(r, g, b, 255)
        })

        gui.addColor({ mixColor1: '#09090e' }, 'mixColor1').onChange(v => {
            const hex = v.replace('#', '')
            const r = parseInt(hex.substring(0, 2), 16)
            const g = parseInt(hex.substring(2, 4), 16)
            const b = parseInt(hex.substring(4, 6), 16)
            uniforms.u_mix_color1.value = Cesium.Color.fromBytes(r, g, b, 255)
        })
        gui.addColor({ mixColor2: '#0080ff' }, 'mixColor2').onChange(v => {
            const hex = v.replace('#', '')
            const r = parseInt(hex.substring(0, 2), 16)
            const g = parseInt(hex.substring(2, 4), 16)
            const b = parseInt(hex.substring(4, 6), 16)
            uniforms.u_mix_color2.value = Cesium.Color.fromBytes(r, g, b, 255)
        })

        gui.add({ sweepWidth: 0.02 }, 'sweepWidth', 0.0001, 1.0).onChange(v => {
            uniforms.u_sweep_width.value = v
        })
        gui.add({ modelHeight: 600 }, 'modelHeight', 10, 2000).name('模型高度').onChange(v =>  uniforms.u_model_height.value = v)
        gui.add({ heightOffset: 0.0 }, 'heightOffset', -50, 50).name('高度偏移').onChange(v => uniforms.u_height_offset.value = v)
        gui.add({ maxInterval: 1.0 }, 'maxInterval', 0.0, 10.0).name('最大间隔').onChange(v => uniforms.u_max_interval.value = v)
        gui.add({ speed: 2.0 }, 'speed', 0.01, 5.0).name('速度').onChange(v => uniforms.u_speed.value = v)*/
        const customShader = new Cesium.CustomShader({
            //不考虑光照模型
            // lightingModel: Cesium.LightingModel.PBR,
            vertexShaderText: `void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            float adjustedZ = vsInput.attributes.positionMC.z + u_height_offset;
            float normalizedHeight = clamp(adjustedZ / u_model_height, u_min_interval, u_max_interval);
            float enhancedHeight = sqrt(normalizedHeight);
            v_uv = vec2(enhancedHeight, enhancedHeight);
        }`,
            fragmentShaderText: `float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float gradientFactor = smoothstep(0.0, 1.0, v_uv.y);
            vec3 originColor = mix(u_mix_color1, u_mix_color2, gradientFactor);
            float t = fract(u_time * u_speed) * 2.;
            vec2 absUv = abs(v_uv - t);
            
            vec2 st = v_uv * 15.;
            vec2 ipos = floor(st + u_time * 5.);
            float r = random(ipos) + .2;
            
            float d = clamp(distance(0., absUv.y) / u_sweep_width, 0., 1.);
            float diffuse = clamp(-dot(czm_sunDirectionEC, fsInput.attributes.normalEC), 0., .45);
            
            vec3 color = mix(u_sweep_color * r + u_sweep_color * .8, originColor, d);
            material.diffuse = color;
            material.emissive = vec3(diffuse) * (1. - d);
        }`,
            uniforms,
            varyings: { v_uv: Cesium.VaryingType.VEC2 }
        })
        console.log(performance.now(),'performance.now()')
        config.active && this.viewer.scene.preRender.addEventListener(function(scene, time) {
            customShader.setUniform("u_time", performance.now() * 0.0001);
        });

// 将自定义着色器应用到tileset
        this.tileset.customShader = customShader;
    }
    /**
     * 显示图层
     */
    show() {
        if (this.tileset) {
            this.tileset.show = true;
        }
        this.config.show = true;
    }

    /**
     * 隐藏图层
     */
    hide() {
        if (this.tileset) {
            this.tileset.show = false;
        }
        this.config.show = false;
    }

    /**
     * 销毁图层，释放资源
     */
    clearLayer() {
        // 从场景中移除
        if (this.tileset) {
            this.viewer.scene.primitives.remove(this.tileset);
            this.tileset = null;
        }
        console.log(`Build3DLayer destroyed.`);
    }
    /**
     * 销毁
     */
    destroy() {
        this.clearLayer();
        this.viewer = null;
        this.config = null;
        this.tileset = null;
    }

}


export default Build3DLayer;
