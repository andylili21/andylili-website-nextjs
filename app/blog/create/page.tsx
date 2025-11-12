// app/blog/create/page.tsx

import BlogCreateForm from '../../components/BlogCreateForm';

/**
 * 博客创建页面
 * 路由: /blog/create
 */
export const metadata = {
  title: '创建新博客 | 个人网站',
  description: '创建新的博客文章',
};

export default function CreateBlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <BlogCreateForm />
    </main>
  );
}
