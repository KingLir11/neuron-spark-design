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

        // Filter out the visual identity creator project and keep only 5 projects
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

  // Function to get the thumbnail image for a project
  const getProjectThumbnail = (project: ProjectType) => {
    // Use specific image for Marco project
    if (project.title.toLowerCase().includes('marco')) {
      return '/lovable-uploads/e047683d-9567-4463-987c-9a65e286e3a1.png';
    }

    // Use specific image for Red Bull project
    if (project.title.toLowerCase().includes('red bull') || project.title.toLowerCase().includes('redbull')) {
      return '/lovable-uploads/3f103bfc-8181-405b-a1d3-b23db84a82b0.png';
    }

    // Use specific image for Reflection project
    if (project.title.toLowerCase().includes('reflection')) {
      return '/lovable-uploads/949217ba-35cf-41c5-a568-1057e66b9e0f.png';
    }

    // Use specific image for Fashion Brand Collection project
    if (project.title.toLowerCase().includes('fashion') || project.title.toLowerCase().includes('brand')) {
      return '/lovable-uploads/7a6ef81f-3f7d-417c-a5f9-2978e0228852.png';
    }

    // Use specific image for Custom Playlist Creator project
    if (project.title.toLowerCase().includes('custom playlist') || project.title.toLowerCase().includes('playlist')) {
      return '/lovable-uploads/3f31b1e6-7dc2-4cf7-b4b5-c1ce6e2e81e0.png';
    }

    // For other projects, use the first image from their images array
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    return null;
  };

  // Function to arrange projects in the specified order
  const arrangeProjects = (projects: ProjectType[]) => {
    const projectOrder = ['reflection', 'marco', 'fashion', 'custom playlist', 'redbull'];
    const arranged: ProjectType[] = [];
    
    projectOrder.forEach(keyword => {
      const project = projects.find(p => 
        p.title.toLowerCase().includes(keyword.toLowerCase()) || 
        (keyword === 'redbull' && p.title.toLowerCase().includes('red bull'))
      );
      if (project) {
        arranged.push(project);
      }
    });
    
    return arranged;
  };

  const arrangedProjects = arrangeProjects(projects);

  return (
    <section id="projects" className="py-20 bg-dark-200 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          Featured <span className="text-primary glow">Projects</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          A selection of my recent work showcasing AI capabilities across different domains.
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse text-primary text-lg">Loading projects...</div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Top row - 3 projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {arrangedProjects.slice(0, 3).map((project) => {
                const thumbnailImage = getProjectThumbnail(project);
                return (
                  <Link 
                    key={project.id} 
                    to={`/project/${project.id}`} 
                    className="block bg-dark-100 border border-gray-700 rounded-lg overflow-hidden group hover:glow-box transition-all duration-300 hover:border-primary/30"
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
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm">
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
              })}
            </div>
            
            {/* Bottom row - 2 projects centered with same size as top row */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {arrangedProjects.slice(3, 5).map((project) => {
                  const thumbnailImage = getProjectThumbnail(project);
                  return (
                    <Link 
                      key={project.id} 
                      to={`/project/${project.id}`} 
                      className="block bg-dark-100 border border-gray-700 rounded-lg overflow-hidden group hover:glow-box transition-all duration-300 hover:border-primary/30"
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
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm">
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
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
