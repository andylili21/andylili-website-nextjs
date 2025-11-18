# 部署指南

本项目采用前后端分离部署方案：
- 前端部署到 Vercel
- 后端部署到 Railway

## 前端部署到 Vercel

### 1. 准备工作
1. 确保代码已推送到 GitHub 仓库
2. 在 Vercel 上连接你的 GitHub 账户
3. 选择对应的仓库进行部署

### 2. Vercel 配置
- **Framework**: Next.js (自动检测)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL`: 设置为你的 Railway 后端地址

### 3. 自定义域名 (可选)
在 Vercel 项目设置中配置自定义域名。

## 后端部署到 Railway

### 1. 准备工作
1. 确保代码已推送到 GitHub 仓库
2. 在 Railway 上连接你的 GitHub 账户
3. 选择对应的仓库进行部署

### 2. Railway 配置
- **Service Type**: Web Service
- **Build Command**: `cd server && npm install && ./migrate.sh`
- **Start Command**: `cd server && ./start.sh`
- **Environment Variables**:
  - `DATABASE_URL`: Railway PostgreSQL 数据库连接字符串
  - `ALLOWED_ORIGINS`: 你的 Vercel 前端地址
  - `NODE_ENV`: production

### 3. 数据库设置
1. 在 Railway 上创建 PostgreSQL 数据库
2. 获取数据库连接字符串并设置 `DATABASE_URL` 环境变量
3. Railway 会自动运行数据库迁移和种子数据脚本

### 4. 手动数据库操作（可选）
如果需要手动运行数据库操作，可以使用 Railway 的 shell 功能：

```bash
# 进入 Railway shell
# 运行数据库迁移
npx prisma migrate deploy

# 运行种子数据
npx prisma db seed

# 生成 Prisma Client
npx prisma generate
```

### 5. 自定义域名 (可选)
在 Railway 项目设置中配置自定义域名。

## 环境变量配置

### 前端环境变量 (.env.production)
```bash
NEXT_PUBLIC_API_URL="https://your-railway-app.up.railway.app/api"
```

### 后端环境变量 (.env.production)
```bash
NODE_ENV=production
PORT=3001
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
ALLOWED_ORIGINS="https://your-vercel-app.vercel.app"
```

## 部署后验证

1. 访问前端地址，确保页面正常加载
2. 访问后端健康检查接口: `https://your-railway-app.up.railway.app/api/health`
3. 在前端创建一篇博客文章，验证数据是否正确保存到数据库
4. 检查博客文章详情页面是否能正常显示

## 常见问题

### CORS 问题
如果遇到跨域问题，请确保:
1. `ALLOWED_ORIGINS` 环境变量包含你的前端地址
2. 前端 `NEXT_PUBLIC_API_URL` 指向正确的后端地址

### 数据库连接问题
如果后端无法连接数据库:
1. 检查 `DATABASE_URL` 是否正确
2. 确保 Railway PostgreSQL 数据库已正确配置
3. 验证网络连接和防火墙设置