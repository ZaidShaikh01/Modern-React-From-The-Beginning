import FeaturedProjects from '~/components/FeaturedProjects';
import type { Route } from './+types/index';
import AboutPreview from '~/components/preview';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
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
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
    ),
    fetch(new URL('/posts-meta.json', url)),
  ]);
  if (!projectRes.ok || !PostRes.ok)
    throw new Error('Error While Fetching The Data....');
  const projectsJson: StrapiResponse<StrapiProject> = await projectRes.json();
  const postsJson = await PostRes.json();
  const projects = projectsJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));
  return { projects: projects, posts: postsJson };
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
