---
layout: home

hero:
  name: BMapViewer
  text: Vue 3 + Cesium 可视化 SDK
  tagline: 用统一的组件、图层与工具组织 Cesium 业务能力。
  image:
    src: /background.png
    alt: BMapViewer
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 在线预览
      link: https://banyan666.github.io/BMapViewer/
    - theme: alt
      text: 组件 API
      link: /api
    - theme: alt
      text: 图层文档
      link: /layers
    - theme: alt
      text: 拾取与绘制
      link: /tools/pick-tool

features:
  - icon: 🧩
    title: Viewer 生命周期
    details: 通过 Vue 3 组件创建、控制并可靠销毁 Cesium Viewer。
  - icon: 🌍
    title: 离线与三维场景
    details: 支持二维、三维模式、本地 TMS 瓦片与 3D Tiles 数据。
  - icon: ✨
    title: 可组合图层
    details: 内置点、线、面、气泡、热力图、雷达和动态材质图层。
  - icon: 🛠️
    title: 交互与空间分析
    details: 提供 PickTools、Turf 与统一的 GeoJSON 数据约定。
---

## 从一个 Viewer 开始

BMapViewer 负责场景初始化与生命周期，`MapLayers` 组织业务图层，`PickTools` 处理地图交互，Turf 提供空间计算。各模块可以独立使用，也可以围绕同一个 Viewer 组合。

## 在线资源

| 入口 | 地址 | 内容 |
| --- | --- | --- |
| 在线预览 | [banyan666.github.io/BMapViewer](https://banyan666.github.io/BMapViewer/) | 可编辑运行的图层与工具案例 |
| 在线文档 | [banyan666.github.io/BMapViewer/docs](https://banyan666.github.io/BMapViewer/docs/) | 接入指南、API、图层与工具说明 |

::: tip 推荐阅读顺序
[快速开始](/getting-started) → [组件 API](/api) → [图层模块](/layers) → [拾取与绘制](/tools/pick-tool)
:::
