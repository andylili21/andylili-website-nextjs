const projectService = require('../services/projectService');
const { successResponse } = require('../utils/response');

/**
 * 项目控制器
 */
class ProjectController {
  /**
   * 获取项目列表
   */
  async getAllProjects(req, res, next) {
    try {
      const result = await projectService.getAllProjects(req.query);
      res.json(successResponse(result, result.pagination));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 根据ID获取项目
   */
  async getProjectById(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.json(successResponse(project));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 创建项目
   */
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json(successResponse(project));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 更新项目
   */
  async updateProject(req, res, next) {
    try {
      const project = await projectService.updateProject(req.params.id, req.body);
      res.json(successResponse(project));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 删除项目
   */
  async deleteProject(req, res, next) {
    try {
      const result = await projectService.deleteProject(req.params.id);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
