
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';

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
  children: React.ReactNode;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, children }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          {project.title}
        </h1>
        <span className="text-sm bg-dark-100 text-gray-300 px-3 py-1 rounded">
          {project.category}
        </span>
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
        </DialogTrigger>
        {children}
      </Dialog>
    </div>
  );
};

export default ProjectHeader;
