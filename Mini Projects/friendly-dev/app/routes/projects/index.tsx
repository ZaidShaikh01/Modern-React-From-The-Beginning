import { useState } from 'react';
import ProjectCard from '~/components/ProjectCard';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import { index } from '@react-router/dev/routes';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  // We are destructuring the data from loaderData
  const { projects } = loaderData as { projects: Project[] };

  //GetUnique Category
  const categories = [
    'All',
    ...new Set(
      projects.map((project) => {
        return project.category;
      }),
    ),
  ];

  // Filtered projects based on the category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className='text-3xl text-white font-bold mb-8'>Projects</h2>

      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard  project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        currentPage={currentPage}
        onPageChanged={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default ProjectsPage;
