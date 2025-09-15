// app/components/BlogPreview.js
import Link from 'next/link'
import Image from 'next/image'

export default function BlogList({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 relative">
            <Image
              src="/images/image.png"
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">{post.date}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              阅读更多 →
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}