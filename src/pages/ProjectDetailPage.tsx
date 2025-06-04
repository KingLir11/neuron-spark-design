import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Edit, Image, Video, Plus, X, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLongDescription, setEditLongDescription] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editTools, setEditTools] = useState<string[]>([]);
  const [editCategory, setEditCategory] = useState('');
  const [newTool, setNewTool] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

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
          setEditTitle(data.title);
          setEditDescription(data.description || '');
          setEditLongDescription(data.long_description || '');
          setEditImages(data.images || []);
          setEditVideoUrl(data.video_url || '');
          setEditTools(data.tools || []);
          setEditCategory(data.category || '');
          setMediaType(data.images && data.images.length > 0 ? 'image' : 'video');
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

  const uploadFileToStorage = async (file: File, type: 'image' | 'video'): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-media')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error(`Failed to upload ${type}`);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
      return null;
    }
  };

  const handleSaveChanges = async () => {
    if (!project) return;

    setIsLoading(true);
    toast.info("Saving changes...");
    
    try {
      const updatedData = {
        title: editTitle,
        description: editDescription,
        long_description: editLongDescription,
        category: editCategory,
        tools: editTools,
        images: mediaType === 'image' ? editImages : [],
        video_url: mediaType === 'video' ? editVideoUrl : null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('projects')
        .update(updatedData)
        .eq('id', project.id);

      if (error) {
        console.error('Error updating project:', error);
        toast.error('Failed to update project');
        return;
      }

      // Update local state
      setProject({ ...project, ...updatedData });
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to update project");
    } finally {
      setIsLoading(false);
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

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setEditImages([...editImages, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...editImages];
    updatedImages.splice(index, 1);
    setEditImages(updatedImages);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);
      
      for (const file of selectedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          toast.warning(`File ${file.name} is too large (max 10MB). Please choose a smaller file.`);
          continue;
        }
        
        toast.info(`Uploading ${file.name}...`);
        const uploadedUrl = await uploadFileToStorage(file, 'image');
        if (uploadedUrl) {
          setEditImages(prev => [...prev, uploadedUrl]);
          toast.success(`${file.name} uploaded successfully`);
        }
      }
    }
    
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (file.size > 150 * 1024 * 1024) {
        toast.warning("Video file is too large (max 150MB). Please choose a smaller file.");
        return;
      }
      
      toast.info(`Uploading ${file.name}...`);
      const uploadedUrl = await uploadFileToStorage(file, 'video');
      if (uploadedUrl) {
        setEditVideoUrl(uploadedUrl);
        toast.success(`${file.name} uploaded successfully`);
      }
    }
    
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleBackToProjects = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={handleBackToProjects}>
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
          <div className="mb-8">
            <button 
              onClick={handleBackToProjects}
              className="inline-flex items-center text-primary hover:underline mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </button>
            
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
                <DialogContent className="bg-dark-100 text-white border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Edit Project Details</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Make changes to your project. Media is stored in Supabase storage.
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
                          <label className="text-sm font-medium">Project Images</label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => imageFileInputRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Images
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
                        
                        <div className="grid grid-cols-2 gap-2">
                          {editImages.map((img, index) => (
                            <div key={index} className="relative group rounded-md overflow-hidden">
                              <img 
                                src={img} 
                                alt={`Project image ${index + 1}`} 
                                className="w-full h-32 object-cover"
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
                          <label className="text-sm font-medium">Video</label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => videoFileInputRef.current?.click()}
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
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tools & Technologies</label>
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
                    
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button 
                        onClick={handleSaveChanges} 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this project</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  {project.long_description || project.description}
                </p>
              </div>
              
              {project.images && project.images.length > 0 && (
                <div className="mb-8">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="rounded-lg overflow-hidden bg-dark-100 shadow-md">
                            <img 
                              src={img} 
                              alt={`${project.title} - Image ${index + 1}`} 
                              className="w-full h-96 object-contain"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {project.images.length > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                </div>
              )}
              
              {project.video_url && (
                <div className="rounded-lg overflow-hidden mb-6 bg-dark-100">
                  <video 
                    controls 
                    className="w-full object-cover"
                  >
                    <source src={project.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
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
                      {project.tools && project.tools.map((tool, idx) => (
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
