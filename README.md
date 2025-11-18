# AndyLili 个人网站

这是一个基于 [Next.js](https://nextjs.org) 构建的现代化个人网站，集成了博客、项目展示、时间管理等功能模块。

## ✨ 功能特性

- 📝 **博客系统** - 支持动态博客文章路由，轻松管理和展示文章
- 🎨 **项目展示** - 优雅地展示个人项目和作品集
- ⏰ **时间规划与追踪** - 完整的时间日志管理与效率分析工具
- 🌍 **国际化支持** - 内置中英文切换功能
- 🌓 **主题切换** - 支持亮色/暗色主题无缝切换
- ⚡ **极速构建** - 采用 Turbopack 加速开发体验
- 📱 **响应式设计** - 完美适配各种设备屏幕
- 🎭 **精美动画** - 基于 Framer Motion 的流畅交互体验

## 🛠️ 技术栈

### 核心框架
- **Next.js 15.5.2** - React 全栈框架
- **React 19.1.0** - UI 组件库
- **TypeScript** - 类型安全的 JavaScript

### 样式与 UI
- **Tailwind CSS 4.1.13** - 原子化 CSS 框架
- **tailwindcss-animate** - CSS 动画工具
- **Lucide React** - 精美的图标库
- **class-variance-authority** - 变体样式管理

### 功能库
- **next-intl** - Next.js 国际化解决方案
- **i18next** - 完整的国际化框架
- **Framer Motion** - 强大的动画库
- **Motion** - 轻量级动画工具

## 📁 项目结构

```
andylili-website-nextjs/
├── app/                          # Next.js App Router 主目录
│   ├── blog/                     # 博客模块
│   │   ├── [slug]/              # 动态文章路由
│   │   │   └── page.js          # 文章详情页
│   │   └── page.js              # 博客列表页
│   ├── projects/                # 项目展示模块
│   │   └── page.tsx             # 项目页面
│   ├── time-planning/           # 时间规划模块
│   │   └── page.tsx             # 时间管理页面
│   ├── components/              # 通用 UI 组件
│   │   ├── Header.js            # 页面头部
│   │   ├── Footer.js            # 页面底部
│   │   ├── Hero.js              # 首页 Hero 区域
│   │   ├── ThemeToggle.tsx      # 主题切换组件
│   │   ├── LanguageSwicher.tsx  # 语言切换组件
│   │   ├── BlogList.js          # 博客列表
│   │   ├── BlogPost.js          # 博客文章
│   │   ├── BlogPreview.js       # 博客预览
│   │   ├── ProjectCard.js       # 项目卡片
│   │   └── Projects.js          # 项目列表
│   ├── lib/                     # 工具函数库
│   │   ├── i18n.ts              # i18n 配置
│   │   ├── i18nOptions.ts       # i18n 选项
│   │   ├── posts.js             # 博客文章处理
│   │   └── theme.ts             # 主题管理
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
├── components/magicui/          # Magic UI 组件
│   └── marquee.tsx              # 跑马灯组件
├── lib/                         # 共享工具库
│   └── utils.ts                 # 通用工具函数
├── public/locales/              # 国际化资源文件
│   ├── en/                      # 英文
│   │   ├── commen.json
│   │   └── home.json
│   └── zh/                      # 中文
│       ├── commen.json
│       └── home.json
├── next.config.ts               # Next.js 配置
├── tailwind.config.js           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖
```

## 🚀 快速开始

### 环境要求

- Node.js 20.x 或更高版本
- npm / yarn / pnpm / bun 任意包管理器

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

💡 **提示**: 本项目启用了 **Turbopack** 加速构建，修改代码后页面会自动热更新。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm start
# 或
yarn start
```

### 代码检查

```bash
npm run lint
# 或
yarn lint
```

## 📝 开发指南

### 添加新博客文章

1. 在 `app/blog/` 目录下创建文章内容
2. 使用 `[slug]` 动态路由访问文章
3. 在 `app/lib/posts.js` 中管理文章数据

### 切换主题

主题功能由 `app/lib/theme.ts` 管理，通过 `ThemeToggle.tsx` 组件实现用户交互。

### 国际化配置

- 语言配置文件位于 `public/locales/` 目录
- 支持中文 (zh) 和英文 (en)
- 通过 `LanguageSwicher.tsx` 组件切换语言
- 配置文件：`app/lib/i18n.ts`

### 自定义样式

- 全局样式：`app/globals.css`
- Tailwind 配置：`tailwind.config.js`
- 使用 `clsx` 和 `class-variance-authority` 管理动态类名

## ⏰ 时间规划与追踪功能

### 功能设计

时间规划与追踪模块是本项目的核心功能之一，旨在帮助更好地管理和分析时间使用情况。

#### 1. 时间规划

**信息收集内容：**
- 🏢 **工作规划** - 按紧急度分为五级
- 📚 **学习规划** - 分为谋生 (Living) 和兴趣 (Interests)
- 😌 **休息时间** - 静休息和动态放空
- 👥 **社交活动** - 工作、家庭、朋友、伴侣
- 🔄 **每日 Routine** - 习惯养成和技巧练习

**信息收集方式：**
- 📅 时间轴加标签 - 日历式时间段标签
- 📊 任务及进度 - 流程图展示
- 😊 情绪收集 - 标签 + 文字 + 评分

#### 2. 追踪分析

**数据分析维度：**
- 📆 日度分析
- 📈 三日分析
- 📊 周度分析
- 📉 月度分析
- 📋 季度分析
- 📊 年度分析
- 📈 总体分析

**交互设计：**
- 🌅 早上：规划展示明显，追踪折叠
- 🌙 晚上：追踪填写明显，规划折叠
- 💾 数据存储：所有信息自动保存到数据库

#### 3. 信息分类体系

| 类别 | 分类标准 |
|------|---------|
| 工作 | 紧急度五级分类 + 项目线 |
| 学习 | 谋生 (Living) / 兴趣 (Interests) |
| 休息 | 静休息 / 动态放空 |
| 社交 | 工作 / 家庭 / 朋友 / 伴侣 |
| Routine | 习惯养成 / 技巧练习 |
| 情绪 | 常规情绪分类 |

## 🎨 技术亮点

### Turbopack 加速

本项目使用 Next.js 15 的 Turbopack 作为构建工具，相比 Webpack 提供了：
- ⚡ 更快的冷启动速度
- 🔄 更快的热更新响应
- 📦 更优的打包性能

### App Router 架构

采用 Next.js 13+ 的 App Router 架构，享受：
- 🗂️ 基于文件系统的路由
- 🎯 服务端组件优先
- 📡 内置数据获取
- 🔀 并行路由和拦截路由

### 优化的字体加载

使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化和加载 [Geist](https://vercel.com/font) 字体，提供更好的性能和用户体验。

## 🌐 部署

本项目采用前后端分离架构，推荐使用以下部署方案：

### 前端部署到 Vercel（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 中导入项目
3. Vercel 会自动检测 Next.js 并配置构建设置
4. 配置环境变量 `NEXT_PUBLIC_API_URL` 指向后端地址
5. 点击部署即可

详细文档：[Next.js 部署指南](https://nextjs.org/docs/app/building-your-application/deploying)

### 后端部署到 Railway（推荐）

1. 在 Railway 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量：
   - `DATABASE_URL`: PostgreSQL 数据库连接字符串
   - `ALLOWED_ORIGINS`: 前端域名
   - `NODE_ENV`: production
4. Railway 会自动运行数据库迁移和种子数据脚本

### 其他部署选项

- **Docker**: 使用容器化部署
- **静态导出**: 使用 `next export` 生成静态网站
- **自托管**: 在自己的服务器上运行

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 文件。

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 的功能和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程
- [Next.js GitHub](https://github.com/vercel/next.js) - 查看源码和参与贡献
- [Tailwind CSS 文档](https://tailwindcss.com/docs) - Tailwind CSS 使用指南
- [Framer Motion 文档](https://www.framer.com/motion/) - 动画库文档

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ by AndyLili**
