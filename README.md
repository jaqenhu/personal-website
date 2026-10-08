# Jaqen · 个人作品集

Jaqen Hu 的个人作品集，展示 AI Agent、RAG、工作流自动化和数字孪生 / VR 项目。网站基于 React + Vite 构建，采用暗色背景、暖色渐变文字、红色交互元素和响应式布局。

- 正式网站：[jaqenhu-portfolio.vercel.app](https://jaqenhu-portfolio.vercel.app/)
- GitHub 仓库：[jaqenhu/personal-website](https://github.com/jaqenhu/personal-website)
- Vercel 项目：`jaqenhu-portfolio`

## 技术与运行环境

| 项目 | 说明 |
| --- | --- |
| 页面框架 | React 19 |
| 构建工具 | Vite 6、`@vitejs/plugin-react` |
| 样式与动效 | 原生 CSS、Canvas、IntersectionObserver |
| 联系表单 | FormSubmit AJAX |
| 访问统计 | `@vercel/analytics` |
| 部署平台 | Vercel |
| Node.js | 使用 24.x，与当前 Vercel 项目设置保持一致 |

具体依赖版本由 `package-lock.json` 锁定。网站本身无需 Python、Docker 或自建后端；页面中列出的 FastAPI、FastGPT 等是个人技术能力与项目使用的工具。

## 本地运行

首次下载仓库：

```bash
git clone https://github.com/jaqenhu/personal-website.git
cd personal-website
npm ci
npm run dev
```

如果代码已经保存在当前 Windows 目录，直接在 PowerShell 执行：

```powershell
Set-Location "D:\CodeX Project\personal website"
npm ci
npm run dev
```

浏览器打开终端输出的地址，通常是 `http://localhost:5173/`。端口被占用时，使用 Vite 实际输出的地址。

构建并预览生产版本：

```bash
npm run build
npm run preview
```

构建结果位于 `dist/`。本地预览不会更新线上网站。

## 页面结构

| 模块 | 锚点 | 内容与交互 |
| --- | --- | --- |
| Home | `#home` | Canvas 粒子与连线背景、人物图、角色打字动效、作品和联系入口 |
| About | `#about` | 个人介绍、人物图、联系方式、项目与经历统计 |
| Work | `#projects` | 三个项目卡片；点击图片或标题查看详情弹窗 |
| Skills | `#skills` | 核心工具、四步交付流程、作品跳转链接和八项技能进度条 |
| Testimonials | `#testimonials` | 三张合作评价卡片，目前保留草稿待确认标记 |
| Contact | `#contact` | 极简联系表单、联系渠道和页脚 |

Skills 左侧列出 FastAPI、FastGPT、LangChain、RAGFlow、n8n、Docker，交付流程为 **Scope → Build → Evaluate → Deploy**；右侧技能值依次为 **90 / 95 / 95 / 95 / 95 / 90 / 85 / 85**。

Contact 保留 **Name、Email address、Message** 三个字段。`hello` 使用手写字体，`Submit` 和左侧说明使用衬线字体；桌面悬停时，`hello` 与 `Submit` 加粗并变红，说明中的 `open-source co-creation` 保持整词不换行。

页面还有暖色鼠标拖尾；在触屏设备或启用减少动态效果时，该拖尾停用。

## 内容与样式修改

内容分别保存在数据文件和组件中，并非全部集中在 `src/data.js`。

| 修改内容 | 文件或位置 |
| --- | --- |
| 姓名、邮箱、电话、位置、GitHub 地址 | `src/data.js` 的 `profile` |
| 统计数字、项目内容、项目图片路径、技能值、导航项 | `src/data.js` 的 `stats`、`projects`、`skills`、`navLinks` |
| 首页标题、轮播角色与说明 | `src/components/Hero.jsx` |
| About 正文 | `src/components/About.jsx` |
| Skills 核心工具、交付流程与左侧说明 | `src/components/Skills.jsx` |
| 合作评价内容与草稿标记 | `src/components/Testimonials.jsx` |
| Contact 说明、字段和提交逻辑 | `src/components/Contact.jsx` |
| 全站颜色、字体、布局、响应式和悬停效果 | `src/index.css` |
| 首页粒子背景 / 鼠标拖尾 | `src/components/HeroBackground.jsx` / `CursorTrail.jsx` |
| 浏览器标题和远程字体引用 | `index.html` |
| 页面模块顺序 | `src/App.jsx` |

### 图片与字体

静态文件保存在 `public/`，代码中使用从网站根目录开始的路径，例如 `/portrait.png`。

- 首页人物图：`public/portrait.png`。
- About 人物图：`public/about-portrait.png`。
- 项目图片：`public/project-*.png`，对应地址配置在 `src/data.js`。
- Contact 字体：`public/fonts/contact/`，包含 Dancing Script、Cormorant Garamond 的 WOFF2 文件及对应 OFL 许可说明。

替换图片时，可保留原文件名；使用新文件名则同时修改对应组件或数据中的路径。Contact 本地字体随网站部署，`index.html` 中引用的 Google Fonts 需要联网加载。

### 联系表单

收信地址取自 `src/data.js` 的 `profile.email`。表单通过 `https://formsubmit.co/ajax/<邮箱地址>` 提交，包含必填和邮箱校验、蜜罐字段，以及提交中 / 成功 / 失败提示。

实际邮件送达依赖 FormSubmit 的服务和邮箱配置；前端成功提示不能代替收件箱检查。接口使用方式见 [FormSubmit AJAX 文档](https://formsubmit.co/ajax-documentation)。

## GitHub 与 Vercel 更新流程

推荐流程：**修改代码 → 本地检查 → 提交并上传功能分支 → 检查 Vercel 预览 → 合并到 main → 检查正式网站**。

### 1. 确认 Vercel 项目配置

在 [Vercel 控制台](https://vercel.com/dashboard) 打开已有的 `jaqenhu-portfolio` 项目。

| 设置 | 使用值 |
| --- | --- |
| Settings → Git → Connected Git Repository | `jaqenhu/personal-website` |
| Settings → Environments → Production → Branch Tracking | `main` |
| Framework Preset | Vite |
| Root Directory | 仓库根目录，留空 |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 24.x |

未连接仓库时，在当前项目的 Git 设置中连接它。Git 自动部署需要这个关联；本地 `.vercel/project.json` 的 CLI 项目链接不能代替 Git 集成。

### 2. 保存并上传当前修改

先在功能分支检查当前状态并构建：

```bash
git branch --show-current
git status
npm run build
```

构建成功后，提交并上传：

```bash
git add src public README.md package.json package-lock.json index.html vite.config.js
git diff --cached --stat
git commit -m "Update portfolio pages and documentation"
git push -u origin HEAD
```

`HEAD` 表示上传当前分支。若更改已经提交，直接执行上传命令即可。若当前分支是 `main`，先创建功能分支再提交，以便走预览和 PR 流程。

上述提交范围覆盖网页源码、图片、字体、依赖与本说明，不包含 `.impeccable/` 中的本地设计记录。`node_modules/`、`dist/` 和 `.vercel/` 已在 `.gitignore` 中排除；不要提交登录凭证或含密钥的环境文件。

### 3. 创建 Pull Request（PR）并检查预览

1. 打开 [GitHub 仓库](https://github.com/jaqenhu/personal-website)。
2. 点击黄色提示中的 **Compare & pull request**；没有提示时，点击 **Pull requests → New pull request**。
3. 在顶部下拉框选择 `base: main`、`compare: 你的功能分支`，例如 `codex/HighContrast`。
4. 填写标题和改动说明，点击绿色 **Create pull request**。
5. 在 PR 的 **Conversation** 中找到 Vercel 部署评论，部署完成后点击预览链接。

找不到评论时，到 Vercel 项目的 **Deployments** 中按功能分支查找 **Preview** 部署，等状态为 **Ready** 后打开。没有生成部署时，检查 Git 仓库关联和部署日志。

预览至少检查：Skills 工具与八项数值、Contact 字体和悬停、图片加载、作品弹窗、锚点跳转，以及手机上的排版和表单输入。

### 4. 合并并确认正式发布

1. 预览通过后，回到 PR 的 **Conversation** 页面底部。
2. 点击 **Merge pull request → Confirm merge**。如果默认显示其他合并方式，在按钮旁的下拉菜单中选择 **Create a merge commit**。
3. GitHub 显示 **Merged** 后，在 Vercel 的 **Deployments** 中查看新生成的 **Production** 部署。
4. 等状态为 **Ready**，检查 [正式网站](https://jaqenhu-portfolio.vercel.app/)。

Git 集成配置正常、生产分支为 `main` 时，合并会触发生产部署。详见 [Vercel Git 部署说明](https://vercel.com/docs/git)、[GitHub 创建 PR](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request) 和 [合并 PR](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/merging-a-pull-request)。

### 5. 开始下一轮修改

上一轮已合并、当前工作区没有未保存到提交中的更改时，更新本地主分支并创建新的功能分支：

```bash
git switch main
git pull --ff-only origin main
git switch -c codex/site-update-02
```

每轮使用一个尚未存在的分支名。随后重复修改、构建、上传、预览和合并流程。

## 使用 Vercel CLI 手动发布

需要直接从本地上传时，可以使用官方 CLI。

首次安装和登录：

```bash
npm install -g vercel
vercel login
```

在项目根目录执行。当前目录已有 `.vercel/project.json` 时，先确认它关联的是 `jaqenhu-portfolio`；换电脑或重新克隆后，执行以下命令并选择原项目：

```bash
vercel link
```

创建预览部署：

```bash
vercel deploy
```

如果要先验证生产配置但暂不更新正式域名，可以创建暂存的生产部署：

```bash
vercel deploy --prod --skip-domain
```

检查返回的部署地址，确认正常后把这个部署发布到正式域名：

```bash
vercel promote <部署URL或ID>
```

如需直接发布到正式域名，执行 `vercel deploy --prod`。CLI 可上传当前本地代码，不会自动提交或推送 GitHub；代码版本仍需通过 Git 保存。用法见 [Vercel deploy 文档](https://vercel.com/docs/cli/deploy)。

## 版本查看与回退

- **查看版本**：在 Vercel 项目的 **Deployments** 查看部署状态、提交、日志和预览地址；GitHub 保存对应的源代码历史。
- **重新部署**：选择一个部署的 **Redeploy**，重新构建该版本。更新电脑上的代码后，需要重新上传 Git 或运行 CLI 部署。
- **回退线上版本**：项目首页点击 **Instant Rollback**，选择可回退的生产部署并确认。可选范围取决于账户套餐。
- **恢复自动上线**：Instant Rollback 会暂停生产域名自动指向新部署；修复后使用 **Undo Rollback** 选择修复版本，或通过 `vercel promote` 恢复。

线上回退不会撤销 GitHub 中的代码提交。需要修复源代码时，在功能分支修改并重新走发布流程。详见 [部署管理](https://vercel.com/docs/deployments/managing-deployments) 和 [Instant Rollback](https://vercel.com/docs/instant-rollback)。
