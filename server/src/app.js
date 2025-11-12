const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { PORT, ALLOWED_ORIGINS, REQUEST_SIZE_LIMIT } = require('./config/server');
const requestLogger = require('./middlewares/logger');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');
const { successResponse } = require('./utils/response');

// 导入路由
const postsRouter = require('./routes/posts');
const projectsRouter = require('./routes/projects');

const app = express();

// 安全中间件
app.use(helmet());

// CORS配置
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
}));

// 请求体解析
app.use(express.json({ limit: REQUEST_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_SIZE_LIMIT }));

// 请求日志
app.use(requestLogger);

// 健康检查路由
app.get('/api/health', (req, res) => {
  res.json(successResponse({
    status: 'OK',
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  }));
});

// API 路由
app.use('/api/posts', postsRouter);
app.use('/api/projects', projectsRouter);

// 404 处理
app.use((req, res, next) => notFoundHandler(req, res, next));

// 错误处理中间件（必须放在最后）
app.use(errorHandler);

// 启动服务器
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 服务器已启动`);
    console.log(`📡 端口: ${PORT}`);
    console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 API地址: http://localhost:${PORT}/api`);
    console.log(`✅ 健康检查: http://localhost:${PORT}/api/health`);
    console.log('=================================');
  });
}

module.exports = app;
