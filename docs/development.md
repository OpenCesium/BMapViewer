# 开发与构建

## 仓库职责

- `src/sdk/`：可发布 SDK 源码，不能引用仓库外资源。
- `examples/`：示例组件，开发服务器入口由 `src/App.vue` 提供。
- `docs/`：Markdown 文档。
- `docs/.vitepress/`：技术文档站点配置与主题。
- `BMapViewer/`：库模式构建产物，包含 ES Module、UMD 和样式文件。
- `demo-dist/`：示例站点构建产物，已加入 `.gitignore`。

## 常用命令

```bash
npm run dev
npm run build:lib
npm run build:demo
npm run build
npm run preview
npm run docs:dev
npm run docs:build
npm run docs:preview
```

## 构建边界

库构建将 `vue` 与 `cesium` 外置，避免在应用中出现多个 Vue 或 Cesium 实例；`@turf/turf` 与 `uuid` 会随 SDK 打包，减少接入时的依赖配置。

Cesium 的 Workers 等运行时资源由应用侧的 `vite-plugin-cesium` 负责处理。

技术文档包含较多 GIF 演示资源，因此不会打入 npm SDK 包；它们随 Git 仓库和 VitePress 文档站点维护。

Cesium 1.118 的 KML 模块仍使用 `@zip.js/zip.js/lib/zip-no-worker.js` 子路径，因此项目固定 `@zip.js/zip.js@2.7.73`，避免新版移除该导出后导致 Vite 开发服务器预打包失败。

## 发布前检查

1. 执行 `npm ci`。
2. 执行 `npm run build`。
3. 运行 `npm run dev`，检查初始化、点击拾取和图层示例。
4. 检查 `git status`，确认只包含本次发布需要的文件。

## GitHub Pages 自动部署

`.github/workflows/deploy-pages.yml` 会在代码推送到 `main` 分支后自动构建并发布，也可以在 GitHub Actions 页面手动执行。

Pages 产物由案例站与文档站组合而成：

- `<base_path>/`：Vue 3 + Cesium 在线示例。
- `<base_path>/docs/`：VitePress 技术文档。

工作流读取 GitHub Pages 返回的 `base_path` 动态生成部署子路径，因此同时兼容项目 Pages 和自定义域名。示例构建时通过 `VITE_DOCS_BASE_URL` 指向线上文档，文档构建时通过 `VITEPRESS_BASE` 设置 VitePress 的部署路径。

首次使用前，需要在 GitHub 仓库的 `Settings → Pages → Build and deployment → Source` 中选择 `GitHub Actions`。之后每次推送到 `main` 都会自动更新案例和文档。
