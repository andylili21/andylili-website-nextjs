'use client'

import { useState } from 'react'

export default function TimePlanningPage() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: '工作',
      plannedTime: 8,
      actualTime: 7.5,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: '学习',
      plannedTime: 2,
      actualTime: 1.5,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: '运动',
      plannedTime: 1,
      actualTime: 1.0,
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      name: '娱乐',
      plannedTime: 2,
      actualTime: 3.5,
      color: 'bg-purple-500'
    }
  ])

  const totalTime = {
    planned: activities.reduce((sum, activity) => sum + activity.plannedTime, 0),
    actual: activities.reduce((sum, activity) => sum + activity.actualTime, 0)
  }

  return (
    <main className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">时间规划与追踪</h1>
        <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
          记录和分析每日时间分配，优化时间利用效率
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">今日时间分配</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{activity.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {activity.actualTime}h / {activity.plannedTime}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${activity.color}`} 
                    style={{ 
                      width: `${Math.min(100, (activity.actualTime / activity.plannedTime) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">时间统计</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">计划时间</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{totalTime.planned} 小时</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">实际时间</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{totalTime.actual} 小时</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">时间差</span>
                <span className={`font-medium ${totalTime.actual > totalTime.planned ? 'text-green-600' : 'text-red-600'}`}>
                  {totalTime.actual - totalTime.planned > 0 ? '+' : ''}{(totalTime.actual - totalTime.planned).toFixed(1)} 小时
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 mb-3 dark:text-gray-200">时间流失分析</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  社交媒体: 1.5 小时
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  无意识浏览: 0.8 小时
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  打断时间: 0.5 小时
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">时间日志</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">活动</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">计划时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">实际时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">效率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">备注</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{activity.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{activity.plannedTime} 小时</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{activity.actualTime} 小时</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.actualTime >= activity.plannedTime 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                    }`}>
                      {Math.round((activity.actualTime / activity.plannedTime) * 100)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {activity.actualTime > activity.plannedTime ? '超时' : activity.actualTime < activity.plannedTime ? '未完成' : '按时完成'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}