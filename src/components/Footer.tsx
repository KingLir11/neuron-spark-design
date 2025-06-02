
import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-dark-100 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center px-0">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-display font-bold text-primary">
              Liran<span className="text-white"> Sapozhnikov</span>
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {currentYear} Liran Sapozhnikov. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/liran-sapozhnikov-b05577358/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
