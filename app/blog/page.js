// app/blog/page.js
import { PrismaClient } from '@prisma/client';
import MetalBlogList from '@/app/components/MetalBlogList';

// 创建Prisma Client单例以避免在Next.js中重复连接
const prisma = new PrismaClient();

// 在服务端组件中使用Prisma
async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED'
      },
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        category: true
      }
    });
    return posts;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <MetalBlogList initialPosts={posts} />
  );
}