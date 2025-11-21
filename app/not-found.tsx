'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            404
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            页面未找到
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            抱歉，您要查找的页面不存在。可能是因为页面已被移除、名称已更改或暂时不可用。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-lg"
            >
              返回首页
            </Link>
            
            <Link 
              href="/blog"
              className="px-8 py-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold text-lg border border-gray-700"
            >
              浏览博客
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-400">博客文章</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm text-gray-400">项目展示</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-green-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm text-gray-400">时间规划</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-yellow-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-sm text-gray-400">驾驶舱</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}