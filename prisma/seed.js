const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始填充种子数据...');

  // 清空现有数据（可选，谨慎使用）
  // await prisma.post.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.category.deleteMany();

  // 创建分类
  console.log('📁 创建分类...');
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'frontend' },
      update: {},
      create: {
        name: '前端开发',
        slug: 'frontend',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'backend' },
      update: {},
      create: {
        name: '后端开发',
        slug: 'backend',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fullstack' },
      update: {},
      create: {
        name: '全栈开发',
        slug: 'fullstack',
      },
    }),
  ]);

  console.log(`✅ 创建了 ${categories.length} 个分类`);

  // 创建文章
  console.log('📝 创建文章...');
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'getting-started-with-nextjs' },
      update: {},
      create: {
        slug: 'getting-started-with-nextjs',
        title: 'Next.js 15 快速入门指南',
        excerpt: '了解如何使用最新的 Next.js 15 构建现代化的全栈应用，包括 App Router、Server Components 等核心特性。',
        content: `# Next.js 15 快速入门指南

Next.js 15 是一个强大的 React 框架，它为开发者提供了构建生产级应用所需的所有工具。

## 核心特性

### App Router
App Router 是 Next.js 13 引入的新路由系统，在 Next.js 15 中得到了进一步完善。

### Server Components
服务器组件允许你在服务器端渲染 React 组件，提高性能并减少客户端 JavaScript 包的大小。

### 数据获取
Next.js 15 提供了多种数据获取方式：
- fetch API with cache
- Server Actions
- Route Handlers

## 快速开始

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## 总结

Next.js 15 为现代 Web 应用开发提供了完整的解决方案，值得学习和使用。
`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        publishedAt: new Date('2024-01-15'),
        readingTime: 5,
        featured: true,
        viewCount: 120,
        status: 'PUBLISHED',
        tags: 'Next.js,React,前端开发',
        categoryId: categories[0].id, // 前端开发
      },
    }),
    prisma.post.upsert({
      where: { slug: 'building-rest-api-with-nodejs' },
      update: {},
      create: {
        slug: 'building-rest-api-with-nodejs',
        title: '使用 Node.js 和 Express 构建 RESTful API',
        excerpt: '本文将指导你如何使用 Node.js、Express 和 Prisma 构建一个完整的 RESTful API，包括数据库设计、路由配置、错误处理等。',
        content: `# 使用 Node.js 和 Express 构建 RESTful API

## 项目初始化

首先创建项目并安装依赖：

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express prisma @prisma/client
\`\`\`

## 设计数据库

使用 Prisma Schema 定义数据模型：

\`\`\`prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
}
\`\`\`

## 创建路由

Express 路由设计遵循 RESTful 规范：

- GET /api/posts - 获取所有文章
- GET /api/posts/:id - 获取单篇文章
- POST /api/posts - 创建文章
- PUT /api/posts/:id - 更新文章
- DELETE /api/posts/:id - 删除文章

## 错误处理

统一的错误处理中间件能提高代码的可维护性。

## 最佳实践

1. 使用分层架构（Controller、Service、Repository）
2. 实现统一响应格式
3. 添加请求参数验证
4. 记录日志
5. 安全加固（CORS、Helmet）

## 总结

构建良好的 API 需要关注架构设计、安全性和可维护性。
`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        publishedAt: new Date('2024-02-01'),
        readingTime: 8,
        featured: true,
        viewCount: 89,
        status: 'PUBLISHED',
        tags: 'Node.js,Express,API,后端开发',
        categoryId: categories[1].id, // 后端开发
      },
    }),
    prisma.post.upsert({
      where: { slug: 'fullstack-development-with-nextjs-and-prisma' },
      update: {},
      create: {
        slug: 'fullstack-development-with-nextjs-and-prisma',
        title: '全栈开发：Next.js + Prisma 实战',
        excerpt: '学习如何使用 Next.js 和 Prisma 构建一个完整的全栈应用，从前端到后端，从开发到部署。',
        content: `# 全栈开发：Next.js + Prisma 实战

## 技术栈

- **前端**: Next.js 15, React, TailwindCSS
- **后端**: Next.js API Routes / 独立 Express 服务器
- **数据库**: PostgreSQL / SQLite
- **ORM**: Prisma

## 项目结构

\`\`\`
project/
├── app/              # Next.js App Router
├── components/       # React 组件
├── lib/             # 工具函数和 API 客户端
├── prisma/          # Prisma schema 和迁移
└── server/          # 独立后端服务器（可选）
\`\`\`

## 数据库设计

使用 Prisma 定义数据模型，支持关系、索引和枚举。

## 前后端分离

虽然 Next.js 可以在同一项目中处理前后端，但分离部署有其优势：
- 独立扩展
- 技术栈灵活
- 职责清晰

## 部署

- 前端：Vercel / Netlify
- 后端：Railway / Render
- 数据库：Supabase / PlanetScale

## 总结

全栈开发需要平衡前后端知识，Next.js 和 Prisma 的组合让这个过程更加顺畅。
`,
        coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        publishedAt: new Date('2024-02-10'),
        readingTime: 12,
        featured: false,
        viewCount: 56,
        status: 'PUBLISHED',
        tags: 'Next.js,Prisma,全栈开发,TypeScript',
        categoryId: categories[2].id, // 全栈开发
      },
    }),
    prisma.post.upsert({
      where: { slug: 'draft-upcoming-features' },
      update: {},
      create: {
        slug: 'draft-upcoming-features',
        title: '即将发布：网站新功能预告',
        excerpt: '这是一篇草稿文章，介绍即将推出的新功能和改进。',
        content: `# 即将发布的新功能

## 评论系统

我们正在开发一个完整的评论系统...

## 搜索功能

全文搜索将让你更容易找到想要的内容...

## 待完成...
`,
        publishedAt: null,
        readingTime: 3,
        featured: false,
        viewCount: 0,
        status: 'DRAFT',
        tags: '公告,更新',
        categoryId: null,
      },
    }),
  ]);

  console.log(`✅ 创建了 ${posts.length} 篇文章`);

  // 创建项目
  console.log('💼 创建项目...');
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: '个人博客网站',
        description: '使用 Next.js 15 和 Prisma 构建的现代化个人博客，支持 Markdown、国际化、暗色模式等功能。',
        technologies: 'Next.js,React,Prisma,TailwindCSS,TypeScript',
        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        githubUrl: 'https://github.com/yourusername/blog',
        demoUrl: 'https://yourblog.com',
        featured: true,
        order: 1,
        status: 'ACTIVE',
      },
    }),
    prisma.project.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'RESTful API 框架',
        description: '一个基于 Express 的 RESTful API 开发框架，集成了验证、日志、错误处理等最佳实践。',
        technologies: 'Node.js,Express,Prisma,express-validator',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        githubUrl: 'https://github.com/yourusername/api-framework',
        demoUrl: null,
        featured: true,
        order: 2,
        status: 'ACTIVE',
      },
    }),
    prisma.project.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: '待办事项应用',
        description: '一个简洁的待办事项管理应用，支持分类、标签、优先级等功能。',
        technologies: 'React,Redux,Material-UI',
        coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
        githubUrl: 'https://github.com/yourusername/todo-app',
        demoUrl: 'https://todo.example.com',
        featured: false,
        order: 3,
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log(`✅ 创建了 ${projects.length} 个项目`);

  console.log('\n✨ 种子数据填充完成！');
  console.log('\n📊 数据统计:');
  console.log(`   - 分类: ${categories.length}`);
  console.log(`   - 文章: ${posts.length} (${posts.filter(p => p.status === 'PUBLISHED').length} 已发布, ${posts.filter(p => p.status === 'DRAFT').length} 草稿)`);
  console.log(`   - 项目: ${projects.length}`);
}

main()
  .catch((e) => {
    console.error('❌ 种子数据填充失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
