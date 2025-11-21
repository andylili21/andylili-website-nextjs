/**
 * 辅助工具函数
 */

/**
 * 生成 slug（从标题转换为URL友好格式）
 * @param {String} title - 标题
 * @returns {String} slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * 计算阅读时长（分钟）
 * @param {String} content - 文章内容
 * @returns {Number} 阅读时长
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200; // 中文约每分钟200字
  const wordCount = content.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * 解析逗号分隔的字符串为数组
 * @param {String} str - 逗号分隔的字符串
 * @returns {Array} 数组
 */
function parseCommaSeparated(str) {
  if (!str) return [];
  return str.split(',').map(item => item.trim()).filter(Boolean);
}

/**
 * 数组转换为逗号分隔的字符串
 * @param {Array} arr - 数组
 * @returns {String} 逗号分隔的字符串
 */
function arrayToCommaSeparated(arr) {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join(',');
}

module.exports = {
  generateSlug,
  calculateReadingTime,
  parseCommaSeparated,
  arrayToCommaSeparated,
};
