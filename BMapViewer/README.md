# BMapViewer

BMapViewer 是面向 Vue 3 应用的 Cesium 地理信息可视化 SDK。它统一管理 Viewer 初始化、相机控制与资源销毁，并提供职责独立的多源底图、业务图层、拾取绘制、空间分析和天气效果能力。

仓库同时提供 SDK 源码、可编辑在线示例、VitePress 技术文档和多格式构建产物，适合用于三维 GIS、离线地图、园区态势、设备监控与专题分析等场景。

## 在线资源

- [在线预览](https://banyan666.github.io/BMapViewer/)：浏览底图、图层、拾取绘制与天气模块，并在线编辑运行示例代码。
- [在线文档](https://banyan666.github.io/BMapViewer/docs/)：查看快速开始、组件 API、底图、图层和工具使用指南。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| Viewer 生命周期 | 通过 Vue 组件创建、控制和销毁 `Cesium.Viewer` |
| 底图与地形 | 通过 `BaseMaps` 管理离线瓦片、多源互联网地图、自定义切片、Cesium World Terrain 与天地图三维地形 |
| 可视化图层 | 提供点、线、面、气泡、热力图、3D Tiles 与动态效果图层 |
| 拾取与绘制 | 支持点、图标点、线、多边形拾取及节点拖拽编辑 |
| 空间分析 | 集成 Turf，使用 GeoJSON 完成距离、缓冲和空间关系计算 |
| 天气粒子 | 通过 `WeatherEffects` 提供雨、雪、雾、沙尘、云层和闪电后处理效果 |
| 离线资源 | 支持本地 TMS 瓦片、3D Tiles 与自定义静态资源 |

## 目录结构

```text
BMapViewer/
├─ src/sdk/base-map/        # BaseMaps 底图模块
├─ src/sdk/layer/           # MapLayers 业务图层
├─ src/sdk/weather/         # WeatherEffects 天气模块
├─ examples/                # 可编辑运行示例
├─ docs/                    # 接入、API 与开发文档
├─ BMapViewer/              # npm run build:lib 生成的库文件
├─ demo-dist/               # npm run build:demo 生成的示例站点
├─ vite.config.ts           # 示例工程配置
└─ vite.lib.config.ts       # SDK 构建配置
```

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端中 Vite 输出的地址即可查看基础示例。

示例站以模块主页作为统一入口，当前包含：

- `#/base-maps`：离线瓦片、多源 Provider 与三维地形的可编辑示例
- `#/layers`：业务图层目录与可编辑运行示例
- `#/pick-tools`：点、图标点、线和多边形拾取示例
- `#/weather`：六类天气效果与可编辑运行示例

主页文档链接默认指向 GitHub 仓库中的 Markdown 文件。部署独立文档站时，可以通过 `VITE_DOCS_BASE_URL` 指定文档站根地址：

```bash
VITE_DOCS_BASE_URL=https://example.com/BMapViewer npm run build:demo
```

运行技术文档站点：

```bash
npm run docs:dev
```

## 构建

```bash
# 同时构建 SDK 和示例站点
npm run build

# 只构建 SDK
npm run build:lib

# 只构建示例站点
npm run build:demo
```

SDK 构建结果位于 `BMapViewer/`，包含 ES Module、UMD 和样式文件。

## 发布到 npm

npm 包名为 [`b-map-viewer`](https://www.npmjs.com/package/b-map-viewer)。发布前需要确认当前登录的是 npm 官方 Registry，而不是 `npmmirror` 等下载镜像：

```powershell
npm login --registry=https://registry.npmjs.org/ --auth-type=web
npm whoami --registry=https://registry.npmjs.org/
```

`npm whoami` 应返回拥有 `b-map-viewer` 发布权限的账号。项目已经通过 `publishConfig` 将发布目标固定为 npm 官方仓库。

### 通过 GitHub Actions 发布（推荐）

先提交当前开发改动，保证 Git 工作区干净，然后根据语义化版本规则升级版本：

```powershell
git status

# 修复版本：0.1.2 → 0.1.3
npm version patch

# 新功能版本可改用 npm version minor
# 不兼容更新可改用 npm version major

git push origin main --follow-tags
```

`npm version` 会更新 `package.json` 和 `package-lock.json`，并创建版本提交及 `v*` 标签。标签推送后，[npm 发布工作流](.github/workflows/publish-npm.yml) 会自动安装依赖、构建 SDK、检查压缩包并发布。使用此方式时不要再在本地执行 `npm publish`，否则两个发布任务会争用同一个版本号。

### 在本机手动发布

需要手动发布时，使用 `--no-git-tag-version` 只更新版本文件，避免触发标签发布工作流：

```powershell
# patch、minor、major 三选一
npm version patch --no-git-tag-version

npm run build:lib
npm run pack:check
npm publish --registry=https://registry.npmjs.org/ --access public
```

账号开启 2FA 且命令未自动提示验证码时，可以显式传入一次性验证码：

```powershell
npm publish --registry=https://registry.npmjs.org/ --access public --otp=你的6位验证码
```

发布成功后验证版本，并将版本文件和构建产物提交到个人主仓库：

```powershell
npm view b-map-viewer version --registry=https://registry.npmjs.org/

git add .
git commit -m "release: v0.1.3"
git push origin main
```

手动发布后不要再推送同版本的 `v*` 标签，否则 GitHub Actions 会尝试重复发布该版本。npm 不允许覆盖已经发布的版本号；如果发布失败且官网仍没有该版本，修复登录或权限问题后可直接重试原版本，无需再次升级。

## 在 Vue 3 项目中使用

安装本地包或发布后的包，并确保项目已安装 `vue`、`cesium` 和 `vite-plugin-cesium`：

```bash
npm install b-map-viewer cesium vite-plugin-cesium
```

Vite 配置：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'

export default defineConfig({
  plugins: [vue(), cesium()],
})
```

组件中使用：

```vue
<script setup>
import { ref } from 'vue'
import { BaseMaps, BMapViewer, MapLayers } from 'b-map-viewer'
import 'b-map-viewer/style.css'

const mapRef = ref(null)
const camera = {
  longitude: 125.83372000975274,
  latitude: 44.14712267403385,
  height: 12000,
  pitch: -45,
}

function handleReady(viewer) {
  new BaseMaps.BaseMap(viewer, {
    type: 'offline',
    url: '/tiles/{z}/{x}/{reverseY}.png',
    crs: 'GCJ02',
  })

  const circles = new MapLayers.CircleGroupLayer(viewer, {
    radius: 300,
    fillColor: '#37d6ff',
  })

  circles.setData([
    {
      geometry: { coordinates: [125.834, 44.147] },
      properties: { id: 'center' },
    },
  ])
}
</script>

<template>
  <div style="width: 100%; height: 600px">
    <BMapViewer
      ref="mapRef"
      :camera="camera"
      :scene-mode="1"
      @ready="handleReady"
    />
  </div>
</template>
```

SDK 内部已经显式导入 Cesium，不需要再执行 `window.Cesium = Cesium`。

## 文档

- [在线文档](https://banyan666.github.io/BMapViewer/docs/)
- [在线预览](https://banyan666.github.io/BMapViewer/)
- [完整技术文档站点](docs/index.md)
- [快速开始](docs/getting-started.md)
- [组件 API](docs/api.md)
- [底图模块](docs/base-maps.md)
- [图层模块](docs/layers.md)
- [天气粒子系统](docs/weather.md)
- [开发与构建](docs/development.md)

## 兼容性

- Vue 3.4+
- Cesium 1.118.x（当前验证版本为 1.118.2）
- Vite 5+

## License

[Apache License 2.0](LICENSE)
