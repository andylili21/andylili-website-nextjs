// app/blog/create/page.tsx

import MetalBlogCreateForm from '@/app/components/MetalBlogCreateForm';

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
    <main>
      <MetalBlogCreateForm />
    </main>
  );
}
