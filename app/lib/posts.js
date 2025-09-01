// app/lib/posts.js
// 模拟从文件系统或CMS获取博客文章数据
const posts = [
  {
    slug: 'nextjs-blog-tutorial',
    title: '使用Next.js构建现代博客',
    excerpt: '学习如何使用Next.js、MDX和Vercel构建高性能的现代博客网站。',
    content: '<p>这是一篇关于如何使用Next.js构建博客的详细教程...</p>',
    date: '2024-03-27',
    image: '/images/blog-nextjs.jpg',
    tags: ['Next.js', 'React', '博客'],
    readingTime: 8,
    featured: true
  },
  {
    slug: 'react-performance-tips',
    title: 'React应用性能优化技巧',
    excerpt: '提高React应用性能的实用技巧和最佳实践。',
    content: '<p>React应用性能优化是每个开发者都需要掌握的技能...</p>',
    date: '2024-03-20',
    image: '/images/blog-react.jpg',
    tags: ['React', '性能优化', 'JavaScript'],
    readingTime: 10,
    featured: true
  },
  {
    slug: 'css-grid-vs-flexbox',
    title: 'CSS Grid与Flexbox：何时使用哪种布局',
    excerpt: '深入比较CSS Grid和Flexbox，帮助你做出正确的布局选择。',
    content: '<p>在现代CSS布局中，Grid和Flexbox是最强大的两个工具...</p>',
    date: '2024-03-15',
    image: '/images/blog-css.jpg',
    tags: ['CSS', '前端', 'Web设计'],
    readingTime: 6,
    featured: false
  }
]

export async function getAllPosts() {
  // 在实际应用中，这里可能会从文件系统或CMS获取数据
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.featured)
}

export async function getPostBySlug(slug) {
  const allPosts = await getAllPosts()
  return allPosts.find(post => post.slug === slug)
}