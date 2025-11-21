# 个人网站全栈项目

基于 Next.js 15 和 Prisma 的现代化全栈个人网站，采用前后端分离架构，支持博客管理、项目展示、国际化和暗色模式。

## ✨ 技术栈

### 前端
- **框架**: Next.js 15.5.2 (App Router)
- **UI**: React 19, TailwindCSS 4
- **国际化**: next-intl, i18next
- **动画**: Framer Motion
- **Markdown**: remark, remark-html

### 后端
- **运行时**: Node.js
- **框架**: Express 5
- **ORM**: Prisma
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **验证**: express-validator
- **安全**: helmet, cors
- **日志**: morgan

## 📁 项目结构

```
andylili-website-nextjs/
├── app/                      # Next.js App Router
│   ├── [locale]/            # 国际化路由
│   ├── lib/                 # 工具函数和 API 客户端
│   │   └── api/             # API 客户端封装
│   │       ├── client.js    # 基础请求方法
│   │       ├── posts.js     # 文章 API
│   │       └── projects.js  # 项目 API
│   └── globals.css          # 全局样式
├── components/              # React 组件
│   └── ui/                  # UI 组件库
├── server/                  # 后端服务器
│   ├── src/
│   │   ├── config/          # 配置文件
│   │   │   ├── database.js  # Prisma 客户端单例
│   │   │   └── server.js    # 服务器配置
│   │   ├── controllers/     # 控制器层
│   │   │   ├── postController.js
│   │   │   └── projectController.js
│   │   ├── services/        # 服务层（业务逻辑）
│   │   │   ├── postService.js
│   │   │   └── projectService.js
│   │   ├── middlewares/     # 中间件
│   │   │   ├── errorHandler.js  # 错误处理
│   │   │   ├── validator.js     # 参数验证
│   │   │   └── logger.js        # 日志记录
│   │   ├── utils/           # 工具函数
│   │   │   ├── response.js  # 统一响应格式
│   │   │   └── helpers.js   # 辅助函数
│   │   ├── routes/          # 路由定义
│   │   │   ├── posts.js
│   │   │   └── projects.js
│   │   └── app.js           # 应用入口
│   └── .env                 # 后端环境变量
├── prisma/                  # Prisma 配置
│   ├── schema.prisma        # 数据库模型
│   ├── seed.js              # 种子数据
│   └── migrations/          # 数据库迁移文件
├── public/                  # 静态资源
├── .env.local               # 前端环境变量
└── package.json             # 项目依赖
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

**前端配置** (`.env.local`):
```bash
# 复制示例文件
cp .env.local.example .env.local

# 编辑配置
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**后端配置** (`server/.env`):
```bash
# 复制示例文件
cp server/.env.example server/.env

# 编辑配置
DATABASE_URL="file:./prisma/dev.db"
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. 初始化数据库

```bash
# 生成 Prisma Client
npm run db:generate

# 执行数据库迁移（创建表结构）
npm run db:migrate

# 填充种子数据（测试数据）
npm run db:seed
```

### 4. 启动服务

**开发环境**（需要两个终端）:

```bash
# 终端 1: 启动后端服务器
npm run server:dev

# 终端 2: 启动前端开发服务器
npm run dev
```

**访问应用**:
- 前端: http://localhost:3000
- 后端 API: http://localhost:3001/api
- 健康检查: http://localhost:3001/api/health
- 数据库管理: `npm run db:studio` (打开 Prisma Studio)

## 📡 API 文档

### 统一响应格式

**成功响应**:
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**错误响应**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "title",
        "message": "文章标题不能为空"
      }
    ]
  }
}
```

### 文章 API

| 端点 | 方法 | 描述 | 参数 |
|------|------|------|------|
| `/api/posts` | GET | 获取文章列表 | page, limit, status, featured |
| `/api/posts/:id` | GET | 获取单篇文章（按ID） | - |
| `/api/posts/slug/:slug` | GET | 获取单篇文章（按slug） | - |
| `/api/posts` | POST | 创建文章 | title, content, excerpt, tags, etc. |
| `/api/posts/:id` | PUT | 更新文章 | 更新字段 |
| `/api/posts/:id` | DELETE | 删除文章 | - |
| `/api/posts/:slug/view` | POST | 增加阅读量 | - |

**获取文章列表示例**:
```bash
curl "http://localhost:3001/api/posts?page=1&limit=10&status=PUBLISHED"
```

**创建文章示例**:
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的第一篇文章",
    "content": "# 标题\n\n正文内容...",
    "excerpt": "文章摘要",
    "tags": "Next.js,React",
    "status": "PUBLISHED"
  }'
