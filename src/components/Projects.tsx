
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

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
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-dark-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          Featured <span className="text-primary glow">Projects</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          A selection of my recent work showcasing AI capabilities across different domains.
        </p>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-primary">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id}
                to={`/project/${project.id}`}
                className="block bg-dark-200 rounded-lg overflow-hidden group hover:glow-box transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-dark-100 to-dark-300 relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
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
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tools && project.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-dark-100 text-gray-300 px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
