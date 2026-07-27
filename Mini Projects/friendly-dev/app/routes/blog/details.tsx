import ReactMarkDown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta } from '~/types';

type BlogPostDetailsPageProps={
    loaderData:{
        postMeta:PostMeta,
        markdown: string
    }
}

export async function loader({ request, params }: Route.LoaderArgs) {

  const { slug } = params;

  const url = new URL('./posts-meta.json', request.url);

  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const index = await res.json();
  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response('Not Found', { status: 404 });

  //   Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);
  return { postMeta, markdown: markdown.default };
}

const BlogPostDetailsPage = ({loaderData}: BlogPostDetailsPageProps) => {
    const {postMeta,markdown} = loaderData;

  return <>Blog</>;
};

export default BlogPostDetailsPage;
