// app/blog/page.js
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Footer from '../components/Footer'
import { getAllPosts } from '../lib/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      <Header />
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">技术博客</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            分享我在Web开发、编程和设计方面的学习经验和见解
          </p>
        </div>
        {posts && Array.isArray(posts) ? (
          <BlogList posts={posts} />
        ) : (
          <div className="text-center text-gray-500">暂无博客文章</div>
        )}
      </section>
      <Footer />
    </main>
  )
}