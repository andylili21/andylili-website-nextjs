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
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">精选项目</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            展示我最近完成的一些个人和专业项目
          </p>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-sm bg-white/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/70 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <Link 
                href={project.link}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                查看项目
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-block border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            查看更多项目
          </Link>
        </div>
      </div>
    </section>
  )
}