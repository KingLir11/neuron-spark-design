
import React from 'react';
import ContactHeader from './contact/ContactHeader';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ContactHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
