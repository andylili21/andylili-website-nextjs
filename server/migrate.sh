#!/bin/bash

# Railway 数据库迁移脚本
echo "📦 正在运行数据库迁移..."

# 生成 Prisma Client
echo "🔨 生成 Prisma Client..."
npx prisma generate

# 运行迁移
echo "🚀 运行数据库迁移..."
npx prisma migrate deploy

# 运行种子数据
echo "🌱 运行种子数据..."
node prisma/seed.js

echo "✅ 数据库迁移和种子数据完成!"