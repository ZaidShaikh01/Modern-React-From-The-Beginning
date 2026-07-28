import FeaturedProjects from '~/components/FeaturedProjects';
import type { Route } from './+types/index';
import AboutPreview from '~/components/preview';
import type { Project } from '~/types';
import type { PostMeta } from '~/types';
import LatestBlogPost from '~/components/LatestBlogPost';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev' },
    { name: 'description', content: 'Custom Website Devlopment' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  // Promise.all is used here to get the values concurrently
  const [projectRes, PostRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url)),
  ]);
  if (!projectRes.ok || !PostRes.ok)
    throw new Error('Error While Fetching The Data....');
  const [projects, posts] = await Promise.all([
    projectRes.json(),
    PostRes.json(),
  ]);

  return { projects: projects, posts: posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <LatestBlogPost limit={3} posts={posts} />
      <AboutPreview />
    </>
  );
};

export default HomePage;
