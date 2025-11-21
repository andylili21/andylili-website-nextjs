/**
 * 博客文章 API 客户端
 * 用于与后端 Express 服务通信
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * 创建博客文章
 */
export async function createPost(data: {
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
  status?: 'DRAFT' | 'PUBLISHED';
  coverImage?: string;
  categoryId?: number;
  slug?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `创建文章失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('创建文章 API 调用失败:', error);
    throw error;
  }
}

/**
 * 获取所有文章
 */
export async function getPosts(filters?: {
  page?: number;
  limit?: number;
  status?: 'DRAFT' | 'PUBLISHED';
}) {
  try {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);

    const response = await fetch(`${API_BASE_URL}/posts?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`获取文章列表失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('获取文章列表 API 调用失败:', error);
    throw error;
  }
}

/**
 * 根据 slug 获取文章
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/slug/${slug}`);

    if (!response.ok) {
      throw new Error(`获取文章失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('获取文章 API 调用失败:', error);
    throw error;
  }
}

/**
 * 根据 ID 获取文章
 */
export async function getPostById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);

    if (!response.ok) {
      throw new Error(`获取文章失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('获取文章 API 调用失败:', error);
    throw error;
  }
}

/**
 * 更新文章
 */
export async function updatePost(
  id: number,
  data: Partial<{
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    status: 'DRAFT' | 'PUBLISHED';
    coverImage: string;
    categoryId: number;
  }>
) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `更新文章失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('更新文章 API 调用失败:', error);
    throw error;
  }
}

/**
 * 删除文章
 */
export async function deletePost(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `删除文章失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('删除文章 API 调用失败:', error);
    throw error;
  }
}

/**
 * 增加文章浏览量
 */
export async function incrementPostViewCount(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}/view`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`增加浏览量失败: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('增加浏览量 API 调用失败:', error);
    throw error;
  }
}
