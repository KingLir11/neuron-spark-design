
import React from 'react';
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

interface ProjectMediaProps {
  project: Project;
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ project }) => {
  return (
    <>
      {project.images && project.images.length > 0 && (
        <div className="mb-8">
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {project.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="rounded-lg overflow-hidden bg-dark-100 shadow-md">
                    <div className="aspect-square w-full max-w-sm mx-auto">
                      <img 
                        src={img} 
                        alt={`${project.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
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
    </>
  );
};

export default ProjectMedia;
