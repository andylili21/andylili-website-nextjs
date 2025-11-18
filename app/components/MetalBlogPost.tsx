'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  status: string;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  readingTime: number | null;
  viewCount: number;
  tags: string | null;
  category: {
    name: string;
  } | null;
}

interface MetalBlogPostProps {
  post: Post;
}

export default function MetalBlogPost({ post }: MetalBlogPostProps) {
  const [formattedContent, setFormattedContent] = useState<string>('');

  // 简单的 Markdown 转换
  useEffect(() => {
    if (post.content) {
      // 转换 Markdown 标题
      let content = post.content
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-cyan-300">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-blue-300">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5 text-cyan-400">$1</h1>')
        
        // 转换粗体和斜体
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.*)\*/gim, '<em class="italic text-gray-300">$1</em>')
        
        // 转换代码块
        .replace(/`([^`]+)`/gim, '<code class="px-2 py-1 bg-gray-800 rounded text-cyan-300 font-mono">$1</code>')
        
        // 转换段落
        .replace(/\n\n/gim, '</p><p class="mb-4">')
        .replace(/^(.*)$/gim, '<p class="mb-4">$1</p>');
      
      // 处理段落开头
      if (!content.startsWith('<p')) {
        content = '<p class="mb-4">' + content;
      }
      
      setFormattedContent(content);
    }
  }, [post.content]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <motion.article 
          className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 草稿标签 */}
          {post.status === 'DRAFT' && (
            <div className="bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                该文章为草稿状态，仅你个人可见
              </p>
            </div>
          )}

          {/* 文章封面图 */}
          {post.coverImage && (
            <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* 文章头部信息 */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 flex-wrap gap-2">
                {post.status === 'DRAFT' && (
                  <span className="bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium border border-yellow-500/30">
                    草稿
                  </span>
                )}
                {post.category && (
                  <span className="bg-gradient-to-r from-blue-600/30 to-cyan-700/30 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/30">
                    {post.category.name}
                  </span>
                )}
                <time dateTime={post.publishedAt || post.createdAt}>
                  {(post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt)).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.readingTime && (
                  <span>阅读时间: {post.readingTime} 分钟</span>
                )}
                <span>浏览: {post.viewCount} 次</span>
              </div>

              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {post.excerpt}
              </motion.p>
            </header>

            {/* 文章内容 */}
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedContent || post.content }}
              />
            </motion.div>

            {/* 文章标签 */}
            {post.tags && (
              <footer className="mt-12 pt-8 border-t border-gray-700/50">
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </div>
        </motion.article>

        {/* 导航按钮 */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 border border-gray-600"
          >
            <svg className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回文章列表</span>
          </Link>
          {post.status === 'DRAFT' && (
            <Link
              href={`/blog/create?edit=${post.id}`}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>编辑文章</span>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}