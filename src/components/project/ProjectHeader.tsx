
import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  long_description?: string;
  images?: string[];
  video_url?: string;
}

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        {project.title}
      </h1>
      <span className="text-sm bg-dark-100 text-gray-300 px-3 py-1 rounded">
        {project.category}
      </span>
    </div>
  );
};

export default ProjectHeader;
