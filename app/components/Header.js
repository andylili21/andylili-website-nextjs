// app/components/Header.js
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              我的空间
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              首页
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
              博客
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
              项目
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              关于我
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              联系
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                博客
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                项目
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                关于我
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                联系
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}