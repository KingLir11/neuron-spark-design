
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white text-center lg:text-left">
            About <span className="text-primary glow">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Hi! My name is Liran, I'm an AI specialist focused on turning emerging technologies into practical, powerful solutions. I entered the world of AI head-on, driven by curiosity and a hands-on approach to real-world problem solving.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Today, I bridge the gap between cutting-edge AI capabilities and real-world applications. 
                Whether it's crafting perfect prompts, building automated workflows, or generating stunning visuals,
                I help businesses and creators harness AI's full potential.
              </p>
              
              <div className="pt-2 sm:pt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">My Approach:</h3>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1 flex-shrink-0">→</span>
                    <span>System thinking with creative problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1 flex-shrink-0">→</span>
                    <span>Practical implementation with measurable results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1 flex-shrink-0">→</span>
                    <span>Continuous exploration of emerging AI capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[1/1] relative rounded-lg overflow-hidden max-w-sm mx-auto lg:max-w-none">
                <img 
                  src="/lovable-uploads/d7a59393-6000-4bc0-80f3-f352306e9523.png" 
                  alt="AI Expert Profile" 
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105" 
                  loading="lazy"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 512px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
