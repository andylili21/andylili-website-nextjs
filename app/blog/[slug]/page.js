// app/blog/[slug]/page.js
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import MetalBlogPost from '@/app/components/MetalBlogPost';

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
    <MetalBlogPost post={post} />
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