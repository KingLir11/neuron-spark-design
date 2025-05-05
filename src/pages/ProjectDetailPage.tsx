import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Edit, Image, Video, Plus, X, Upload, FileImage, FileVideo } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { safelyStoreData, processImageForStorage, processVideoForStorage, getStorableCopy } from '@/utils/storageUtils';

// Define project type for TypeScript
interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  category: string;
  longDescription?: string;
  images?: string[];
  videoUrl?: string;
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLongDescription, setEditLongDescription] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editTools, setEditTools] = useState<string[]>([]);
  const [editCategory, setEditCategory] = useState('');
  const [newTool, setNewTool] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  
  // Refs for file inputs
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Default project data - same but exported to a utility if needed in the future
  const defaultProjects: Project[] = [
    {
      id: 1,
      title: "Neural Style Transfer Pipeline",
      description: "Automated workflow for applying AI-generated artistic styles to product photography.",
      tools: ["Midjourney", "Make.com", "Photoshop API"],
      category: "Image Generation",
      longDescription: "This project implements a fully automated workflow that takes standard product photography and applies various artistic styles using neural networks. The system integrates with e-commerce platforms to automatically process new product uploads, apply selected style transfers, and deploy the stylized images to product listings.",
      images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"]
    },
    {
      id: 2,
      title: "Content Amplification System",
      description: "AI-powered workflow that turns blog posts into video snippets, social posts, and email newsletters.",
      tools: ["GPT-4", "Runway", "DALL·E 3"],
      category: "Automation",
      longDescription: "This system takes a single blog post as input and automatically generates a suite of derivative content including short video clips, social media posts tailored for different platforms, and email newsletter content. It uses GPT-4 for text transformation and DALL·E for generating accompanying visuals.",
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"]
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
      images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"]
    },
    {
      id: 5,
      title: "Visual Identity Creator",
      description: "System that generates cohesive brand assets including logos, color schemes, and marketing materials.",
      tools: ["DALL·E 3", "Photoshop", "Make.com"],
      category: "Image Generation",
      longDescription: "A brand identity generation system that creates complete visual brand packages. From a simple text description of the brand values and target audience, it outputs logos, color palettes, typography recommendations, and example marketing materials.",
      images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
    },
    {
      id: 6,
      title: "Data Insight Visualizer",
      description: "Automation that transforms complex data into clear, compelling visual stories.",
      tools: ["GPT-4", "Midjourney", "Python"],
      category: "Automation",
      longDescription: "This tool takes raw data as input, uses Python and GPT-4 to analyze trends and extract insights, then automatically creates visual representations optimized for storytelling and presentation. Ideal for data analysts and business intelligence teams.",
      images: ["https://images.unsplash.com/photo-1518770660439-4636190af475"]
    }
  ];

  // Load projects from localStorage or use default
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        setLocalProjects(JSON.parse(savedProjects));
      } else {
        setLocalProjects(defaultProjects);
        safelyStoreData('projects', defaultProjects);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setLocalProjects(defaultProjects);
    }
  }, []);

  // Find project when component mounts or projectId changes
  useEffect(() => {
    if (projectId && localProjects.length > 0) {
      const foundProject = localProjects.find(p => p.id === parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
        setEditTitle(foundProject.title);
        setEditDescription(foundProject.description);
        setEditLongDescription(foundProject.longDescription || '');
        setEditImages(foundProject.images || []);
        setEditVideoUrl(foundProject.videoUrl || '');
        setEditTools([...foundProject.tools]);
        setEditCategory(foundProject.category || '');
        setMediaType(foundProject.images && foundProject.images.length > 0 ? 'image' : 'video');
      }
    }
  }, [projectId, localProjects]);

  const handleSaveChanges = () => {
    if (project) {
      const updatedProject = {
        ...project,
        title: editTitle,
        description: editDescription,
        longDescription: editLongDescription,
        category: editCategory,
      };
      
      // Update with the correct media based on mediaType
      if (mediaType === 'image') {
        updatedProject.images = editImages;
        updatedProject.videoUrl = undefined;
      } else if (mediaType === 'video') {
        updatedProject.videoUrl = editVideoUrl;
        updatedProject.images = [];
      }

      // Update project in state 
      const updatedProjects = localProjects.map(p => 
        p.id === project.id ? updatedProject : p
      );
      
      setProject(updatedProject);
      setLocalProjects(updatedProjects);
      
      // Process for storage and save to localStorage with error handling
      const storableProjects = getStorableCopy(updatedProjects);
      const saved = safelyStoreData('projects', storableProjects);
      
      if (saved) {
        toast.success("Project updated successfully");
      } else {
        toast.warning("Project updated but some media content may not be saved due to storage limits");
      }
    }
  };

  const handleSaveTools = () => {
    if (project) {
      const updatedProject = {
        ...project,
        tools: [...editTools]
      };

      // Update project in state
      const updatedProjects = localProjects.map(p => 
        p.id === project.id ? updatedProject : p
      );
      
      setProject(updatedProject);
      setLocalProjects(updatedProjects);
      
      // Process for storage and save to localStorage with error handling
      const saved = safelyStoreData('projects', updatedProjects);
      
      if (saved) {
        toast.success("Tools updated successfully");
      } else {
        toast.warning("Changes might not be saved due to storage limits");
      }
    }
  };

  const handleAddTool = () => {
    if (newTool.trim()) {
      setEditTools([...editTools, newTool.trim()]);
      setNewTool('');
    }
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = [...editTools];
    updatedTools.splice(index, 1);
    setEditTools(updatedTools);
  };

  // Handle image URL addition
  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      // Process the image to ensure it's storage-friendly
      const processedUrl = processImageForStorage(newImageUrl.trim());
      setEditImages([...editImages, processedUrl]);
      setNewImageUrl('');
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...editImages];
    updatedImages.splice(index, 1);
    setEditImages(updatedImages);
  };

  // Handle image file upload with increased size constraints
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Limit to 5 files at once for better performance
      const selectedFiles = Array.from(files).slice(0, 5);
      
      selectedFiles.forEach(file => {
        // Increased file size limit to 5MB (from 2MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.warning(`File ${file.name} is too large (max 5MB). Please choose a smaller file.`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const result = event.target.result as string;
            // Process the image for storage
            const processedImage = processImageForStorage(result);
            setEditImages(prev => [...prev, processedImage]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    
    // Reset the input value to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
    }
  };

  // Handle video file upload with increased size constraints
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first video
      
      // Increased file size limit to 10MB (from 5MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.warning("Video file is too large (max 10MB). Please choose a smaller file.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const result = event.target.result as string;
          // Process the video for storage
          const processedVideo = processVideoForStorage(result);
          setEditVideoUrl(processedVideo);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Reset the input value to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
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
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-100 text-white border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Edit Project Details</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Make changes to your project. Large media files may have limits due to browser storage.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4 max-h-[70vh] overflow-y-auto pr-2">
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
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <Input 
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
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
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Media Type</label>
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          variant={mediaType === 'image' ? 'default' : 'outline'}
                          onClick={() => setMediaType('image')}
                        >
                          <Image className="mr-2 h-4 w-4" />
                          Images
                        </Button>
                        <Button 
                          type="button" 
                          variant={mediaType === 'video' ? 'default' : 'outline'}
                          onClick={() => setMediaType('video')}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Video
                        </Button>
                      </div>
                    </div>
                    
                    {mediaType === 'image' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Project Images <span className="text-xs text-gray-400">(max size: 5MB each)</span></label>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => imageFileInputRef.current?.click()}
                              title="Max size: 5MB per image"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Image
                            </Button>
                            <input
                              type="file"
                              ref={imageFileInputRef}
                              onChange={handleImageFileUpload}
                              accept="image/*"
                              style={{ display: 'none' }}
                              multiple
                            />
                          </div>
                        </div>
                        
                        {/* Image gallery */}
                        <div className="grid grid-cols-2 gap-2">
                          {editImages.map((img, index) => (
                            <div key={index} className="relative group rounded-md overflow-hidden">
                              <img 
                                src={img} 
                                alt={`Project image ${index + 1}`} 
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Add image URL option */}
                        <div>
                          <label className="text-sm font-medium mb-1 block">Add Image URL</label>
                          <div className="flex gap-2">
                            <Input 
                              value={newImageUrl}
                              onChange={(e) => setNewImageUrl(e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="bg-dark-200 border-gray-700 text-white flex-grow"
                            />
                            <Button onClick={handleAddImageUrl}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {mediaType === 'video' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Video <span className="text-xs text-gray-400">(max 10MB)</span></label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => videoFileInputRef.current?.click()}
                            title="Max size: 10MB"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Video
                          </Button>
                        </div>
                        
                        <input
                          type="file"
                          ref={videoFileInputRef}
                          onChange={handleVideoFileUpload}
                          accept="video/*"
                          style={{ display: 'none' }}
                        />
                        
                        {editVideoUrl && (
                          <div className="bg-dark-200 p-4 rounded-md">
                            <video 
                              controls 
                              className="w-full h-48 object-contain"
                            >
                              <source src={editVideoUrl} />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        
                        {/* For external video URL */}
                        <div>
                          <label className="text-sm font-medium mb-1 block">Or Enter Video URL</label>
                          <Input 
                            value={editVideoUrl}
                            onChange={(e) => setEditVideoUrl(e.target.value)}
                            placeholder="https://example.com/video.mp4"
                            className="bg-dark-200 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleSaveChanges}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* About this project section - moved above images */}
              <div className="prose prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this project</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  {project.longDescription || project.description}
                </p>
              </div>
              
              {/* Vertically stacked images */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-6 mb-8">
                  {project.images.map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-dark-100 shadow-md transition-transform hover:scale-[1.01]">
                      <img 
                        src={img} 
                        alt={`${project.title} - Image ${index + 1}`} 
                        className="w-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {project.videoUrl && (
                <div className="rounded-lg overflow-hidden mb-6 bg-dark-100">
                  <video 
                    controls 
                    className="w-full object-cover"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-dark-100 rounded-lg p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Project Details</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-dark-100 text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Edit Tools & Technologies</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Add or remove tools used in this project.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Current Tools</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {editTools.map((tool, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center bg-dark-200 text-gray-300 px-2 py-1 rounded"
                              >
                                <span className="text-xs">{tool}</span>
                                <button 
                                  onClick={() => handleRemoveTool(idx)}
                                  className="ml-2 text-gray-400 hover:text-gray-200"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Add New Tool</label>
                          <div className="flex gap-2">
                            <Input
                              value={newTool}
                              onChange={(e) => setNewTool(e.target.value)}
                              placeholder="Enter tool name"
                              className="bg-dark-200 border-gray-700 text-white"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddTool();
                                }
                              }}
                            />
                            <Button onClick={handleAddTool}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-4">
                          <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleSaveTools}>
                              <Save className="mr-2 h-4 w-4" />
                              Save Tools
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
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
