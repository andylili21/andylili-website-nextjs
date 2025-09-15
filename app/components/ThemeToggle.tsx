// components/ThemeToggle.tsx
'use client'; // Next.js 13+ 客户端组件标识

import { useEffect, useState } from 'react';


export default function ThemeToggle() {
  // 状态：当前是否为暗色模式
  const [isDark, setIsDark] = useState<boolean>(false);

  // 初始化：读取本地存储或系统偏好
  useEffect(() => {
    // 1. 优先读取 localStorage 中保存的用户偏好
    const savedTheme = localStorage.getItem('theme');
    
    // 2. 若没有保存的偏好，使用系统默认设置
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // 3. 确定初始主题
    const initialIsDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    // 4. 更新状态和 HTML 类名
    setIsDark(initialIsDark);
    if (initialIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 切换主题的方法
  const toggleTheme = () => {
    // 1. 切换 html 元素上的 .dark 类
    const newIsDark = !isDark;
    document.documentElement.classList.toggle('dark', newIsDark);
    
    // 2. 更新状态
    setIsDark(newIsDark);
    
    // 3. 保存到 localStorage 持久化
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? '🌞' : '🌙'}切换主题
    </button>
  );
}