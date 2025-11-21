/**
 * 项目相关 API 方法
 */

import { get, post, put, del } from './client';

/**
 * 获取项目列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.limit - 每页数量
 * @param {String} params.status - 状态筛选（ACTIVE/ARCHIVED）
 * @param {Boolean} params.featured - 是否精选
 * @returns {Promise} { projects: [], pagination: {} }
 */
export async function getAllProjects(params = {}) {
  return get('/api/projects', params);
}

/**
 * 根据 ID 获取项目
 * @param {Number} id - 项目 ID
 * @returns {Promise} Project 对象
 */
export async function getProjectById(id) {
  return get(`/api/projects/${id}`);
}

/**
 * 创建项目
 * @param {Object} data - 项目数据
 * @returns {Promise} 新创建的 Project 对象
 */
export async function createProject(data) {
  return post('/api/projects', data);
}

/**
 * 更新项目
 * @param {Number} id - 项目 ID
 * @param {Object} data - 更新的数据
 * @returns {Promise} 更新后的 Project 对象
 */
export async function updateProject(id, data) {
  return put(`/api/projects/${id}`, data);
}

/**
 * 删除项目
 * @param {Number} id - 项目 ID
 * @returns {Promise} { message: string }
 */
export async function deleteProject(id) {
  return del(`/api/projects/${id}`);
}
