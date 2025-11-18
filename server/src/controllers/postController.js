const postService = require('../services/postService');
const { successResponse } = require('../utils/response');

/**
 * 文章控制器
 */
class PostController {
  /**
   * 获取文章列表
   */
  async getAllPosts(req, res, next) {
    try {
      const result = await postService.getAllPosts(req.query);
      res.json(successResponse(result, result.pagination));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 根据ID获取文章
   */
  async getPostById(req, res, next) {
    try {
      const post = await postService.getPostById(req.params.id);
      res.json(successResponse(post));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 根据slug获取文章
   */
  async getPostBySlug(req, res, next) {
    try {
      const post = await postService.getPostBySlug(req.params.slug);
      res.json(successResponse(post));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 创建文章
   */
  async createPost(req, res, next) {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(successResponse(post));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 更新文章
   */
  async updatePost(req, res, next) {
    try {
      const post = await postService.updatePost(req.params.id, req.body);
      res.json(successResponse(post));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 删除文章
   */
  async deletePost(req, res, next) {
    try {
      const result = await postService.deletePost(req.params.id);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * 增加阅读量
   */
  async incrementViewCount(req, res, next) {
    try {
      const post = await postService.incrementViewCount(req.params.slug);
      res.json(successResponse({ viewCount: post.viewCount }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
