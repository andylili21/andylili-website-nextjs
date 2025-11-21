'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  coverImage: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
  status: string;
}

interface CyberProjectsProps {
  initialProjects: Project[];
}

export default function CyberProjects({ initialProjects }: CyberProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<'all' | 'featured' | 'active' | 'archived'>('all');

  // 过滤项目
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    if (filter === 'active') return project.status === 'ACTIVE';
    if (filter === 'archived') return project.status === 'ARCHIVED';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* 头部区域 */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            项目展示
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            探索我的技术项目与创意作品
          </p>
        </motion.div>

        {/* 过滤器 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {(['all', 'featured', 'active', 'archived'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {filterType === 'all' && '全部'}
              {filterType === 'featured' && '精选'}
              {filterType === 'active' && '活跃'}
              {filterType === 'archived' && '归档'}
            </button>
          ))}
        </motion.div>

        {/* 项目网格 */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">暂无项目</h3>
            <p className="text-gray-400">还没有符合条件的项目展示</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-full rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  {/* 项目封面 */}
                  <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
                    {project.coverImage ? (
                      <img 
                        src={project.coverImage} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    
                    {/* 精选标签 */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
                          精选
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 项目信息 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* 技术栈 */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <Link 
                          href={project.githubUrl}
                          target="_blank"
                          className="flex-1 text-center px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors text-sm"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.demoUrl && (
                        <Link 
                          href={project.demoUrl}
                          target="_blank"
                          className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm"
                        >
                          演示
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}