import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始添加示例数据...');

  // 创建分类
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: {
        name: 'Web开发',
        slug: 'web-development',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: {
        name: 'JavaScript',
        slug: 'javascript',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
      },
    }),
  ]);

  console.log('分类创建完成:', categories.map(c => c.name));

  // 创建博客文章
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'getting-started-with-nextjs' },
      update: {},
      create: {
        title: 'Next.js入门指南',
        slug: 'getting-started-with-nextjs',
        excerpt: '学习如何使用Next.js构建现代化的React应用，包括页面路由、API路由和静态生成等核心概念。',
        content: '# Next.js入门指南\n\nNext.js是一个基于React的框架，提供了许多开箱即用的功能...',
        categoryId: categories[0].id,
        tags: 'Next.js,React,Web开发',
        featured: true,
        status: 'PUBLISHED',
        publishedAt: new Date('2024-01-15'),
        readingTime: 5,
      },
    }),
    prisma.post.upsert({
      where: { slug: 'modern-javascript-features' },
      update: {},
      create: {
        title: '现代JavaScript特性解析',
        slug: 'modern-javascript-features',
        excerpt: '探索ES6+中的新特性，包括箭头函数、解构赋值、模板字符串等，提升你的JavaScript编程技能。',
        content: '# 现代JavaScript特性解析\n\nJavaScript语言在不断演进，ES6+引入了许多强大的新特性...',
        categoryId: categories[1].id,
        tags: 'JavaScript,ES6,编程',
        featured: false,
        status: 'PUBLISHED',
        publishedAt: new Date('2024-01-20'),
        readingTime: 8,
      },
    }),
  ]);

  console.log('博客文章创建完成:', posts.map(p => p.title));

  // 创建项目
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { title: '个人博客系统' },
      update: {},
      create: {
        title: '个人博客系统',
        description: '基于Next.js和Prisma构建的全栈个人博客系统，支持文章管理、分类、标签等功能。',
        technologies: 'Next.js,React,Prisma,SQLite,Tailwind CSS',
        githubUrl: 'https://github.com/example/blog-system',
        demoUrl: 'https://blog.example.com',
        featured: true,
        order: 1,
        status: 'ACTIVE',
      },
    }),
    prisma.project.upsert({
      where: { title: '任务管理应用' },
      update: {},
      create: {
        title: '任务管理应用',
        description: '使用React和Node.js构建的任务管理工具，支持任务创建、分配、跟踪和统计。',
        technologies: 'React,Node.js,Express,MongoDB',
        githubUrl: 'https://github.com/example/task-manager',
        demoUrl: 'https://tasks.example.com',
        featured: false,
        order: 2,
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('项目创建完成:', projects.map(p => p.title));

  console.log('✅ 示例数据添加完成！');
}

main()
  .catch((e) => {
    console.error('❌ 添加示例数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });