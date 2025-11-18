// app/layout.js
import './globals.css'
import type { ReactNode } from 'react'
import { getTheme } from './lib/theme';
import CyberHeader from './components/CyberHeader';
import CyberFooter from './components/CyberFooter';



export const metadata = {
  title: '我的个人网站 | 开发者与博主',
  description: '个人网站与技术博客，分享Web开发、编程技巧和项目经验',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  
  const initialTheme = getTheme();

  return (
    <html lang="zh-CN" data-theme={initialTheme}>
      <body>
        <div className="flex flex-col min-h-screen">
          <CyberHeader />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <CyberFooter />
        </div>
      </body>
    </html>
  )
}
