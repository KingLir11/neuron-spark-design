
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-dark-100 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-display font-bold text-primary">
              AI<span className="text-white">Expert</span>
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {currentYear} AI Expert. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
