
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define project type for TypeScript
interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  category: string;
  longDescription?: string;
  image?: string;
  videoUrl?: string;
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLongDescription, setEditLongDescription] = useState('');

  // Default project data
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Neural Style Transfer Pipeline",
      description: "Automated workflow for applying AI-generated artistic styles to product photography.",
      tools: ["Midjourney", "Make.com", "Photoshop API"],
      category: "Image Generation",
      longDescription: "This project implements a fully automated workflow that takes standard product photography and applies various artistic styles using neural networks. The system integrates with e-commerce platforms to automatically process new product uploads, apply selected style transfers, and deploy the stylized images to product listings.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      title: "Content Amplification System",
      description: "AI-powered workflow that turns blog posts into video snippets, social posts, and email newsletters.",
      tools: ["GPT-4", "Runway", "DALL·E 3"],
      category: "Automation",
      longDescription: "This system takes a single blog post as input and automatically generates a suite of derivative content including short video clips, social media posts tailored for different platforms, and email newsletter content. It uses GPT-4 for text transformation and DALL·E for generating accompanying visuals.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      title: "Concept Art Generator",
      description: "Custom prompt system for generating consistent character designs across multiple AI platforms.",
      tools: ["Prompt Engineering", "Midjourney", "Stable Diffusion"],
      category: "Prompt Engineering",
      longDescription: "A sophisticated prompt engineering system that enables consistent character design generation across multiple AI art platforms. The tool maintains style consistency while allowing for variations in pose, expression, and scenario - perfect for concept artists and game developers.",
      videoUrl: "https://example.com/concept-art-demo.mp4"
    },
    {
      id: 4,
      title: "Explainer Video Factory",
      description: "Script-to-video pipeline that creates engaging educational content with minimal human intervention.",
      tools: ["GPT-4", "Pika", "ElevenLabs"],
      category: "Video Creation",
      longDescription: "This automated pipeline transforms text scripts into fully rendered explainer videos. It breaks down scripts into scenes, generates appropriate visuals, adds voice narration using ElevenLabs, and composes everything into a cohesive video using Pika.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 5,
      title: "Visual Identity Creator",
      description: "System that generates cohesive brand assets including logos, color schemes, and marketing materials.",
      tools: ["DALL·E 3", "Photoshop", "Make.com"],
      category: "Image Generation",
      longDescription: "A brand identity generation system that creates complete visual brand packages. From a simple text description of the brand values and target audience, it outputs logos, color palettes, typography recommendations, and example marketing materials.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 6,
      title: "Data Insight Visualizer",
      description: "Automation that transforms complex data into clear, compelling visual stories.",
      tools: ["GPT-4", "Midjourney", "Python"],
      category: "Automation",
      longDescription: "This tool takes raw data as input, uses Python and GPT-4 to analyze trends and extract insights, then automatically creates visual representations optimized for storytelling and presentation. Ideal for data analysts and business intelligence teams.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    }
  ];

  // Find project when component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      const foundProject = projectsData.find(p => p.id === parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
        setEditTitle(foundProject.title);
        setEditDescription(foundProject.description);
        setEditLongDescription(foundProject.longDescription || '');
      }
    }
  }, [projectId]);

  const handleSaveChanges = () => {
    if (project) {
      setProject({
        ...project,
        title: editTitle,
        description: editDescription,
        longDescription: editLongDescription
      });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-200 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/projects" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all projects
            </Link>
            
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-white">
                {project.title}
                <span className="ml-2 text-sm align-top bg-dark-100 text-gray-300 px-2 py-1 rounded">
                  {project.category}
                </span>
              </h1>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Project</Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-100 text-white border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Edit Project Details</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Project Title</label>
                      <Input 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-dark-200 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Short Description</label>
                      <Input 
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="bg-dark-200 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Full Description</label>
                      <Textarea 
                        value={editLongDescription}
                        onChange={(e) => setEditLongDescription(e.target.value)}
                        className="bg-dark-200 border-gray-700 text-white min-h-[150px]"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {project.image && (
                <div className="rounded-lg overflow-hidden mb-6 bg-dark-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full object-cover h-[400px]"
                  />
                </div>
              )}
              
              {project.videoUrl && (
                <div className="rounded-lg overflow-hidden mb-6 bg-dark-100">
                  <video 
                    controls 
                    className="w-full h-[400px] object-cover"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About this project</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  {project.longDescription || project.description}
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-dark-100 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Category</h4>
                    <p>{project.category}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, idx) => (
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
