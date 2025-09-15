// app/blog/page.js
// import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllPosts } from '../lib/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      {/* <Header /> */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-gray-800 dark:text-gray-200">技术博客</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-gray-800 dark:text-gray-200">
            分享我在Web开发、编程和设计方面的学习经验和见解
          </p>
        </div>
        
        <div className="space-y-8 text-gray-800 dark:text-gray-200">
          {posts && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <article 
                key={post.slug} 
                className="border-b border-gray-200 pb-8 last:border-0 last:pb-0 text-gray-800 dark:text-gray-200"
              >
                <a href={`/blog/${post.slug}`} className="block group text-gray-800 dark:text-gray-200">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors text-gray-800 dark:text-gray-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 text-gray-800 dark:text-gray-200">
                    {post.date} · {post.readingTime}
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">暂无博客文章</div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}