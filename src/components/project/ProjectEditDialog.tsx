
import React, { useState, useRef } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Image, Video, Plus, X, Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

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

interface ProjectEditDialogProps {
  project: Project;
  onProjectUpdate: (updatedProject: Project) => void;
}

const ProjectEditDialog: React.FC<ProjectEditDialogProps> = ({ project, onProjectUpdate }) => {
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description || '');
  const [editLongDescription, setEditLongDescription] = useState(project.long_description || '');
  const [editImages, setEditImages] = useState<string[]>(project.images || []);
  const [editVideoUrl, setEditVideoUrl] = useState(project.video_url || '');
  const [editTools, setEditTools] = useState<string[]>(project.tools || []);
  const [editCategory, setEditCategory] = useState(project.category || '');
  const [newTool, setNewTool] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(
    project.images && project.images.length > 0 ? 'image' : 'video'
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

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
      const updatedProject = { ...project, ...updatedData };
      onProjectUpdate(updatedProject);
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

  return (
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
  );
};

export default ProjectEditDialog;
