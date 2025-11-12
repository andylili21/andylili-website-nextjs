// app/blog/[slug]/page.js
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const prisma = new PrismaClient()

async function getPost(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug
      },
      include: {
        category: true
      }
    })
    return post
  } catch (error) {
    console.error('获取文章详情失败:', error)
    return null
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="py-16 px-4 max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {/* 草稿标签 */}
        {post.status === 'DRAFT' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800 dark:text-yellow-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              该文章为草稿状态，仅你个人可见
            </p>
          </div>
        )}

        {/* 文章封面图 */}
        {post.coverImage && (
          <div className="h-64 bg-gray-200 dark:bg-gray-700">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* 文章头部信息 */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-wrap gap-2">
              {post.status === 'DRAFT' && (
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
                  草稿
                </span>
              )}
              {post.category && (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category.name}
                </span>
              )}
              <time dateTime={post.publishedAt}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : new Date(post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.readingTime && (
                <span>阅读时间: {post.readingTime} 分钟</span>
              )}
              <span>浏览: {post.viewCount} 次</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* 文章标签 */}
          {post.tags && (
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </article>

      {/* 导航按钮 */}
      <div className="mt-12 flex justify-between items-center">
        <Link
          href="/blog"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回文章列表</span>
        </Link>
        {post.status === 'DRAFT' && (
          <Link
            href={`/blog/create?edit=${post.id}`}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>编辑文章</span>
          </Link>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: '文章未找到',
      description: '抱歉，您要查找的文章不存在。'
    }
  }

  return {
    title: `${post.title} - Andy Li 的博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Andy Li']
    }
  }
}