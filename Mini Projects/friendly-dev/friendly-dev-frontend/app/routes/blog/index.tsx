import { useState } from 'react';
import type { Route } from './+types';
import type { PostMeta, StrapiResponse, StrapiPost } from '~/types';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import PostFilter from '~/components/PostFilter';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`,
  );

  if (!res.ok) throw new Error('Failed to fetch data');
  const json: StrapiResponse<StrapiPost> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    documentId: item.documentId,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
  }));

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  // This is for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const blogsPerPage = 2;

  const { posts } = loaderData;
  // Filtered posts
  const filteredPost = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });
  // Calculate total pages
  const totalPages = Math.ceil(posts.length / blogsPerPage);

  // Index of last blog on page
  const indexOfLast = currentPage * blogsPerPage;
  // Index of first blog on page
  const indexOfFirst = indexOfLast - blogsPerPage;
  // Get Current blogs of that page
  const currentBlogs = filteredPost.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
        <h2 className='text-3xl text-white font-bold mb-8'>Blog</h2>
        <PostFilter
          onSearchChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
        />
        {currentBlogs.length === 0 && (
          <p className='text-gray-500 text-center'>
            No Such Blog unfortunately 😔
          </p>
        )}
        {currentBlogs.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default BlogPage;
