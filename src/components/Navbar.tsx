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
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/' && !href.startsWith('#')) {
      return; // Let the Link component handle navigation
    }
    if (location.pathname !== '/' && href.startsWith('#')) {
      window.location.href = '/' + href; // Navigate to home page with hash
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const navLinks = [{
    title: 'Home',
    href: '#home'
  }, {
    title: 'About',
    href: '#about'
  }, {
    title: 'Services',
    href: '#services'
  }, {
    title: 'Projects',
    href: '/projects'
  }, {
    title: 'Contact',
    href: '#contact'
  }];
  return <header className={cn('fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-dark-100/90 backdrop-blur-md shadow-md' : 'bg-transparent')}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-primary glow">
            AI<span className="text-white">Expert</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => link.href.startsWith('#') ? <button key={link.href} onClick={() => handleNavClick(link.href)} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                  {link.title}
                </button> : <Link key={link.href} to={link.href} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                  {link.title}
                </Link>)}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => link.href.startsWith('#') ? <button key={link.href} onClick={() => handleNavClick(link.href)} className="text-gray-300 hover:text-primary transition-colors">
                    {link.title}
                  </button> : <Link key={link.href} to={link.href} className="text-gray-300 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {link.title}
                  </Link>)}
            </div>
          </nav>}
      </div>
    </header>;
};
export default Navbar;