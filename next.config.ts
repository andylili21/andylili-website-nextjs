// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'], // 如果你使用外部图片，需要在这里配置域名
  },
}

module.exports = nextConfig