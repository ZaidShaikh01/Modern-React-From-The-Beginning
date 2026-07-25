import type { Route } from './+types/index';
import type { Project } from '~/types';

// Request has the type of Route.LoaderArgs & Promise is the return type of the function
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();
  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  console.log(projects);

  return (
    <>
      <h2 className='text-3xl text-white font-bold mb-8'>Projects</h2>
    </>
  );
};

export default ProjectsPage;
