'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Activity {
  id: number;
  name: string;
  plannedTime: number;
  actualTime: number;
  color: string;
}

export default function CyberTimePlanning() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      name: '工作',
      plannedTime: 8,
      actualTime: 7.5,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 2,
      name: '学习',
      plannedTime: 2,
      actualTime: 1.5,
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 3,
      name: '运动',
      plannedTime: 1,
      actualTime: 1.0,
      color: 'from-yellow-500 to-amber-400'
    },
    {
      id: 4,
      name: '娱乐',
      plannedTime: 2,
      actualTime: 3.5,
      color: 'from-purple-500 to-fuchsia-400'
    }
  ]);

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

  const totalTime = {
    planned: activities.reduce((sum, activity) => sum + activity.plannedTime, 0),
    actual: activities.reduce((sum, activity) => sum + activity.actualTime, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/20 to-gray-900/0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* 头部区域 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            时间规划与追踪
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            记录和分析每日时间分配，优化时间利用效率
          </p>
          
          <div className="mt-6 text-center">
            <div className="text-2xl font-mono">{time}</div>
            <div className="text-sm text-gray-500">{date}</div>
          </div>
        </motion.div>

        {/* 时间分配图表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              今日时间分配
            </h2>
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={activity.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-300">{activity.name}</span>
                    <span className="text-gray-400 text-sm">
                      {activity.actualTime}h / {activity.plannedTime}h
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${activity.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (activity.actualTime / activity.plannedTime) * 100)}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              时间统计
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-gray-400 mb-1">计划时间</div>
                  <div className="text-2xl font-bold text-cyan-400">{totalTime.planned} 小时</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-gray-400 mb-1">实际时间</div>
                  <div className="text-2xl font-bold text-green-400">{totalTime.actual} 小时</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">时间差</div>
                    <div className={`text-xl font-bold ${totalTime.actual > totalTime.planned ? 'text-green-400' : 'text-red-400'}`}>
                      {totalTime.actual - totalTime.planned > 0 ? '+' : ''}{(totalTime.actual - totalTime.planned).toFixed(1)} 小时
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <h3 className="font-bold text-gray-300 mb-4">时间流失分析</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                      <span className="text-gray-400">社交媒体</span>
                    </div>
                    <span className="text-gray-300">1.5 小时</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                      <span className="text-gray-400">无意识浏览</span>
                    </div>
                    <span className="text-gray-300">0.8 小时</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                      <span className="text-gray-400">打断时间</span>
                    </div>
                    <span className="text-gray-300">0.5 小时</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 时间日志表格 */}
        <motion.div 
          className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            时间日志
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">活动</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">计划时间</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">实际时间</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">效率</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">备注</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <motion.tr 
                    key={activity.id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <td className="px-4 py-4 text-gray-300">{activity.name}</td>
                    <td className="px-4 py-4 text-gray-400">{activity.plannedTime} 小时</td>
                    <td className="px-4 py-4 text-gray-400">{activity.actualTime} 小时</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.actualTime >= activity.plannedTime 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {Math.round((activity.actualTime / activity.plannedTime) * 100)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {activity.actualTime > activity.plannedTime ? '超时' : activity.actualTime < activity.plannedTime ? '未完成' : '按时完成'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 底部操作区域 */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
            添加时间记录
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300">
            生成报告
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
            设置目标
          </button>
        </motion.div>
      </div>
    </div>
  );
}