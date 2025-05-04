
/**
 * Utilities for handling storage and large media files
 */

import { toast } from '@/components/ui/sonner';

/**
 * Attempts to store data in localStorage with error handling
 */
export const safelyStoreData = (key: string, data: any): boolean => {
  try {
    // For large objects like uploaded images/videos, we need to handle storage more carefully
    const jsonString = JSON.stringify(data);
    
    // Check estimated size before attempting to save (rough estimate)
    // ~2 bytes per character in a JSON string, 5MB limit in most browsers
    if (jsonString.length > 2500000) { // ~2.5MB safety threshold
      console.warn("Data too large for localStorage, attempting to reduce size");
      return false;
    }
    
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    console.error("Storage error:", error);
    toast.error("Unable to save changes. The data may be too large for browser storage.");
    return false;
  }
};

/**
 * Process image data to reduce size if needed
 * Returns the processed image URL (might be original or resized)
 */
export const processImageForStorage = (imageUrl: string): string => {
  // If it's a data URL (from file upload), it might be very large
  if (imageUrl.startsWith('data:image')) {
    // For now just return the original, but this function could be
    // extended to resize/compress the image as needed
    return imageUrl;
  }
  return imageUrl;
};

/**
 * Process uploaded video to ensure it can be stored
 */
export const processVideoForStorage = (videoUrl: string): string => {
  // Similar to images, we return the original for now
  // But this function could be extended to compress or process the video
  return videoUrl;
};

/**
 * Get a safely sized subset of projects for storage
 * Optionally process media content
 */
export const getStorableCopy = (projects: any[]): any[] => {
  // Process each project to ensure it can be safely stored
  return projects.map(project => {
    // Create a copy of the project
    const processedProject = { ...project };
    
    // Process images if needed
    if (project.images && project.images.length > 0) {
      // Limit to at most 3 images per project for storage
      const limitedImages = project.images.slice(0, 3);
      
      // Process each image (potential future optimization)
      processedProject.images = limitedImages;
    }
    
    // Return the processed project
    return processedProject;
  });
};
