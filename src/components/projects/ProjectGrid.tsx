
import React from 'react';
import ProjectCard from './ProjectCard';

interface ProjectType {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  long_description?: string;
  images?: string[];
  video_url?: string;
}

interface ProjectGridProps {
  projects: ProjectType[];
  getProjectThumbnail: (project: ProjectType) => string | null;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, getProjectThumbnail }) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Top row - 3 projects on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            thumbnailImage={getProjectThumbnail(project)}
          />
        ))}
      </div>
      
      {/* Bottom row - 2 projects */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
          {projects.slice(3, 5).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              thumbnailImage={getProjectThumbnail(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
