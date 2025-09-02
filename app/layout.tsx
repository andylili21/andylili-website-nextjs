// app/layout.js
import './globals.css'
import type { ReactNode } from 'react'



export const metadata = {
  title: '我的个人网站 | 开发者与博主',
  description: '个人网站与技术博客，分享Web开发、编程技巧和项目经验',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
