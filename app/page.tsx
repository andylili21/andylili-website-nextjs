// app/page.js
import Link from 'next/link'
import Hero from './components/Hero'
import BlogPreview from './components/BlogPreview'
import Projects from './components/Projects'
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
            分享我在技术和生活中的学习经验和见解111
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
      
      {/* 时间规划模块入口 */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-gray-100">时间规划与管理</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              查看我的日常时间分配和时间利用效率分析
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">时间都去哪了？</h3>
            <p className="text-gray-600 mb-6 dark:text-gray-300">
              探索我的时间日志，了解如何高效规划和利用时间，以及时间都花费在了哪些地方
            </p>
            <Link 
              href="/time-planning" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              查看时间规划详情
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}