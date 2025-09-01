// app/components/Projects.js
import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      title: '电商平台',
      description: '使用Next.js和Stripe构建的全功能电商网站，包含用户认证、支付处理和订单管理。',
      tags: ['Next.js', 'Stripe', 'MongoDB'],
      link: '#'
    },
    {
      title: '任务管理应用',
      description: '基于React和Firebase的协作任务管理工具，支持实时更新和团队协作。',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      link: '#'
    },
    {
      title: '博客平台',
      description: '使用Next.js和MDX构建的现代博客平台，支持语法高亮和暗色模式。',
      tags: ['Next.js', 'MDX', 'Vercel'],
      link: '#'
    }
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">精选项目</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            展示我最近完成的一些个人和专业项目
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={project.link}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                查看项目 →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            查看更多项目
          </Link>
        </div>
      </div>
    </section>
  )
}