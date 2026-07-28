import { useState } from 'react';
import type { Route } from './+types';
import type { PostMeta } from '~/types';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  // This is for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 2;

  const { posts } = loaderData;

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / blogsPerPage);

  // Index of last blog on page
  const indexOfLast = currentPage * blogsPerPage;
  // Index of first blog on page
  const indexOfFirst = indexOfLast - blogsPerPage;
  // Get Current blogs of that page
  const currentBlogs = posts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
        <h2 className='text-3xl text-white font-bold mb-8'>Blog</h2>
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
