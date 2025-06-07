
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

interface ProjectDetailsProps {
  project: Project;
  onCreateTogether?: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onCreateTogether }) => {
  return (
    <div className="bg-dark-100 rounded-lg p-4 sm:p-6 mb-6 lg:mb-0">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Project Details</h3>
      
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div>
          <h4 className="text-xs sm:text-sm text-gray-400 mb-1">Category</h4>
          <p className="text-sm sm:text-base">{project.category}</p>
        </div>
        
        <div>
          <h4 className="text-xs sm:text-sm text-gray-400 mb-1">Tools & Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tools && project.tools.map((tool, idx) => (
              <span 
                key={idx}
                className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Let's Create Together Button */}
      {onCreateTogether && (
        <div className="flex justify-center">
          <button
            onClick={onCreateTogether}
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl w-full text-sm sm:text-base touch-manipulation"
          >
            Let's Create Together!
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
