'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/magicui/marquee';

// 驾驶舱按钮类型
interface CockpitButton {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  glowColor: string;
}

export default function CockpitDashboard() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  // 更新时间和日期
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
      setDate(now.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        weekday: 'long'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 驾驶舱按钮配置
  const cockpitButtons: CockpitButton[] = [
    {
      id: 'blog',
      title: '博客系统',
      description: '访问我的技术博客',
      href: '/blog',
      icon: '📝',
      color: 'from-blue-500 to-cyan-400',
      glowColor: 'shadow-blue-500/50'
    },
    {
      id: 'projects',
      title: '项目展示',
      description: '查看我的作品集',
      href: '/projects',
      icon: '💼',
      color: 'from-purple-500 to-fuchsia-400',
      glowColor: 'shadow-purple-500/50'
    },
    {
      id: 'time-planning',
      title: '时间规划',
      description: '时间管理与分析',
      href: '/time-planning',
      icon: '⏰',
      color: 'from-green-500 to-emerald-400',
      glowColor: 'shadow-green-500/50'
    },
    {
      id: 'create-blog',
      title: '创建博客',
      description: '撰写新文章',
      href: '/blog/create',
      icon: '✏️',
      color: 'from-orange-500 to-amber-400',
      glowColor: 'shadow-orange-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* 主容器 */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* 顶部状态栏 */}
        <div className="flex justify-between items-center mb-12 py-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-gray-400">系统运行中</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono">{time}</div>
            <div className="text-xs text-gray-400">{date}</div>
          </div>
        </div>

        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            飞行驾驶舱
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            欢迎来到我的数字驾驶舱，这里是通往知识与创意的控制中心
          </motion.p>
        </div>

        {/* 功能区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cockpitButtons.map((button, index) => (
            <motion.div
              key={button.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Link href={button.href}>
                <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${button.color} bg-opacity-10 border border-white/10 backdrop-blur-lg transition-all duration-300 group-hover:shadow-2xl group-hover:${button.glowColor}`}>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{button.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{button.title}</h3>
                      <p className="text-gray-300">{button.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-white/80">
                    <span>进入系统</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 底部信息栏 */}
        <div className="mt-16">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">系统状态</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                <div className="text-sm text-gray-400">系统可用性</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">运行时间</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">128</div>
                <div className="text-sm text-gray-400">已发布文章</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">∞</div>
                <div className="text-sm text-gray-400">无限可能</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}