// app/blog/[slug]/page.js
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

async function getPost(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
        status: 'PUBLISHED'
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
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="py-16 px-4 max-w-4xl mx-auto">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
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
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              {post.category && (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category.name}
                </span>
              )}
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('zh-CN', {
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
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
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
      <div className="mt-12 flex justify-between">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回文章列表</span>
        </button>
      </div>
    </main>
  )
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)

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