import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectMedia from '@/components/project/ProjectMedia';
import ProjectDetails from '@/components/project/ProjectDetails';
import ProjectEditDialog from '@/components/project/ProjectEditDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const { isAdmin } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 200);
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setProject(updatedProject);
    setIsEditDialogOpen(false);
    toast.success('Project updated successfully');
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);
      
      if (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
        return;
      }
      
      toast.success('Project deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button 
                onClick={handleBackToProjects}
                className="inline-flex items-center text-primary hover:underline touch-manipulation"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to projects
              </button>
              
              {isAdmin && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    className="border-gray-600 text-gray-300 hover:text-white hover:border-primary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:text-red-300 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-dark-100 border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-dark-200 border-gray-600 text-gray-300 hover:bg-dark-100">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteProject}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            
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
      
      {isAdmin && (
        <ProjectEditDialog
          project={project}
          onProjectUpdate={handleProjectUpdate}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </div>
  );
};

export default ProjectDetailPage;
