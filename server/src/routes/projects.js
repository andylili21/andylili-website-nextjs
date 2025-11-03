const express = require('express');
const projectController = require('../controllers/projectController');
const { projectValidationRules } = require('../middlewares/validator');

const router = express.Router();

// 项目列表
router.get('/', projectValidationRules.list, projectController.getAllProjects);

// 根据ID获取项目
router.get('/:id', projectValidationRules.getById, projectController.getProjectById);

// 创建项目
router.post('/', projectValidationRules.create, projectController.createProject);

// 更新项目
router.put('/:id', projectValidationRules.update, projectController.updateProject);

// 删除项目
router.delete('/:id', projectValidationRules.getById, projectController.deleteProject);

module.exports = router;
