// app/page.js
import Link from 'next/link'
import Hero from './components/Hero'
import BlogPreview from './components/BlogPreview'
import Projects from './components/Projects'
import Footer from './components/Footer'
import { getFeaturedPosts } from './lib/posts'
// import {PlacesMarquee} from './components/PlacesMarquee'

export default async function Home() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <main>

      <Hero />
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12 text-gray-800 dark:text-gray-200" >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-gray-800 dark:text-gray-200">最新文章</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-gray-800 dark:text-gray-200">
            {/* 分享我在Web开发、编程和设计方面的学习经验和见解 */}
            分享我在技术和生活中的学习经验和见解
          </p>
        </div>
        <BlogPreview posts={featuredPosts} />
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看所有文章
          </Link>
        </div>
      </section>
      <Projects />
    </main>
  )
}