import React from 'react';
import { Button } from '@/components/ui/button';
import TypingEffect from './TypingEffect';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8 max-w-2xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <TypingEffect 
                  text="Creating with purpose. Enhancing with AI." 
                  speed={70} 
                  className="inline-block"
                />
              </h1>
              <p className="text-xl text-gray-300">
                Automation architect | Prompt engineer | GenAI content creator
              </p>
            </div>
            
            <div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-black font-semibold rounded-md mr-4"
                onClick={scrollToContact}
              >
                Let's build something unreal
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-gray-600 text-white hover:bg-gray-800 rounded-md"
                onClick={scrollToProjects}
              >
                View my work
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-gray-400 font-mono text-sm">
                Using cutting-edge AI to create impactful solutions
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
            <div className="aspect-square w-full bg-gradient-to-br from-dark-100 via-dark-300 to-glow-blue/20 rounded-lg p-1">
              <div className="w-full h-full bg-dark-200 rounded-lg flex items-center justify-center">
                <img
                  src="/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpg"
                  alt="AI Expert at work"
                  className="w-full h-full object-cover rounded-lg opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-dark-200 via-transparent">
                  <div className="text-center space-y-3">
                    <div className="text-5xl text-glow-blue">
                      <span className="inline-block animate-pulse">{`>`}</span>
                    </div>
                    <div className="font-mono text-gray-400 text-sm">
                      AI Expert at work.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
