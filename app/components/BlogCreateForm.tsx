'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../lib/api/posts';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  status: 'DRAFT' | 'PUBLISHED';
  coverImage: string;
  categoryId: string;
  slug: string;
}

interface ValidationErrors {
  [key: string]: string;
}

/**
 * 博客创建表单组件
 * 用于填写和提交新博客文章
 */
export default function BlogCreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    status: 'DRAFT',
    coverImage: '',
    categoryId: '',
    slug: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  /**
   * 处理表单字段变化
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * 前端验证
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 标题验证
    if (!formData.title.trim()) {
      newErrors.title = '文章标题不能为空';
    } else if (formData.title.length > 200) {
      newErrors.title = '标题长度不能超过200字符';
    }

    // 摘要验证
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = '文章摘要不能为空';
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = '摘要长度不能超过500字符';
    }

    // 内容验证
    if (!formData.content.trim()) {
      newErrors.content = '文章内容不能为空';
    }

    // slug 验证（可选）
    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'slug只能包含小写字母、数字和连字符';
    }

    // 封面图片验证（可选）
    if (formData.coverImage && !isValidUrl(formData.coverImage)) {
      newErrors.coverImage = '请输入有效的图片URL';
    }

    // 分类ID验证（可选）
    if (formData.categoryId && isNaN(parseInt(formData.categoryId))) {
      newErrors.categoryId = '分类ID必须是数字';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 验证 URL 格式
   */
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 准备提交数据
      const submitData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        status: formData.status,
        tags: formData.tags
          ? formData.tags.split(',').map(tag => tag.trim())
          : undefined,
        coverImage: formData.coverImage || undefined,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
        slug: formData.slug || undefined,
      };

      // 调用 API 创建文章
      const newPost = await createPost(submitData);

      // 成功后跳转到文章详情页
      router.push(`/blog/${newPost.slug}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '创建文章失败，请重试';
      setSubmitError(errorMessage);
      console.error('提交表单失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">创建新博客</h1>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
          <p className="font-semibold">创建失败</p>
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 标题 */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            文章标题 *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="输入文章标题"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={200}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          <p className="text-gray-500 text-xs mt-1">
            {formData.title.length}/200 字符
          </p>
        </div>

        {/* 摘要 */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold mb-2">
            文章摘要 *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="输入文章摘要（简短描述）"
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.excerpt ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={500}
          />
          {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
          <p className="text-gray-500 text-xs mt-1">
            {formData.excerpt.length}/500 字符
          </p>
        </div>

        {/* 内容 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="content" className="block text-sm font-semibold">
              文章内容（Markdown 格式） *
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showPreview ? '编辑' : '预览'}
            </button>
          </div>

          {!showPreview ? (
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="输入文章内容，支持 Markdown 格式"
              rows={15}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 min-h-96 prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{formData.content || '（暂无内容预览）'}</p>
            </div>
          )}
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        {/* 标签 */}
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold mb-2">
            标签（多个标签用逗号分隔）
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="例如：React, TypeScript, Web开发"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 发布状态 */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold mb-2">
            发布状态
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DRAFT">草稿</option>
            <option value="PUBLISHED">发布</option>
          </select>
        </div>

        {/* 封面图片 */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-semibold mb-2">
            封面图片 URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.coverImage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
          {formData.coverImage && isValidUrl(formData.coverImage) && (
            <div className="mt-2">
              <img
                src={formData.coverImage}
                alt="封面预览"
                className="max-w-xs max-h-48 rounded"
              />
            </div>
          )}
        </div>

        {/* 分类 ID */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-semibold mb-2">
            分类 ID
          </label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="输入分类 ID（可选）"
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.categoryId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
          <p className="text-gray-500 text-xs mt-1">
            可用分类：1=前端开发, 2=后端开发, 3=全栈开发（留空则不关联分类）
          </p>
        </div>

        {/* 自定义 Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold mb-2">
            URL 别名（Slug）
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="输入 URL 别名，如：my-first-post"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.slug ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
          <p className="text-gray-500 text-xs mt-1">
            留空将自动根据标题生成，仅能包含小写字母、数字和连字符。如果重复则自动添加随机后缀
          </p>
        </div>

        {/* 按钮 */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition"
          >
            {isSubmitting ? '提交中...' : '提交文章'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition"
          >
            返回
          </button>
        </div>
      </form>
    </div>
  );
}
