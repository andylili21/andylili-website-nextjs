const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// 获取所有项目
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, featured } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';
    
    const projects = await prisma.project.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { order: 'asc' },
    });
    
    const total = await prisma.project.count({ where });
    
    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// 根据ID获取单个项目
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// 创建新项目
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      technologies = [], 
      coverImage, 
      githubUrl, 
      demoUrl, 
      featured = false,
      order = 999 
    } = req.body;
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        technologies,
        coverImage,
        githubUrl,
        demoUrl,
        featured,
        order: parseInt(order),
      }
    });
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// 更新项目
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.body;
    
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(technologies && { technologies }),
        ...(coverImage && { coverImage }),
        ...(githubUrl !== undefined && { githubUrl }),
        ...(demoUrl !== undefined && { demoUrl }),
        ...(featured !== undefined && { featured }),
        ...(order !== undefined && { order: parseInt(order) }),
        ...(status && { status }),
        updatedAt: new Date(),
      }
    });
    
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// 删除项目
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.project.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;