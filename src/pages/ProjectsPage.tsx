
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  tools: string[];
  category: string;
  images?: string[];
  videoUrl?: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  
  // Default projects data - same as in Projects.tsx
  const defaultProjects: ProjectType[] = [
    {
      id: 1,
      title: "Neural Style Transfer Pipeline",
      description: "Automated workflow for applying AI-generated artistic styles to product photography.",
      tools: ["Midjourney", "Make.com", "Photoshop API"],
      category: "Image Generation",
      images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"]
    },
    {
      id: 2,
      title: "Content Amplification System",
      description: "AI-powered workflow that turns blog posts into video snippets, social posts, and email newsletters.",
      tools: ["GPT-4", "Runway", "DALL·E 3"],
      category: "Automation",
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"]
    },
    {
      id: 3,
      title: "Concept Art Generator",
      description: "Custom prompt system for generating consistent character designs across multiple AI platforms.",
      tools: ["Prompt Engineering", "Midjourney", "Stable Diffusion"],
      category: "Prompt Engineering"
    },
    {
      id: 4,
      title: "Explainer Video Factory",
      description: "Script-to-video pipeline that creates engaging educational content with minimal human intervention.",
      tools: ["GPT-4", "Pika", "ElevenLabs"],
      category: "Video Creation",
      images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"]
    },
    {
      id: 5,
      title: "Visual Identity Creator",
      description: "System that generates cohesive brand assets including logos, color schemes, and marketing materials.",
      tools: ["DALL·E 3", "Photoshop", "Make.com"],
      category: "Image Generation",
      images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
    },
    {
      id: 6,
      title: "Data Insight Visualizer",
      description: "Automation that transforms complex data into clear, compelling visual stories.",
      tools: ["GPT-4", "Midjourney", "Python"],
      category: "Automation",
      images: ["https://images.unsplash.com/photo-1518770660439-4636190af475"]
    }
  ];

  // Load projects from localStorage or use default
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Featured <span className="text-primary glow">Projects</span>
          </h1>
          <p className="text-gray-300 mb-12 max-w-2xl">
            Explore my portfolio of AI-powered solutions and creative applications.
            Each project demonstrates the practical implementation of cutting-edge AI technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link 
                to={`/project/${project.id}`} 
                key={index}
                className="block bg-dark-100 rounded-lg overflow-hidden group hover:glow-box transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-dark-100 to-dark-300 relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover"
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
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
