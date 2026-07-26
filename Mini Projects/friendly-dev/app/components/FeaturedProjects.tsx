import type { Project } from '~/types';
import ProjectCard from './ProjectCard';

type FeaturedProjectProp = {
  projects: Project[];
  count: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectProp) => {
  const featured = projects.filter((p) => p.featured).slice(0, count);
  return (
    <section>
      <h2 className='text-2xl font-bold mb-6 text-gray-200'>
        🌟 Featured Projectes
      </h2>
      <div className='grid gap-6 sm:grid-cols-2'>
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
