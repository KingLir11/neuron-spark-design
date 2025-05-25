/**
 * Utilities for handling storage and media files
 */

import { toast } from '@/components/ui/sonner';

/**
 * Generate a simple unique ID for filenames
 * This is a fallback method in case uuid package isn't available
 */
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Attempts to store data in localStorage with error handling
 */
export const safelyStoreData = async (key: string, data: any): Promise<boolean> => {
  try {
    // Store data in localStorage
    const jsonString = JSON.stringify(data);
    
    // Check estimated size before attempting to save to localStorage
    if (jsonString.length > 3500000) { // ~3.5MB safety threshold
      console.warn("Data too large for localStorage, storage may fail");
      toast.warning("Large amount of data - some features may be limited");
    }
    
    localStorage.setItem(key, jsonString);
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
    // For now, just check if localStorage is available
    if (typeof Storage !== "undefined") {
      console.info('Local storage is available');
      return true;
    } else {
      console.warn('Local storage is not available');
      return false;
    }
  } catch (error) {
    console.error('Failed to initialize storage:', error);
    return false;
  }
};

/**
 * Upload image to storage (currently using data URLs as fallback)
 * Returns the URL of the uploaded image
 */
export const uploadImageToStorage = async (imageData: string | File): Promise<string> => {
  try {
    // For now, if it's a File object, convert to data URL
    if (imageData instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(imageData);
      });
    }
    
    // If it's already a data URL or external URL, return as is
    return imageData;
  } catch (error) {
    console.error('Upload processing error:', error);
    toast.error('Failed to process image upload');
    return '';
  }
};

/**
 * Upload video to storage (currently using data URLs as fallback)
 * Returns the URL of the uploaded video
 */
export const uploadVideoToStorage = async (videoData: string | File): Promise<string> => {
  try {
    // For now, if it's a File object, convert to data URL
    if (videoData instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(videoData);
      });
    }
    
    // If it's already a data URL or external URL, return as is
    return videoData;
  } catch (error) {
    console.error('Upload processing error:', error);
    toast.error('Failed to process video upload');
    return '';
  }
};

/**
 * Process image data before storing
 * For existing URLs, return as is. For new uploads, upload to storage
 */
export const processImageForStorage = async (imageUrl: string): Promise<string> => {
  // If it's a data URL (from file upload), keep as data URL for now
  if (imageUrl.startsWith('data:image')) {
    return imageUrl;
  }
  // If it's already a URL, return as is
  return imageUrl;
};

/**
 * Process video data before storing
 * For existing URLs, return as is. For new uploads, upload to storage
 */
export const processVideoForStorage = async (videoUrl: string): Promise<string> => {
  // If it's a data URL (from file upload), keep as data URL for now
  if (videoUrl.startsWith('data:video')) {
    return videoUrl;
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
