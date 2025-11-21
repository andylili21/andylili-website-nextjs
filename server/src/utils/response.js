/**
 * 统一响应格式工具
 */

/**
 * 成功响应
 * @param {Object|Array} data - 业务数据
 * @param {Object} pagination - 分页信息（可选）
 * @returns {Object} 标准响应对象
 */
function successResponse(data, pagination = null) {
  const response = {
    success: true,
    data,
  };
  
  if (pagination) {
    response.pagination = pagination;
  }
  
  return response;
}

/**
 * 错误响应
 * @param {String} code - 错误代码
 * @param {String} message - 错误消息
 * @param {Array} details - 详细错误列表（可选）
 * @returns {Object} 标准错误响应对象
 */
function errorResponse(code, message, details = null) {
  const response = {
    success: false,
    error: {
      code,
      message,
    },
  };
  
  if (details && details.length > 0) {
    response.error.details = details;
  }
  
  return response;
}

/**
 * 错误代码常量
 */
const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
};

module.exports = {
  successResponse,
  errorResponse,
  ErrorCodes,
};
