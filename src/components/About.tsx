import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            About <span className="text-primary glow">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                I'm an AI specialist focused on turning emerging technologies into practical, powerful solutions. 
                My journey began with coding and design, evolving into AI as the field exploded with possibilities.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Today, I bridge the gap between cutting-edge AI capabilities and real-world applications. 
                Whether it's crafting perfect prompts, building automated workflows, or generating stunning visuals,
                I help businesses and creators harness AI's full potential.
              </p>
              
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-white mb-3">My Approach:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">→</span>
                    <span>System thinking with creative problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">→</span>
                    <span>Practical implementation with measurable results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">→</span>
                    <span>Continuous exploration of emerging AI capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <img
                  src="/lovable-uploads/d7a59393-6000-4bc0-80f3-f352306e9523.png"
                  alt="AI Expert Profile"
                  className="w-full h-full object-cover rounded-lg"
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
