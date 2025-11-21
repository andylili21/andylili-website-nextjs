const morgan = require('morgan');

/**
 * HTTP 请求日志中间件
 */
const requestLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    skip: (req, res) => {
      // 跳过健康检查日志
      return req.path === '/api/health';
    },
  }
);

module.exports = requestLogger;
