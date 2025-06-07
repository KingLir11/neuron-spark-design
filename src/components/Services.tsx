
import React from 'react';
import { Code, Zap, Image, Globe } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Web Development",
      description: "Create stunning web applications, responsive websites, and high-converting landing pages using modern technologies.",
      color: "bg-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Automation",
      description: "Build powerful workflows with Make.com, APIs, and custom GPTs to automate repetitive tasks and processes.",
      color: "bg-purple-500"
    },
    {
      icon: <Image className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Media Generation",
      description: "Create stunning visuals and dynamic video content with Midjourney, Kling and other leading AI tools.",
      color: "bg-green-500"
    },
    {
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Prompt Engineering",
      description: "Expert crafting of text, image and multimodal prompts to achieve precise, consistent results from AI systems.",
      color: "bg-red-500"
    }
  ];

  const handleServiceClick = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.history.pushState({}, '', `#contact?service=${encodeURIComponent(serviceTitle)}`);
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('serviceSelected', { detail: serviceTitle }));
    }
  };

  return (
    <section id="services" className="bg-dark-100 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white text-center">
          What can <span className="text-primary glow">I do for you</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
          I specialize in harnessing the power of AI to solve real-world problems and create innovative solutions.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-dark-200 border border-gray-700 p-6 rounded-lg group hover:glow-box transition-all duration-300 cursor-pointer hover:border-primary/30 touch-manipulation"
              onClick={() => handleServiceClick(service.title)}
            >
              <div className={`${service.color} p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
