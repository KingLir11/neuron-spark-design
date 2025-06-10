import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectMedia from '@/components/project/ProjectMedia';
import ProjectDetails from '@/components/project/ProjectDetails';

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

const ProjectDetailPage: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load project from Supabase
  useEffect(() => {
    async function loadProject() {
      if (!projectId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
        
        if (error) {
          console.error('Error loading project:', error);
          toast.error('Failed to load project');
          return;
        }
        
        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        toast.error('Failed to load project');
      } finally {
        setLoading(false);
      }
    }
    
    loadProject();
  }, [projectId]);

  const handleBackToProjects = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCreateTogether = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      // Scroll to the very bottom of the page
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-200 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-primary mb-4">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-200 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={handleBackToProjects} className="h-12 px-6">
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-8">
            <button 
              onClick={handleBackToProjects}
              className="inline-flex items-center text-primary hover:underline mb-4 sm:mb-6 touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </button>
            
            <ProjectHeader project={project} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="prose prose-invert max-w-none mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">About this project</h2>
                <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                  {project.long_description || project.description}
                </p>
              </div>
              
              <ProjectMedia project={project} />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <ProjectDetails project={project} onCreateTogether={handleCreateTogether} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
