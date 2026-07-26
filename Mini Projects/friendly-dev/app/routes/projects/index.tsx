import { useState } from 'react';
import ProjectCard from '~/components/ProjectCard';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import { index } from '@react-router/dev/routes';
import Pagination from '~/components/Pagination';

// Request has the type of Route.LoaderArgs & Promise is the return type of the function
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  // Projects is an object of data. & data is list of type Project & we have described project in type.ts

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  // console.log(loaderData);
  // We are destructuring the data from loaderData
  const { projects } = loaderData as { projects: Project[] };

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);
  console.log(totalPages);

  return (
    <>
      <h2 className='text-3xl text-white font-bold mb-8'>Projects</h2>
      <div className='grid gap-6 sm:grid-cols-2'>
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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

export default ProjectsPage;
