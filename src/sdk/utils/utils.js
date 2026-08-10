import { v4 as uuidV4 } from 'uuid'
// 获取偏移后的纬度
export const getOffsetLat = (options) => {
    const ONE_LAT_TO_METERS = 111 * 1000 // 1纬度对应的距离 111km

    // 如果是90或者0度，不发生偏移
    if (window.Math.abs(options.pitch % 90) === 0) {
        return options.lat
    }

    const latOffsetMeters = options.height / Math.tan((options.pitch * Math.PI) / 180) // tan用的是弧度，这里要将角度转为弧度
    const lat = Number(latOffsetMeters / ONE_LAT_TO_METERS)
    return options.lat + lat
}
export const uuid = () => {
    return uuidV4()
}


/**
 * 生成 Cesium Billboard 专用的气泡画布
 * @param {Object} options 配置参数
 * @param {string} [options.title=""] 标题文字
 * @param {string|string[]|Object[]} [options.content=[]] 内容文字
 * @param {string} [options.baseColor='#40aee2'] 基础颜色
 * @param {string} [options.bodyColor='#11374c'] 内容背景色
 * @param {boolean} [options.showTitle=true] 是否显示标题
 * @param {number} [options.headerOpacity=0.8] 标题区域透明度
 * @param {number} [options.bodyOpacity=0.5] 内容区域透明度
 * @param {number} [options.scale=1] 整体缩放比例
 * @param {string} [options.align='left'] 文字对齐方式
 * @param {number} [options.titleFontSize=14] 标题字体大小（不缩放）
 * @param {number} [options.contentFontSize=12] 内容字体大小（不缩放）
 * @returns {HTMLCanvasElement}
 */
export function createBillboardCanvas(options) {
    const {
        title = "",
        content = [],
        baseColor = '#40aee2',
        bodyColor = '#11374c',
        showTitle = true,
        headerOpacity = 0.8,
        bodyOpacity = 0.5,
        scale = 1,
        align = 'left',
        titleFontSize = 14,
        contentFontSize = 12
    } = options;

    const rawContentLines = Array.isArray(content) ? content : [content];
    const contentLines = rawContentLines.map(line => {
        if (line && typeof line === 'object') {
            const label = line.label ?? line.name ?? '';
            const value = line.value ?? line.content ?? '';
            const separator = label && value !== '' ? '：' : '';
            return {
                text: `${label}${separator}${value}` || JSON.stringify(line),
                color: line.color || '#ffffff'
            };
        }
        return {
            text: String(line ?? ''),
            color: '#ffffff'
        };
    });

    // --- 1. 尺寸计算 ---
    const padding = 10 * scale;
    const headerHeight = showTitle ? 30 * scale : 0;
    const lineSpacing = 8 * scale;
    // 使用独立的字体大小参数，不乘以scale（如果需要整体缩放字体，可以乘以scale）
    const scaledTitleFontSize = titleFontSize * scale;
    const scaledContentFontSize = contentFontSize * scale;
    const radius = 6 * scale;
    const stemHeight = 20 * scale;

    // 创建临时canvas测量文字宽度
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    let textMaxWidth = 0;

    if (showTitle) {
        tempCtx.font = `bold ${scaledTitleFontSize}px Arial, sans-serif`;
        const titleWidth = tempCtx.measureText(title).width;
        textMaxWidth = Math.max(textMaxWidth, titleWidth);
    }

    tempCtx.font = `${scaledContentFontSize}px Arial, sans-serif`;
    contentLines.forEach(line => {
        const lineWidth = tempCtx.measureText(line.text).width;
        textMaxWidth = Math.max(textMaxWidth, lineWidth);
    });

    const boxWidth = textMaxWidth + padding * 2.5;
    const contentLineHeight = scaledContentFontSize + lineSpacing;
    const bodyHeight = (contentLines.length * contentLineHeight) - lineSpacing + padding * 2;

    // 阴影效果写死在代码中
    const shadowEnabled = true; // 阴影总是启用
    const shadowBlurValue = 20; // 阴影模糊度固定为20

    const glowMargin = shadowEnabled ? 20 * scale : 0;
    const canvasWidth = boxWidth + glowMargin * 2;
    const canvasHeight = headerHeight + bodyHeight + stemHeight + glowMargin * 2;

    // 创建主画布
    const canvas = document.createElement('canvas');
    // 使用2倍分辨率避免模糊（对高DPI屏幕友好）
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr); // 缩放上下文以匹配高DPI

    const anchorX = canvasWidth / 2;
    const anchorY = canvasHeight - glowMargin;
    const boxStartX = glowMargin;
    const boxStartY = glowMargin;

    // 颜色转换函数
    const hexToRgba = (hex, alpha) => {
        // 处理简写颜色代码如 #fff
        let hexColor = hex;
        if (hex.length === 4) {
            hexColor = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
        }
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // 绘制针脚
    if (shadowEnabled) {
        ctx.shadowBlur = 10 * scale;
        ctx.shadowColor = baseColor;
    }
    ctx.lineWidth = 2 * scale;
    ctx.strokeStyle = hexToRgba(baseColor, 0.8);
    ctx.beginPath();
    ctx.moveTo(anchorX, boxStartY + headerHeight + bodyHeight);
    ctx.lineTo(anchorX, anchorY);
    ctx.stroke();

    // 绘制外边框发光
    if (shadowEnabled) {
        ctx.shadowBlur = shadowBlurValue * scale;
        ctx.shadowColor = baseColor;
    } else {
        ctx.shadowBlur = 0;
    }
    ctx.lineWidth = 2 * scale;
    ctx.strokeStyle = hexToRgba(baseColor, 0.9);
    ctx.beginPath();
    ctx.roundRect(boxStartX, boxStartY, boxWidth, headerHeight + bodyHeight, radius);
    ctx.stroke();

    // 清除阴影效果，避免影响后续绘制
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';

    // 填充背景
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(boxStartX, boxStartY, boxWidth, headerHeight + bodyHeight, radius);
    ctx.clip();

    if (showTitle) {
        // 标题背景
        ctx.fillStyle = hexToRgba(baseColor, headerOpacity);
        ctx.fillRect(boxStartX, boxStartY, boxWidth, headerHeight);
        // 内容背景
        ctx.fillStyle = hexToRgba(bodyColor, bodyOpacity);
        ctx.fillRect(boxStartX, boxStartY + headerHeight, boxWidth, bodyHeight);
    } else {
        ctx.fillStyle = hexToRgba(bodyColor, bodyOpacity);
        ctx.fillRect(boxStartX, boxStartY, boxWidth, bodyHeight);
    }
    ctx.restore();

    // 绘制文字（关闭所有阴影）
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = align === 'center' ? 'center' : 'left';

    const textX = align === 'center' ? boxStartX + boxWidth / 2 : boxStartX + padding;

    // 绘制标题文字
    if (showTitle) {
        // 添加文字阴影以提高可读性（可选）
        ctx.shadowBlur = 1 * scale;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.font = `bold ${scaledTitleFontSize}px Arial, sans-serif`;
        ctx.fillText(title, textX, boxStartY + headerHeight / 2);

        // 清除文字阴影
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

    // 绘制内容文字
    ctx.font = `${scaledContentFontSize}px Arial, sans-serif`;
    const contentStartY = showTitle ? boxStartY + headerHeight : boxStartY;

    contentLines.forEach((line, i) => {
        // 为内容文字添加轻微阴影（可选）
        ctx.shadowBlur = 0;
        // ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';

        const lineY = contentStartY + padding + scaledContentFontSize / 2 + i * contentLineHeight;
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, textX, lineY);

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    });

    return canvas;
}
