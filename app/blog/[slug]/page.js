// app/blog/[slug]/page.js
// import Header from '../../components/Header'
import BlogPost from '../../components/BlogPost'
import Footer from '../../components/Footer'
import { getPostBySlug, getAllPosts } from '../../lib/posts'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// export async function generateMetadata({ params }) {
//   const post = await getPostBySlug(params.slug)
  
//   return {
//     title: `${post.title} | 我的博客`,
//     description: post.excerpt,
//   }
// }

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  const relatedPosts = [] // 这里可以添加相关文章的逻辑

  return (
    <main>
      {/* <Header /> */}
      <BlogPost post={post} relatedPosts={relatedPosts} />
      <Footer />
    </main>
  )
}