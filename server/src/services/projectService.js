const prisma = require('../config/database');
const { arrayToCommaSeparated } = require('../utils/helpers');

/**
 * 项目服务层
 */
class ProjectService {
  /**
   * 获取项目列表
   */
  async getAllProjects(filters = {}) {
    const { page = 1, limit = 10, status, featured } = filters;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
    
    const where = {};
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true' || featured === true;
    
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      prisma.project.count({ where }),
    ]);
    
    return {
      projects,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  /**
   * 根据ID获取项目
   */
  async getProjectById(id) {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!project) {
      const error = new Error('项目不存在');
      error.statusCode = 404;
      throw error;
    }
    
    return project;
  }

  /**
   * 创建项目
   */
  async createProject(data) {
    const { 
      title, 
      description, 
      technologies, 
      coverImage, 
      githubUrl, 
      demoUrl, 
      featured = false,
      order = 999,
      status = 'ACTIVE'
    } = data;
    
    // 处理技术栈（数组转字符串）
    const technologiesStr = Array.isArray(technologies) 
      ? arrayToCommaSeparated(technologies) 
      : technologies || '';
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        technologies: technologiesStr,
        coverImage,
        githubUrl,
        demoUrl,
        featured,
        order: parseInt(order),
        status,
      },
    });
    
    return project;
  }

  /**
   * 更新项目
   */
  async updateProject(id, data) {
    const { 
      title, 
      description, 
      technologies, 
      coverImage, 
      githubUrl, 
      demoUrl, 
      featured, 
      order,
      status 
    } = data;
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies) 
        ? arrayToCommaSeparated(technologies) 
        : technologies;
    }
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (demoUrl !== undefined) updateData.demoUrl = demoUrl;
    if (featured !== undefined) updateData.featured = featured;
    if (order !== undefined) updateData.order = parseInt(order);
    if (status) updateData.status = status;
    
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    
    return project;
  }

  /**
   * 删除项目
   */
  async deleteProject(id) {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    
    return { message: '项目删除成功' };
  }
}

module.exports = new ProjectService();
