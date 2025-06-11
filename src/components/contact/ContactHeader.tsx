
import React from 'react';

const ContactHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Get in <span className="text-primary glow">Touch</span>
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Ready to work together? Reach out and let's discuss how AI can transform your projects.
      </p>
    </div>
  );
};

export default ContactHeader;
