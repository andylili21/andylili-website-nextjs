'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            正在加载中
          </h1>
          
          <p className="text-gray-400 mb-8">
            正在为您准备内容，请稍候...
          </p>
          
          <div className="flex justify-center">
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              ></motion.div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="h-2 bg-gray-800 rounded-full"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  delay: item * 0.2
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}