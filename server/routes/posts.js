const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// 获取所有博客文章
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, featured } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';
    
    const posts = await prisma.post.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
      }
    });
    
    const total = await prisma.post.count({ where });
    
    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 根据ID获取单篇文章
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// 根据slug获取单篇文章
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// 创建新文章
router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, categoryId, tags, coverImage, featured = false } = req.body;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId: categoryId ? parseInt(categoryId) : null,
        tags: tags || [],
        coverImage,
        featured,
        publishedAt: new Date(),
      }
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, categoryId, tags, coverImage, featured, status } = req.body;
    
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(categoryId && { categoryId: parseInt(categoryId) }),
        ...(tags && { tags }),
        ...(coverImage && { coverImage }),
        ...(featured !== undefined && { featured }),
        ...(status && { status }),
        updatedAt: new Date(),
      }
    });
    
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.post.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;