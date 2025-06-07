
interface ProjectType {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  long_description?: string;
  images?: string[];
  video_url?: string;
}

export const getProjectThumbnail = (project: ProjectType): string | null => {
  if (project.title.toLowerCase().includes('marco')) {
    return '/lovable-uploads/e047683d-9567-4463-987c-9a65e286e3a1.png';
  }
  if (project.title.toLowerCase().includes('red bull') || project.title.toLowerCase().includes('redbull')) {
    return '/lovable-uploads/3f103bfc-8181-405b-a1d3-b23db84a82b0.png';
  }
  if (project.title.toLowerCase().includes('reflection')) {
    return '/lovable-uploads/949217ba-35cf-41c5-a568-1057e66b9e0f.png';
  }
  if (project.title.toLowerCase().includes('fashion') || project.title.toLowerCase().includes('brand')) {
    return '/lovable-uploads/7a6ef81f-3f7d-417c-a5f9-2978e0228852.png';
  }
  if (project.title.toLowerCase().includes('custom playlist') || project.title.toLowerCase().includes('playlist')) {
    return '/lovable-uploads/3f31b1e6-7dc2-4cf7-b4b5-c1ce6e2e81e0.png';
  }
  if (project.images && project.images.length > 0) {
    return project.images[0];
  }
  return null;
};

export const arrangeProjects = (projects: ProjectType[]): ProjectType[] => {
  const projectOrder = ['reflection', 'marco', 'fashion', 'custom playlist', 'redbull'];
  const arranged: ProjectType[] = [];
  
  projectOrder.forEach(keyword => {
    const project = projects.find(p => 
      p.title.toLowerCase().includes(keyword.toLowerCase()) || 
      (keyword === 'redbull' && p.title.toLowerCase().includes('red bull'))
    );
    if (project) {
      arranged.push(project);
    }
  });
  
  return arranged;
};
