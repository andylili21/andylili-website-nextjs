// app/blog/page.js
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">博客文章</h1>
        <Link
          href="/blog/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          + 创建文章
        </Link>
      </div>
      {posts.length === 0 ? (
        <p>暂无文章</p>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.id} >
            <article key={post.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow" >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {post.category?.name && `分类: ${post.category.name}`}
                </span>
                {post.publishedAt && (
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                )}
              </div>
            </article>
          </Link>
          ))}
        </div>
      )}
    </div>
  );
}