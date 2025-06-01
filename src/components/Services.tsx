
import React from 'react';
import { Bot, Palette, Zap, Video, Brain, Database } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Automation",
      description: "Custom AI workflows that streamline your business processes and boost productivity through intelligent automation."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative AI",
      description: "Leverage AI tools like Midjourney and DALL·E to create stunning visuals, artwork, and design assets."
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Generation",
      description: "AI-powered video creation pipelines that transform ideas into engaging visual content at scale."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Prompt Engineering",
      description: "Expertly crafted prompts that unlock the full potential of AI models for your specific use cases."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Workflow Integration",
      description: "Seamlessly integrate AI capabilities into your existing workflows with tools like Make.com and Zapier."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Processing",
      description: "Transform and analyze your data using AI to extract insights and automate decision-making processes."
    }
  ];

  return (
    <section id="services" className="py-20 bg-dark-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          What can <span className="text-primary glow">I do for you</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          I specialize in harnessing the power of AI to solve real-world problems and create innovative solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-dark-100 p-6 rounded-lg group hover:glow-box transition-all duration-300">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300">
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
