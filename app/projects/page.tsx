'use client'

import CyberProjects from '../components/CyberProjects'

export default function ProjectsPage() {
  // Sample project data - you can replace this with your actual project data
  const projects = [
    {
      id: 1,
      title: "电商网站开发",
      description: "使用React和Node.js构建的全栈电商平台，包含商品展示、购物车、支付等功能。",
      technologies: "React, Node.js, MongoDB, Stripe",
      coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
      featured: true,
      order: 1,
      status: "ACTIVE"
    },
    {
      id: 2,
      title: "任务管理应用",
      description: "基于Next.js的协作任务管理工具，支持团队协作、任务分配和进度跟踪。",
      technologies: "Next.js, TypeScript, Firebase, Tailwind CSS",
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
      featured: true,
      order: 2,
      status: "ACTIVE"
    },
    {
      id: 3,
      title: "数据分析仪表板",
      description: "可视化数据分析平台，集成多种图表和数据展示方式，帮助企业分析业务指标。",
      technologies: "React, D3.js, Python, FastAPI",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
      featured: false,
      order: 3,
      status: "ACTIVE"
    }
  ]

  return (
    <CyberProjects initialProjects={projects} />
  )
}