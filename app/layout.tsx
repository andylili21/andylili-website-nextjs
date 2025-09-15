// app/layout.js
import ThemeToggle from './components/ThemeToggle'
import './globals.css'
import type { ReactNode } from 'react'
import { getTheme } from './lib/theme';
import Header from './components/Header'



export const metadata = {
  title: '我的个人网站 | 开发者与博主',
  description: '个人网站与技术博客，分享Web开发、编程技巧和项目经验',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  
  const initialTheme = getTheme();

  return (
    <html lang="zh-CN" data-theme={initialTheme}>
      <body>
        <div>
          <Header/>
          {children}
        </div>
      </body>
    </html>
  )
}
