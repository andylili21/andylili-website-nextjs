// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '我的个人网站 | 开发者与博主',
  description: '个人网站与技术博客，分享Web开发、编程技巧和项目经验',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}