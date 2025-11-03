/**
 * 文章相关 API 方法
 */

import { get, post, put, del } from './client';

/**
 * 获取文章列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.limit - 每页数量
 * @param {String} params.status - 状态筛选（DRAFT/PUBLISHED）
 * @param {Boolean} params.featured - 是否精选
 * @returns {Promise} { posts: [], pagination: {} }
 */
export async function getAllPosts(params = {}) {
  return get('/api/posts', params);
}

/**
 * 根据 ID 获取文章
 * @param {Number} id - 文章 ID
 * @returns {Promise} Post 对象
 */
export async function getPostById(id) {
  return get(`/api/posts/${id}`);
}

/**
 * 根据 slug 获取文章
 * @param {String} slug - 文章 slug
 * @returns {Promise} Post 对象
 */
export async function getPostBySlug(slug) {
  return get(`/api/posts/slug/${slug}`);
}

/**
 * 创建文章
 * @param {Object} data - 文章数据
 * @returns {Promise} 新创建的 Post 对象
 */
export async function createPost(data) {
  return post('/api/posts', data);
}

/**
 * 更新文章
 * @param {Number} id - 文章 ID
 * @param {Object} data - 更新的数据
 * @returns {Promise} 更新后的 Post 对象
 */
export async function updatePost(id, data) {
  return put(`/api/posts/${id}`, data);
}

/**
 * 删除文章
 * @param {Number} id - 文章 ID
 * @returns {Promise} { message: string }
 */
export async function deletePost(id) {
  return del(`/api/posts/${id}`);
}

/**
 * 增加文章阅读量
 * @param {String} slug - 文章 slug
 * @returns {Promise} { viewCount: number }
 */
export async function incrementViewCount(slug) {
  return post(`/api/posts/${slug}/view`);
}
