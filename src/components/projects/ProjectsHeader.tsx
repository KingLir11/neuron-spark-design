
import React from 'react';

const ProjectsHeader: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white text-center">
        Featured <span className="text-primary glow">Projects</span>
      </h2>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
        A selection of my recent work showcasing AI capabilities across different domains.
      </p>
    </>
  );
};

export default ProjectsHeader;
