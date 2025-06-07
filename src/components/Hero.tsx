
import React from 'react';
import { Button } from '@/components/ui/button';
import TypingEffect from './TypingEffect';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-3 space-y-6 lg:space-y-8 max-w-2xl text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <TypingEffect text="Creating with purpose. Enhancing with AI." speed={70} className="inline-block" />
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Automation architect | Prompt engineer | GenAI content creator
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-black font-semibold rounded-md h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg min-w-[200px] touch-manipulation transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-200" 
                onClick={scrollToContact}
              >
                Let's build something unreal
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-md h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg min-w-[200px] touch-manipulation transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-dark-200" 
                onClick={scrollToProjects}
              >
                View my work
              </Button>
            </div>
            
            <div className="pt-4 lg:pt-8">
              <p className="text-gray-400 font-mono text-sm sm:text-base">
                Using cutting-edge AI to create impactful solutions
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg order-first lg:order-last">
            <div className="aspect-square w-full max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-dark-100 via-dark-300 to-glow-blue/20 rounded-lg p-1">
              <div className="w-full h-full bg-dark-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/111b5161-6e9d-4e41-ab55-4e031f858eb3.png" 
                  alt="AI Expert at work" 
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105" 
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
