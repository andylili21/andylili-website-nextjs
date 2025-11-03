const { errorResponse, ErrorCodes } = require('../utils/response');

/**
 * 统一错误处理中间件
 */
function errorHandler(error, req, res, next) {
  console.error('❌ Error:', error);

  // Prisma 错误处理
  if (error.code === 'P2002') {
    // 唯一性约束冲突
    return res.status(409).json(
      errorResponse(
        ErrorCodes.CONFLICT,
        '数据冲突：该记录已存在',
        error.meta ? [{ field: error.meta.target, message: '字段值已存在' }] : null
      )
    );
  }

  if (error.code === 'P2025') {
    // 记录不存在
    return res.status(404).json(
      errorResponse(ErrorCodes.NOT_FOUND, '请求的资源不存在')
    );
  }

  // 验证错误（express-validator）
  if (error.type === 'validation') {
    return res.status(400).json(
      errorResponse(ErrorCodes.VALIDATION_ERROR, error.message, error.details)
    );
  }

  // 默认服务器错误
  const statusCode = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'development'
      ? error.message
      : '服务器内部错误，请稍后重试';

  res.status(statusCode).json(
    errorResponse(ErrorCodes.INTERNAL_ERROR, message)
  );
}

/**
 * 404 路由处理
 */
function notFoundHandler(req, res) {
  res.status(404).json(
    errorResponse(ErrorCodes.NOT_FOUND, `路由 ${req.method} ${req.path} 不存在`)
  );
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
