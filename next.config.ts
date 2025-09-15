// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['www.baidu.com','https://www.youtube.com','zh-hans.react.dev'], // 添加百度域名以解决图片加载问题
    // domains: ['images.unsplash.com'], // 如果你使用外部图片，需要在这里配置域名
  },
    i18n: {
    // locales: ['zh', 'en'], // 支持的语言
    locales: ['zh'], // 支持的语言
    defaultLocale: 'zh',  // 默认语言
  },

}

module.exports = nextConfig