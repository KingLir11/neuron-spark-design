
import React from 'react';
import { Code, Zap, Image, Video } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Prompt Engineering",
      description: "Expert crafting of text, image and multimodal prompts to achieve precise, consistent results from AI systems.",
      icon: Code,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Automation",
      description: "Build powerful workflows with Make.com, APIs, and custom GPTs to automate repetitive tasks and processes.",
      icon: Zap,
      color: "from-purple-500 to-indigo-400"
    },
    {
      title: "AI Image Generation",
      description: "Create stunning visuals with Midjourney, DALL·E, and custom Photoshop workflows that push creative boundaries.",
      icon: Image,
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "AI Video Creation",
      description: "Develop dynamic video content with Runway, Pika, and script-to-video pipelines that bring ideas to life.",
      icon: Video,
      color: "from-red-500 to-pink-400"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          What I <span className="text-primary glow">Do</span>
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
          I specialize in four key areas, combining technical expertise with creative solutions
          to help you harness the full potential of AI technology.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-dark-100 rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px] hover:glow-box"
            >
              <div className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-gradient-to-r ${service.color}`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
