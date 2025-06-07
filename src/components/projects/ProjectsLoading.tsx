
import React from 'react';

const ProjectsLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse text-primary text-lg">Loading projects...</div>
    </div>
  );
};

export default ProjectsLoading;
