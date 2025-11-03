# 🚀 快速启动指南

本指南将帮助你在 5 分钟内启动项目。

## 前置要求

- Node.js 18+ 
- npm 或 yarn

## 快速启动步骤

### 1️⃣ 安装依赖

```bash
npm install
```

### 2️⃣ 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.local.example .env.local
cp server/.env.example server/.env

# 使用默认配置即可，无需修改
```

### 3️⃣ 初始化数据库

```bash
# 一键执行所有数据库初始化步骤
npm run db:generate && npm run db:migrate && npm run db:seed
```

等待完成后，你将看到类似输出：
```
🌱 开始填充种子数据...
📁 创建分类...
✅ 创建了 3 个分类
📝 创建文章...
✅ 创建了 4 篇文章
💼 创建项目...
✅ 创建了 3 个项目
✨ 种子数据填充完成！
```

### 4️⃣ 启动服务

打开**两个终端窗口**：

**终端 1 - 启动后端**:
```bash
npm run server:dev
```

看到以下输出表示成功：
```
=================================
🚀 服务器已启动
📡 端口: 3001
🌍 环境: development
📊 API地址: http://localhost:3001/api
✅ 健康检查: http://localhost:3001/api/health
=================================
```

**终端 2 - 启动前端**:
```bash
npm run dev
```

看到以下输出表示成功：
```
  ▲ Next.js 15.5.2
  - Local:        http://localhost:3000
```

### 5️⃣ 验证安装

打开浏览器访问：

- ✅ **前端**: http://localhost:3000
- ✅ **后端健康检查**: http://localhost:3001/api/health
- ✅ **获取文章列表**: http://localhost:3001/api/posts

## 📊 查看数据库

打开 Prisma Studio（可视化数据库管理工具）：

```bash
npm run db:studio
```

浏览器会自动打开 http://localhost:5555，你可以看到：
- 4 篇测试文章（3篇已发布，1篇草稿）
- 3 个测试项目
- 3 个分类

## 🧪 测试 API

### 使用 curl

```bash
# 获取文章列表
curl http://localhost:3001/api/posts

# 获取单篇文章
curl http://localhost:3001/api/posts/slug/getting-started-with-nextjs

# 创建新文章
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试文章",
    "content": "# 测试内容",
    "excerpt": "这是测试摘要",
    "status": "PUBLISHED"
  }'
```

### 使用 Postman

1. 导入 API 端点：http://localhost:3001/api/posts
2. 选择 GET 方法
3. 点击 Send
4. 查看返回的 JSON 数据

## ❓ 遇到问题？

### 问题 1: 端口被占用

```bash
# 修改后端端口（编辑 server/.env）
PORT=3002

# 同时更新前端 API 地址（编辑 .env.local）
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002
```

### 问题 2: npm 命令找不到

```bash
# 检查 Node.js 是否安装
node -v
npm -v

# 如果未安装，请访问 https://nodejs.org 下载安装
```

### 问题 3: 数据库迁移失败

```bash
# 重置数据库（会删除所有数据）
npm run db:reset

# 重新执行初始化
npm run db:migrate && npm run db:seed
```

### 问题 4: 后端启动报错 "Cannot find module"

```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

## 📚 下一步

- 📖 阅读完整文档: [DEVELOPMENT_README.md](./DEVELOPMENT_README.md)
- 🔧 查看 API 文档: [DEVELOPMENT_README.md#-api-文档](./DEVELOPMENT_README.md#-api-文档)
- 🗂️ 了解项目结构: [DEVELOPMENT_README.md#-项目结构](./DEVELOPMENT_README.md#-项目结构)
- 🛠️ 学习开发指南: [DEVELOPMENT_README.md#-开发指南](./DEVELOPMENT_README.md#-开发指南)

## 🎉 成功启动！

现在你可以：
- 访问前端查看博客和项目展示
- 使用 API 进行 CRUD 操作
- 在 Prisma Studio 中管理数据
- 开始开发新功能

**祝你开发愉快！** 🚀
