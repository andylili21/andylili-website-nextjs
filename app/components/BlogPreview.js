// app/components/BlogPreview.js
import Link from 'next/link'

export default function BlogPreview({ posts }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article 
          key={post.slug} 
          className="rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/70"
        >
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              阅读更多 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}