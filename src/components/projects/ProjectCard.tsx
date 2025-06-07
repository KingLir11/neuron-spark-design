
import React from 'react';
import { Link } from 'react-router-dom';

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

interface ProjectCardProps {
  project: ProjectType;
  thumbnailImage: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, thumbnailImage }) => {
  return (
    <Link 
      to={`/project/${project.id}`} 
      className="block bg-dark-100 border border-gray-700 rounded-lg overflow-hidden group hover:glow-box transition-all duration-300 hover:border-primary/30 touch-manipulation"
    >
      <div className="aspect-video bg-gradient-to-br from-dark-100 to-dark-300 relative overflow-hidden">
        {thumbnailImage ? (
          <img 
            src={thumbnailImage} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Image+Error';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono text-gray-400">{project.category}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-3 sm:mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tools && project.tools.map((tool, idx) => (
            <span key={idx} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded border border-gray-600">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
