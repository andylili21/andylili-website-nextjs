/**
 * API 客户端基础封装
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

/**
 * 自定义错误类
 */
class APIError extends Error {
  constructor(message, code, statusCode, details = null) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * 基础请求方法
 * @param {String} endpoint - API 端点（不包含 base URL）
 * @param {Object} options - fetch 选项
 * @returns {Promise} 解析后的响应数据
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // 检查响应格式
    if (!response.ok) {
      // HTTP 错误
      if (data.error) {
        throw new APIError(
          data.error.message || 'API 请求失败',
          data.error.code || 'UNKNOWN_ERROR',
          response.status,
          data.error.details
        );
      }
      throw new APIError(
        `HTTP ${response.status}: ${response.statusText}`,
        'HTTP_ERROR',
        response.status
      );
    }

    // 检查业务逻辑错误
    if (data.success === false) {
      throw new APIError(
        data.error?.message || 'API 返回错误',
        data.error?.code || 'API_ERROR',
        response.status,
        data.error?.details
      );
    }

    // 返回数据部分
    return data.data || data;
  } catch (error) {
    // 网络错误或其他异常
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error.message || '网络请求失败',
      'NETWORK_ERROR',
      0
    );
  }
}

/**
 * GET 请求
 */
export async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return request(url, { method: 'GET' });
}

/**
 * POST 请求
 */
export async function post(endpoint, data = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export async function put(endpoint, data = {}) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export async function del(endpoint) {
  return request(endpoint, { method: 'DELETE' });
}

export { APIError };
