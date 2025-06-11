
import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Connect Directly</h3>
      
      <div className="space-y-6">
        <div className="bg-dark-100 p-5 rounded-lg flex items-start py-[23px]">
          <Mail className="w-5 h-5 text-primary mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-2">Email</h4>
            <p className="text-gray-300">liransap11@gmail.com</p>
          </div>
        </div>
        
        <div className="bg-dark-100 p-5 rounded-lg flex items-start my-[18px] py-[15px]">
          <MessageSquare className="w-5 h-5 text-primary mt-1 mr-4" />
          <div>
            <h4 className="text-white font-medium mb-2">Phone Number</h4>
            <p className="text-gray-300">+972 54-3551093</p>
          </div>
        </div>
        
        <div className="bg-dark-100 p-5 flex items-start my-[11px] rounded-lg py-[25px]">
          <svg className="w-5 h-5 text-primary mt-1 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          <div>
            <a href="https://www.linkedin.com/in/liran-sapozhnikov-b05577358/" target="_blank" rel="noopener noreferrer" className="text-white font-medium mb-2 hover:text-primary transition-colors cursor-pointer">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
