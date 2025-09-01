// app/components/Hero.js
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          开发者与技术博主
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          欢迎来到我的个人空间，这里分享Web开发、编程技巧和创意项目。
          我热爱构建优秀的数字体验并分享我的知识。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            阅读博客
          </Link>
          <Link 
            href="/projects" 
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            查看项目
          </Link>
        </div>
      </div>
    </section>
  )
}