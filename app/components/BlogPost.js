// app/components/BlogPost.js
import Image from 'next/image'

export default function BlogPost({ post, relatedPosts }) {
  return (
    <article className="py-16 px-4 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime} 分钟阅读</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        {post.image && (
          <div className="h-96 relative rounded-xl overflow-hidden mb-8">
            <Image
              src="/images/image.png"
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
      
      {/* 这里可以添加评论组件 */}
    </article>
  )
}