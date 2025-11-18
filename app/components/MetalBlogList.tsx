'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string | null;
  category: {
    name: string;
  } | null;
}

interface MetalBlogListProps {
  initialPosts: Post[];
}

export default function MetalBlogList({ initialPosts }: MetalBlogListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  // 过滤文章
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category?.name && post.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* 头部区域 */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                博客文章
              </h1>
              <p className="text-gray-400 mt-2">
                探索我的技术分享与思考
              </p>
            </div>
            
            <Link 
              href="/blog/create"
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                创建文章
              </span>
            </Link>
          </div>

          {/* 搜索框 */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* 文章列表 */}
        {filteredPosts.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
            <p className="text-gray-400">还没有发布任何文章，快来创建第一篇吧！</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-700/30">
                        <div className="flex items-center space-x-3">
                          {post.category?.name && (
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                              {post.category.name}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span className="text-sm text-gray-400">
                              {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                            </span>
                          )}
                        </div>
                        
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}