---
title: 使用Next.js构建现代博客
date: 2024-03-27
excerpt: 学习如何使用Next.js、MDX和Vercel构建高性能的现代博客网站。
image: https://zh-hans.react.dev/images/home/community/react_conf_hallway.webp
tags:
  - Next.js
  - React
  - 博客
readingTime: 8
featured: true
---

## 简介

这是一篇关于如何使用Next.js构建博客的详细教程。

### 为什么选择 Next.js

Next.js 提供了以下优势：

- **服务端渲染 (SSR)** - 提高首屏加载速度和SEO
- **静态站点生成 (SSG)** - 极致的性能和安全性
- **API Routes** - 轻松构建全栈应用
- **图片优化** - 自动优化图片，支持现代格式

### 开始构建

首先，我们需要创建一个新的Next.js项目：

```bash
npx create-next-app@latest my-blog
```

然后安装必要的依赖包：

```bash
npm install gray-matter remark remark-html
```

### 项目结构

推荐的目录结构：

```
my-blog/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.js
│   │   └── page.js
│   └── lib/
│       ├── posts.js
│       └── markdown.js
├── content/
│   └── posts/
│       └── *.md
└── public/
```

### Markdown 处理

使用 gray-matter 解析 frontmatter，使用 remark 渲染 Markdown。

### 部署到 Vercel

部署非常简单：

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

## 总结

Next.js 是构建现代博客的绝佳选择，结合 Markdown 和 Vercel，你可以快速搭建一个高性能的博客网站。
