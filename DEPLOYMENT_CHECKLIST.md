# 部署检查清单

## 前端部署到 Vercel

### ✅ 准备工作
- [ ] 代码已推送到 GitHub 仓库
- [ ] GitHub 仓库已连接到 Vercel
- [ ] Vercel 项目已创建

### ✅ Vercel 配置
- [ ] Framework: Next.js (自动检测)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Environment Variables:
  - [ ] `NEXT_PUBLIC_API_URL`: 设置为 Railway 后端地址

### ✅ 部署
- [ ] 点击 "Deploy" 按钮
- [ ] 等待部署完成
- [ ] 记录前端部署地址

## 后端部署到 Railway

### ✅ 准备工作
- [ ] GitHub 仓库已连接到 Railway
- [ ] Railway 项目已创建

### ✅ 数据库设置
- [ ] 在 Railway 上创建 PostgreSQL 数据库
- [ ] 获取数据库连接字符串
- [ ] 设置 `DATABASE_URL` 环境变量

### ✅ 环境变量配置
- [ ] `DATABASE_URL`: PostgreSQL 连接字符串
- [ ] `ALLOWED_ORIGINS`: Vercel 前端地址
- [ ] `NODE_ENV`: production
- [ ] `PORT`: 3001 (可选)

### ✅ Railway 配置
- [ ] Service Type: Web Service
- [ ] Build Command: `cd server && npm install && ./migrate.sh`
- [ ] Start Command: `cd server && ./start.sh`

### ✅ 部署
- [ ] 点击 "Deploy" 按钮
- [ ] 等待部署完成
- [ ] 记录后端部署地址

## 部署后验证

### ✅ 前端验证
- [ ] 访问前端地址，确保页面正常加载
- [ ] 检查主题切换功能
- [ ] 检查国际化功能
- [ ] 检查博客列表页面

### ✅ 后端验证
- [ ] 访问后端健康检查接口: `https://your-railway-app.up.railway.app/api/health`
- [ ] 检查 API 文档 (如果有的话)
- [ ] 验证 CORS 配置

### ✅ 集成验证
- [ ] 在前端创建一篇博客文章
- [ ] 验证数据是否正确保存到数据库
- [ ] 检查博客文章详情页面是否能正常显示
- [ ] 验证跨域请求是否正常工作

## 常见问题排查

### ❌ CORS 问题
- [ ] 检查 `ALLOWED_ORIGINS` 环境变量是否包含前端地址
- [ ] 检查前端 `NEXT_PUBLIC_API_URL` 是否指向正确的后端地址

### ❌ 数据库连接问题
- [ ] 检查 `DATABASE_URL` 是否正确
- [ ] 确保 Railway PostgreSQL 数据库已正确配置
- [ ] 验证网络连接和防火墙设置

### ❌ 部署失败
- [ ] 检查构建日志
- [ ] 确认所有依赖已正确安装
- [ ] 验证环境变量配置

## 自定义域名配置 (可选)

### ✅ Vercel 自定义域名
- [ ] 在 Vercel 项目设置中添加自定义域名
- [ ] 配置 DNS 记录
- [ ] 等待 SSL 证书颁发

### ✅ Railway 自定义域名
- [ ] 在 Railway 项目设置中添加自定义域名
- [ ] 配置 DNS 记录
- [ ] 等待 SSL 证书颁发

## 监控和维护

### ✅ 监控设置
- [ ] 设置前端性能监控
- [ ] 设置后端错误监控
- [ ] 设置数据库性能监控

### ✅ 备份策略
- [ ] 设置数据库自动备份
- [ ] 定期备份重要数据
- [ ] 测试恢复流程

### ✅ 安全检查
- [ ] 定期更新依赖
- [ ] 检查安全漏洞
- [ ] 验证访问控制