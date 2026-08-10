/**
 * 修改主题颜色
 * 推荐颜色
 * #648AE6FF、#2f62af、#648ae6
 */
export default class EarthColor {
    constructor(viewer) {
        this.viewModelBefore = {}
        this.beforeColorStr = []
        this.viewer = viewer
    }
    addColor(options) {
        const baseLayer = this.viewer.imageryLayers.get(0)
        this.viewModelBefore.brightness = baseLayer.brightness
        this.viewModelBefore.contrast = baseLayer.contrast
        this.viewModelBefore.hue = baseLayer.hue
        this.viewModelBefore.saturation = baseLayer.saturation
        this.viewModelBefore.gamma = baseLayer.gamma

        baseLayer.brightness = options.brightness || 0.6
        baseLayer.contrast = options.contrast || 1.8
        baseLayer.gamma = options.gamma || 0.3
        baseLayer.hue = options.hue || 1
        baseLayer.saturation = options.saturation || 0
        const baseFragShader = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
        const color = this.hexColorToRgba(options.filterRGB)
        for (let i = 0; i < baseFragShader.length; i++) {
            const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
            let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
            if (options.invertColor) {
                strT += `
                    color.r = 1.0 - color.r;
                    color.g = 1.0 - color.g;
                    color.b = 1.0 - color.b;
                    `
            }
            if (options.filterRGB.length > 0) {
                strT += `
                    color.r = color.r * ${color.red}.0/255.0;
                    color.g = color.g * ${color.green}.0/255.0;
                    color.b = color.b * ${color.blue}.0/255.0;
                    `
            }
            this.beforeColorStr.push(baseFragShader[i])
            baseFragShader[i] = baseFragShader[i].replace(strS, strT)
        }
    }
    restore() {
        const baseFragShader = this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
        const baseLayer = this.viewer.imageryLayers.get(0)
        for (let i = 0; i < baseFragShader.length; i++) {
            baseFragShader[i] = this.beforeColorStr[i]
            baseLayer.brightness = this.viewModelBefore.brightness
            baseLayer.contrast = this.viewModelBefore.contrast
            baseLayer.gamma = this.viewModelBefore.gamma
            baseLayer.hue = this.viewModelBefore.hue
            baseLayer.saturation = this.viewModelBefore.saturation
        }
    }
    hexColorToRgba(color) {
        // 检查输入颜色是否以 "#" 开头
        if (!color.startsWith('#')) {
            throw new Error('Invalid hex color format. Color should start with "#".')
        }
        // 获取去掉 "#" 后的颜色值部分
        const hexValue = color.slice(1)
        // 根据颜色值长度确定是 RGB 还是 RGBA
        const isRgba = hexValue.length === 8
        // 确保颜色值长度合法（6 或 8 位）
        if (hexValue.length !== 6 && hexValue.length !== 8) {
            throw new Error(`Invalid hex color length. Expected 6 or 8 characters, got ${hexValue.length}.`)
        }
        // 将十六进制颜色值转换为十进制整数
        const hexToInt = (hex) => parseInt(hex, 16)
        // 提取 RGB 分量
        const redHex = hexValue.substring(0, 2)
        const greenHex = hexValue.substring(2, 4)
        const blueHex = hexValue.substring(4, 6)
        const red = hexToInt(redHex)
        const green = hexToInt(greenHex)
        const blue = hexToInt(blueHex)
        // 如果是 RGBA，提取 Alpha 分量
        let alpha = 1
        if (isRgba) {
            const alphaHex = hexValue.substring(6, 8)
            alpha = hexToInt(alphaHex)
        }
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        }
    }
}