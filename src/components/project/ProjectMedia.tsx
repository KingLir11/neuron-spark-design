
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const ProjectMedia: React.FC<ProjectMediaProps> = ({
  project
}) => {
  // Check if this is the Fashion Brand Collection project
  const isFashionProject = project.title.toLowerCase().includes('fashion') || 
                          project.title.toLowerCase().includes('brand');

  return <>
      {project.images && project.images.length > 0 && <div className="mb-8">
          <Carousel className={`w-full ${isFashionProject ? 'max-w-2xl' : 'max-w-md'} mx-auto`}>
            <CarouselContent>
              {project.images.map((img, index) => <CarouselItem key={index}>
                  <div className="overflow-hidden bg-dark-100 shadow-md rounded-lg">
                    <div className={`w-full mx-auto ${isFashionProject ? 'aspect-square max-w-lg' : 'aspect-square max-w-sm'}`}>
                      <img 
                        src={img} 
                        alt={`${project.title} - Image ${index + 1}`} 
                        loading={index === 0 ? "eager" : "lazy"} 
                        className={`w-full h-full ${isFashionProject ? 'object-cover' : 'object-fill'}`} 
                      />
                    </div>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>}
      
      {project.video_url && <div className="rounded-lg overflow-hidden mb-6 bg-dark-100">
          <video controls className="w-full object-cover">
            <source src={project.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>}
    </>;
};

export default ProjectMedia;
