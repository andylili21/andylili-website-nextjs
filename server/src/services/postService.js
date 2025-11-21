const prisma = require('../config/database');
const { generateSlug, calculateReadingTime, arrayToCommaSeparated } = require('../utils/helpers');

/**
 * 文章服务层
 */
class PostService {
  /**
   * 获取文章列表
   */
  async getAllPosts(filters = {}) {
    const { page = 1, limit = 10, status, featured } = filters;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
    
    const where = {};
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true' || featured === true;
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' },
        include: {
          category: true,
        },
      }),
      prisma.post.count({ where }),
    ]);
    
    return {
      posts,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  /**
   * 根据ID获取文章
   */
  async getPostById(id) {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    
    if (!post) {
      const error = new Error('文章不存在');
      error.statusCode = 404;
      throw error;
    }
    
    return post;
  }

  /**
   * 根据slug获取文章
   */
  async getPostBySlug(slug) {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });
    
    if (!post) {
      const error = new Error('文章不存在');
      error.statusCode = 404;
      throw error;
    }
    
    return post;
  }

  /**
   * 创建文章
   */
  async createPost(data) {
    const { title, content, excerpt, categoryId, tags, coverImage, featured = false, status = 'DRAFT', slug: customSlug } = data;
    
    // 生成或使用自定义 slug
    let slug = customSlug || generateSlug(title);
    
    // 检查 slug 是否已存在，如果存在则添加随机后缀
    let existingPost = await prisma.post.findUnique({
      where: { slug },
    });
    
    if (existingPost) {
      // 添加随机后缀以确保唯一性
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      slug = `${slug}-${randomSuffix}`;
    }
    
    // 计算阅读时长
    const readingTime = calculateReadingTime(content);
    
    // 处理标签（数组转字符串）
    const tagsStr = Array.isArray(tags) ? arrayToCommaSeparated(tags) : tags || '';
    
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId: categoryId ? parseInt(categoryId) : null,
        tags: tagsStr,
        coverImage,
        featured,
        status,
        readingTime,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
      include: {
        category: true,
      },
    });
    
    return post;
  }

  /**
   * 更新文章
   */
  async updatePost(id, data) {
    const { title, content, excerpt, categoryId, tags, coverImage, featured, status } = data;
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (content) {
      updateData.content = content;
      updateData.readingTime = calculateReadingTime(content);
    }
    if (excerpt) updateData.excerpt = excerpt;
    if (categoryId !== undefined) updateData.categoryId = categoryId ? parseInt(categoryId) : null;
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? arrayToCommaSeparated(tags) : tags;
    }
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (featured !== undefined) updateData.featured = featured;
    if (status) {
      updateData.status = status;
      // 如果从草稿变为发布，设置发布时间
      if (status === 'PUBLISHED') {
        const existingPost = await prisma.post.findUnique({ where: { id: parseInt(id) } });
        if (existingPost && !existingPost.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }
    
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true,
      },
    });
    
    return post;
  }

  /**
   * 删除文章
   */
  async deletePost(id) {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    
    return { message: '文章删除成功' };
  }

  /**
   * 增加阅读量
   */
  async incrementViewCount(slug) {
    const post = await prisma.post.update({
      where: { slug },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    
    return post;
  }
}

module.exports = new PostService();
