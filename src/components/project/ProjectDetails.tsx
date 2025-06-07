
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
    <div className="bg-dark-100 rounded-lg p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Project Details</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm text-gray-400 mb-1">Category</h4>
          <p>{project.category}</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400 mb-1">Tools & Technologies</h4>
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
            className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl w-full"
          >
            Let's Create Together!
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
