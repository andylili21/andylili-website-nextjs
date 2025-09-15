// app/components/ProjectCard.js
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ project }) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 relative">
        <Image
          src='https://zh-hans.react.dev/images/home/community/react_conf_hallway.webp'
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <Link 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              GitHub
            </Link>
          )}
          {project.demoUrl && (
            <Link 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              演示地址
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}