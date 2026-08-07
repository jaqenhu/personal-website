# 胡超杰 · 个人介绍网站

AI 工程师 / Unity VR 设计师的个人作品集网站。暗色系、克制、科技感的视觉风格，基于 React + Vite 构建，版心约 1700px，面向 PC 端展示。

## 快速开始

```bash
npm install
npm run dev
```

## 页面结构

| 模块 | 说明 |
| --- | --- |
| Hero | 全屏首页：视频背景、大标题、导航栏、联系按钮 |
| 个人经历 | 人物图、个人介绍、联系方式、项目数据 |
| 精选项目 | 大卡片交替布局展示作品 |
| 个人优势 | 四宫格能力卡片 |
| 联系方式 | 整屏收尾页 + 页脚 |

## 内容修改

所有文案、项目、数据集中在 `src/data.js`，直接编辑即可。

- 头像 / 人物图：替换 `src/components/About.jsx` 中的图片地址
- 项目图片：替换 `src/data.js` 中各项目的 `image` 字段
- 背景视频：替换 `src/components/Hero.jsx` 中的 `VIDEO_SRC`（当前为占位视频，可换为本地 `public/hero.mp4`）
