
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/' && !href.startsWith('#')) {
      return; // Let the Link component handle navigation
    }
    if (location.pathname !== '/' && href.startsWith('#')) {
      window.location.href = '/' + href; // Navigate to home page with hash
      return;
    }
    
    // Add a small delay to ensure the element is loaded
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const navLinks = [
    {
      title: 'Home',
      href: '#home'
    },
    {
      title: 'What I Do',
      href: '#services'
    },
    {
      title: 'Projects',
      href: '#projects'
    },
    {
      title: 'About Me',
      href: '#about'
    },
    {
      title: 'Contact',
      href: '#contact'
    }
  ];

  return (
    <>
      <header className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-dark-100/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}>
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-display font-bold text-primary glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-200 rounded-sm">
              Liran <span className="text-white">Sapozhnikov</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-200 rounded-sm px-2 py-1"
                >
                  {link.title}
                </button>
              ))}
            </nav>

            {/* LinkedIn Link */}
            <div className="hidden md:flex items-center">
              <a 
                href="https://www.linkedin.com/in/liran-sapozhnikov-b05577358/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-200 rounded-sm p-2"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button - Improved touch target */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-200 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Fixed positioning and backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <nav className="absolute top-[72px] left-0 right-0 bg-dark-100/98 backdrop-blur-md border-t border-gray-700 shadow-xl animate-fade-in">
            <div className="flex flex-col py-4">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-gray-300 hover:text-primary hover:bg-dark-200/50 transition-colors duration-200 text-left px-6 py-4 text-base font-medium focus:outline-none focus:text-primary focus:bg-dark-200/50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-100 border-b border-gray-700/50 last:border-b-0"
                >
                  {link.title}
                </button>
              ))}
              <a 
                href="https://www.linkedin.com/in/liran-sapozhnikov-b05577358/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary hover:bg-dark-200/50 transition-colors duration-200 flex items-center px-6 py-4 text-base font-medium focus:outline-none focus:text-primary focus:bg-dark-200/50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-100 mt-2 border-t border-gray-700/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
