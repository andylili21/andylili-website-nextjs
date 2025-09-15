'use client'

// import Header from '../components/Header'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  // Sample project data - you can replace this with your actual project data
  const projects = [
    {
      id: 1,
      title: "电商网站开发",
      description: "使用React和Node.js构建的全栈电商平台，包含商品展示、购物车、支付等功能。",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://www.youtube.com/watch?v=V-QO-KO90iQ",
      githubUrl: "https://zh-hans.react.dev/",
      demoUrl: "https://zh-hans.react.dev/"
    },
    {
      id: 2,
      title: "任务管理应用",
      description: "基于Next.js的协作任务管理工具，支持团队协作、任务分配和进度跟踪。",
      technologies: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
      image: "/images/filename.png",

      githubUrl: "https://zh-hans.react.dev/",
      demoUrl: "https://zh-hans.react.dev/"
    },
    {
      id: 3,
      title: "数据分析仪表板",
      description: "可视化数据分析平台，集成多种图表和数据展示方式，帮助企业分析业务指标。",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      image: "/images/filename.png",

      githubUrl: "https://zh-hans.react.dev/",
      demoUrl: "https://zh-hans.react.dev/"
    }
  ]

  return (
    <main>
      {/* <Header /> */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">项目经验</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            以下是我参与和主导的一些项目，涵盖了不同的技术栈和应用场景
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}