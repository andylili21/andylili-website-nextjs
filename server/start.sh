#!/bin/bash

# Railway 启动脚本
echo "🚀 正在启动后端服务..."

# 运行数据库迁移
echo "📦 运行数据库迁移..."
npx prisma migrate deploy

# 运行种子数据（如果需要）
echo "🌱 运行种子数据..."
npx prisma db seed

# 启动服务器
echo "🟢 启动服务器..."
npm start