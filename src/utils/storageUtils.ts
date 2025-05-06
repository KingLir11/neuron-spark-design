
/**
 * Utilities for handling storage and media files
 */

import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_BUCKET = 'project_media';

/**
 * Generate a simple unique ID for filenames
 * This is a fallback method in case uuid package isn't available
 */
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Attempts to store data in localStorage with error handling
 * Also syncs data to Supabase for persistence
 */
export const safelyStoreData = async (key: string, data: any): Promise<boolean> => {
  try {
    // Store data in localStorage as a fallback
    const jsonString = JSON.stringify(data);
    
    // Check estimated size before attempting to save to localStorage
    if (jsonString.length > 3500000) { // ~3.5MB safety threshold
      console.warn("Data too large for localStorage, only saving to Supabase");
    } else {
      localStorage.setItem(key, jsonString);
    }
    
    // If this is project data, sync with Supabase
    if (key === 'projects') {
      try {
        // For each project, upsert to Supabase
        await Promise.all(data.map(async (project: any) => {
          const { error } = await supabase.from('projects').upsert({
            id: project.id,
            title: project.title,
            description: project.description,
            tools: project.tools,
            category: project.category,
            long_description: project.longDescription,
            images: project.images || [],
            video_url: project.videoUrl
          });
          
          if (error) {
            console.error('Error syncing project to Supabase:', error);
            throw error;
          }
        }));
        
        console.log('Projects synced to Supabase successfully');
      } catch (error) {
        console.error('Failed to sync projects to Supabase:', error);
        toast.error("Changes saved locally but failed to sync to the cloud");
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Storage error:", error);
    toast.error("Unable to save changes to browser storage.");
    return false;
  }
};

/**
 * Ensures the storage bucket exists and is ready to use
 */
export const initializeStorage = async (): Promise<boolean> => {
  try {
    // Check if our bucket exists
    const { data, error } = await supabase.storage.getBucket(STORAGE_BUCKET);
    
    if (error) {
      console.error('Error checking storage bucket:', error);
      toast.error('Media storage not available. Some features may be limited.');
      return false;
    }
    
    console.info('Storage bucket is ready:', STORAGE_BUCKET);
    return true;
  } catch (error) {
    console.error('Failed to initialize storage:', error);
    return false;
  }
};

/**
 * Upload image to Supabase storage
 * Returns the URL of the uploaded image
 */
export const uploadImageToStorage = async (imageData: string | File): Promise<string> => {
  try {
    let file: File;
    let fileExt: string;
    let fileName: string;

    // Handle both data URLs and File objects
    if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      // Convert data URL to File object
      const res = await fetch(imageData);
      const blob = await res.blob();
      fileExt = imageData.split(';')[0].split('/')[1] || 'png';
      fileName = `${generateUniqueId()}.${fileExt}`;
      file = new File([blob], fileName, { type: `image/${fileExt}` });
    } else if (imageData instanceof File) {
      file = imageData;
      fileExt = file.name.split('.').pop() || 'png';
      fileName = `${generateUniqueId()}.${fileExt}`;
    } else {
      // If it's an external URL, just return it
      if (typeof imageData === 'string' && (imageData.startsWith('http://') || imageData.startsWith('https://'))) {
        return imageData;
      }
      throw new Error('Invalid image data format');
    }

    // Max size check: 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.warning(`File is too large (max 10MB). Please choose a smaller file.`);
      throw new Error('File too large');
    }

    console.log(`Uploading image ${fileName} to ${STORAGE_BUCKET}/images`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`images/${fileName}`, file, {
        upsert: true, // Enable upsert in case the file already exists
        cacheControl: '3600'
      });

    if (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
      throw error;
    }

    console.log('Image uploaded successfully:', data?.path);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`images/${fileName}`);

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload processing error:', error);
    toast.error('Failed to process image upload');
    // Return empty string to indicate failure
    return '';
  }
};

/**
 * Upload video to Supabase storage
 * Returns the URL of the uploaded video
 */
export const uploadVideoToStorage = async (videoData: string | File): Promise<string> => {
  try {
    let file: File;
    let fileExt: string;
    let fileName: string;

    // Handle both data URLs and File objects
    if (typeof videoData === 'string' && videoData.startsWith('data:')) {
      // Convert data URL to File object
      const res = await fetch(videoData);
      const blob = await res.blob();
      fileExt = videoData.split(';')[0].split('/')[1] || 'mp4';
      fileName = `${generateUniqueId()}.${fileExt}`;
      file = new File([blob], fileName, { type: `video/${fileExt}` });
    } else if (videoData instanceof File) {
      file = videoData;
      fileExt = file.name.split('.').pop() || 'mp4';
      fileName = `${generateUniqueId()}.${fileExt}`;
    } else {
      // If it's an external URL, just return it
      if (typeof videoData === 'string' && (videoData.startsWith('http://') || videoData.startsWith('https://'))) {
        return videoData;
      }
      throw new Error('Invalid video data format');
    }

    // Max size check: 100MB
    if (file.size > 100 * 1024 * 1024) {
      toast.warning(`File is too large (max 100MB). Please choose a smaller file.`);
      throw new Error('File too large');
    }

    console.log(`Uploading video ${fileName} to ${STORAGE_BUCKET}/videos`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`videos/${fileName}`, file, {
        upsert: true, // Enable upsert in case the file already exists
        cacheControl: '3600'
      });

    if (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video. Please try again.');
      throw error;
    }

    console.log('Video uploaded successfully:', data?.path);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`videos/${fileName}`);

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload processing error:', error);
    toast.error('Failed to process video upload');
    // Return empty string to indicate failure
    return '';
  }
};

/**
 * Process image data before storing
 * For existing URLs, return as is. For new uploads, upload to Supabase
 */
export const processImageForStorage = async (imageUrl: string): Promise<string> => {
  // If it's a data URL (from file upload), upload to Supabase
  if (imageUrl.startsWith('data:image')) {
    return await uploadImageToStorage(imageUrl);
  }
  // If it's already a URL, return as is
  return imageUrl;
};

/**
 * Process video data before storing
 * For existing URLs, return as is. For new uploads, upload to Supabase
 */
export const processVideoForStorage = async (videoUrl: string): Promise<string> => {
  // If it's a data URL (from file upload), upload to Supabase
  if (videoUrl.startsWith('data:video')) {
    return await uploadVideoToStorage(videoUrl);
  }
  // If it's already a URL, return as is
  return videoUrl;
};

/**
 * Get a safely sized subset of projects for storage in localStorage
 * Processes only metadata, not media content
 */
export const getStorableCopy = (projects: any[]): any[] => {
  // Process each project to ensure it can be safely stored
  return projects.map(project => {
    // Create a copy of the project with all metadata
    const processedProject = { ...project };
    
    // Keep only the URLs for images and videos, not the full data
    if (project.images && project.images.length > 0) {
      processedProject.images = [...project.images];
    }
    
    // Return the processed project
    return processedProject;
  });
};