```

### 项目 API

| 端点 | 方法 | 描述 | 参数 |
|------|------|------|------|
| `/api/projects` | GET | 获取项目列表 | page, limit, status, featured |
| `/api/projects/:id` | GET | 获取单个项目 | - |
| `/api/projects` | POST | 创建项目 | title, description, technologies, etc. |
| `/api/projects/:id` | PUT | 更新项目 | 更新字段 |
| `/api/projects/:id` | DELETE | 删除项目 | - |

## 🗄️ 数据库模型

### Post (文章)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 主键 |
| slug | String | URL友好标识（唯一） |
| title | String | 标题 |
| excerpt | String | 摘要 |
| content | String | 内容（Markdown） |
| coverImage | String? | 封面图片URL |
| publishedAt | DateTime? | 发布时间 |
| readingTime | Int? | 阅读时长（分钟） |
| featured | Boolean | 是否精选 |
| viewCount | Int | 阅读量 |
| status | PostStatus | 状态（DRAFT/PUBLISHED） |
| tags | String | 标签（逗号分隔） |
| categoryId | Int? | 分类ID |

### Project (项目)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 主键 |
| title | String | 标题 |
| description | String | 描述 |
| technologies | String | 技术栈（逗号分隔） |
| coverImage | String? | 封面图片URL |
| githubUrl | String? | GitHub链接 |
| demoUrl | String? | 演示链接 |
| featured | Boolean | 是否精选 |
| order | Int | 排序值 |
| status | ProjectStatus | 状态（ACTIVE/ARCHIVED） |

### Category (分类)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 主键 |
| name | String | 名称（唯一） |
| slug | String | URL标识（唯一） |

## 🛠️ 开发指南

### 可用脚本

```bash
# 前端开发
npm run dev              # 启动前端开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器

# 后端开发
npm run server:dev       # 启动后端开发服务器（自动重启）
npm run server:start     # 启动后端生产服务器

# 数据库管理
npm run db:generate      # 生成 Prisma Client
npm run db:migrate       # 执行数据库迁移
npm run db:seed          # 填充种子数据
npm run db:studio        # 打开 Prisma Studio
npm run db:reset         # 重置数据库（删除所有数据）

# 代码检查
npm run lint             # ESLint 代码检查
```

### 添加新 API 端点

1. **在 Service 层添加业务逻辑** (`server/src/services/`)
2. **在 Controller 层添加请求处理** (`server/src/controllers/`)
3. **在 Routes 中定义路由** (`server/src/routes/`)
4. **添加验证规则** (`server/src/middlewares/validator.js`)
5. **在前端封装 API 方法** (`app/lib/api/`)

### 修改数据库模型

1. 编辑 `prisma/schema.prisma`
2. 运行 `npm run db:migrate` 创建迁移
3. 运行 `npm run db:generate` 更新 Prisma Client

### 前端调用 API 示例

```javascript
// 在 Server Component 中
import { getAllPosts } from '@/app/lib/api/posts';

export default async function BlogPage() {
  try {
    const data = await getAllPosts({ page: 1, limit: 10, status: 'PUBLISHED' });
    const { posts, pagination } = data;
    
    return (
      <div>
        {posts.map(post => (
          <article key={post.id}>{post.title}</article>
        ))}
      </div>
    );
  } catch (error) {
    console.error('获取文章失败:', error);
    return <div>加载失败</div>;
  }
}
```

## 🧪 测试

### 手动测试 API

使用 curl 或 Postman 测试端点:

```bash
# 测试健康检查
curl http://localhost:3001/api/health

# 获取文章列表
curl http://localhost:3001/api/posts

# 获取单篇文章
curl http://localhost:3001/api/posts/slug/getting-started-with-nextjs

# 创建文章（需要完整数据）
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d @test-post.json
```

## 📦 部署

### 前端部署 (Vercel)

```bash
# 推送到 GitHub
git push origin main

# 在 Vercel 导入项目
# 设置环境变量: NEXT_PUBLIC_API_BASE_URL
```

### 后端部署 (Railway)

```bash
# 在 Railway 创建新项目
# 连接 GitHub 仓库
# 设置环境变量:
#   DATABASE_URL
#   PORT
#   NODE_ENV=production
#   ALLOWED_ORIGINS
```

### 数据库部署

- **开发**: SQLite (本地文件)
- **生产**: PostgreSQL (Supabase / Railway)

修改 `prisma/schema.prisma` 中的 `datasource`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## ❓ 常见问题

### 1. 端口已被占用

```bash
# 查看占用端口的进程
lsof -i :3001

# 修改端口（server/.env）
PORT=3002
```

### 2. Prisma Client 未生成

```bash
npm run db:generate
```

### 3. 数据库连接失败

检查 `DATABASE_URL` 是否正确配置:
```bash
# server/.env
DATABASE_URL="file:./prisma/dev.db"
```

### 4. CORS 错误

确保 `server/.env` 中的 `ALLOWED_ORIGINS` 包含前端域名:
```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 5. API 返回 404

- 检查后端服务器是否启动
- 确认 `NEXT_PUBLIC_API_BASE_URL` 配置正确
- 查看浏览器控制台网络请求

## 📝 后续扩展

### 短期功能
- [ ] 文章搜索功能
- [ ] 标签筛选
- [ ] 分类管理 API
- [ ] 文章评论系统

### 中期功能
- [ ] 用户认证（JWT）
- [ ] 管理后台界面
- [ ] 图片上传
- [ ] Markdown 编辑器

### 长期规划
- [ ] 迁移到 PostgreSQL
- [ ] Redis 缓存
- [ ] Elasticsearch 全文搜索
- [ ] Docker 容器化
- [ ] CI/CD 自动化部署

## 📄 许可证

MIT License

## 👤 作者

Andy Li

---

**提示**: 本项目是学习全栈开发的实战项目，涵盖了前后端分离、API 设计、数据库建模等核心技能。
