// app/blog/[slug]/page.js
import { PrismaClient } from '@prisma/client';

async function getPostBySlug(slug) {
  const prisma = new PrismaClient();
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug
      },
      include: {
        category: true
      }
    });
    return post;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return <div>文章未找到</div>;
  }
  
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}