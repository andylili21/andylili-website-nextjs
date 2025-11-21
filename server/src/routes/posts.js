const express = require('express');
const postController = require('../controllers/postController');
const { postValidationRules } = require('../middlewares/validator');

const router = express.Router();

// 文章列表
router.get('/', postValidationRules.list, postController.getAllPosts);

// 根据slug获取文章（需要在/:id之前定义）
router.get('/slug/:slug', postValidationRules.getBySlug, postController.getPostBySlug);

// 增加阅读量
router.post('/:slug/view', postValidationRules.getBySlug, postController.incrementViewCount);

// 根据ID获取文章
router.get('/:id', postValidationRules.getById, postController.getPostById);

// 创建文章
router.post('/', postValidationRules.create, postController.createPost);

// 更新文章
router.put('/:id', postValidationRules.update, postController.updatePost);

// 删除文章
router.delete('/:id', postValidationRules.getById, postController.deletePost);

module.exports = router;
