const { body, param, query, validationResult } = require('express-validator');
const { errorResponse, ErrorCodes } = require('../utils/response');

/**
 * 验证结果处理中间件
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const details = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
    }));
    
    return res.status(400).json(
      errorResponse(ErrorCodes.VALIDATION_ERROR, '请求参数验证失败', details)
    );
  }
  
  next();
}

/**
 * 文章验证规则
 */
const postValidationRules = {
  create: [
    body('title')
      .notEmpty().withMessage('文章标题不能为空')
      .isLength({ min: 1, max: 200 }).withMessage('标题长度应在1-200字符之间'),
    body('content')
      .notEmpty().withMessage('文章内容不能为空'),
    body('excerpt')
      .notEmpty().withMessage('文章摘要不能为空')
      .isLength({ min: 1, max: 500 }).withMessage('摘要长度应在1-500字符之间'),
    body('slug')
      .optional()
      .matches(/^[a-z0-9-]+$/).withMessage('slug只能包含小写字母、数字和连字符'),
    body('tags')
      .optional(),
    body('coverImage')
      .optional()
      .isURL().withMessage('封面图片必须是有效的URL'),
    body('status')
      .optional()
      .isIn(['DRAFT', 'PUBLISHED']).withMessage('状态必须是DRAFT或PUBLISHED'),
    body('categoryId')
      .optional()
      .isInt({ min: 1 }).withMessage('分类ID必须是正整数'),
    handleValidationErrors,
  ],
  
  update: [
    param('id')
      .isInt({ min: 1 }).withMessage('文章ID必须是正整数'),
    body('title')
      .optional()
      .isLength({ min: 1, max: 200 }).withMessage('标题长度应在1-200字符之间'),
    body('excerpt')
      .optional()
      .isLength({ min: 1, max: 500 }).withMessage('摘要长度应在1-500字符之间'),
    body('coverImage')
      .optional()
      .isURL().withMessage('封面图片必须是有效的URL'),
    body('status')
      .optional()
      .isIn(['DRAFT', 'PUBLISHED']).withMessage('状态必须是DRAFT或PUBLISHED'),
    body('categoryId')
      .optional()
      .isInt({ min: 1 }).withMessage('分类ID必须是正整数'),
    handleValidationErrors,
  ],
  
  getById: [
    param('id')
      .isInt({ min: 1 }).withMessage('文章ID必须是正整数'),
    handleValidationErrors,
  ],
  
  getBySlug: [
    param('slug')
      .notEmpty().withMessage('slug不能为空'),
    handleValidationErrors,
  ],
  
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('页码必须是正整数'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('每页数量必须在1-100之间'),
    query('status')
      .optional()
      .isIn(['DRAFT', 'PUBLISHED']).withMessage('状态必须是DRAFT或PUBLISHED'),
    handleValidationErrors,
  ],
};

/**
 * 项目验证规则
 */
const projectValidationRules = {
  create: [
    body('title')
      .notEmpty().withMessage('项目标题不能为空')
      .isLength({ min: 1, max: 200 }).withMessage('标题长度应在1-200字符之间'),
    body('description')
      .notEmpty().withMessage('项目描述不能为空'),
    body('technologies')
      .optional(),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('排序必须是非负整数'),
    body('coverImage')
      .optional()
      .isURL().withMessage('封面图片必须是有效的URL'),
    body('githubUrl')
      .optional()
      .isURL().withMessage('GitHub链接必须是有效的URL'),
    body('demoUrl')
      .optional()
      .isURL().withMessage('演示链接必须是有效的URL'),
    handleValidationErrors,
  ],
  
  update: [
    param('id')
      .isInt({ min: 1 }).withMessage('项目ID必须是正整数'),
    body('title')
      .optional()
      .isLength({ min: 1, max: 200 }).withMessage('标题长度应在1-200字符之间'),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('排序必须是非负整数'),
    body('coverImage')
      .optional()
      .isURL().withMessage('封面图片必须是有效的URL'),
    body('githubUrl')
      .optional()
      .isURL().withMessage('GitHub链接必须是有效的URL'),
    body('demoUrl')
      .optional()
      .isURL().withMessage('演示链接必须是有效的URL'),
    handleValidationErrors,
  ],
  
  getById: [
    param('id')
      .isInt({ min: 1 }).withMessage('项目ID必须是正整数'),
    handleValidationErrors,
  ],
  
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('页码必须是正整数'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('每页数量必须在1-100之间'),
    handleValidationErrors,
  ],
};

module.exports = {
  postValidationRules,
  projectValidationRules,
};
