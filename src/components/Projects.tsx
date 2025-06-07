
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import ProjectsHeader from './projects/ProjectsHeader';
import ProjectsLoading from './projects/ProjectsLoading';
import ProjectGrid from './projects/ProjectGrid';
import { getProjectThumbnail, arrangeProjects } from './projects/ProjectUtils';

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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load projects from Supabase
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading projects:', error);
          toast.error('Failed to load projects');
          return;
        }

        const filteredProjects = (data || [])
          .filter(project => !project.title.toLowerCase().includes('visual identity creator'))
          .slice(0, 5);
        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const arrangedProjects = arrangeProjects(projects);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-dark-200 scroll-mt-20">
      <div className="container mx-auto px-4">
        <ProjectsHeader />
        
        {loading ? (
          <ProjectsLoading />
        ) : (
          <ProjectGrid 
            projects={arrangedProjects} 
            getProjectThumbnail={getProjectThumbnail} 
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
