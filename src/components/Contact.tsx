import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare } from 'lucide-react';
const Contact: React.FC = () => {
  return <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
            Get in <span className="text-primary glow">Touch</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
            Ready to work together? Reach out and let's discuss how AI can transform your projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <Input type="text" placeholder="Your Name" className="bg-dark-100 border-gray-700 text-white" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" className="bg-dark-100 border-gray-700 text-white" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" className="bg-dark-100 border-gray-700 text-white min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-black">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Connect Directly</h3>
              
              <div className="space-y-6">
                <div className="bg-dark-100 p-5 rounded-lg flex items-start">
                  <Mail className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Email</h4>
                    <p className="text-gray-300">liransap11@gmail.com</p>
                  </div>
                </div>
                
                <div className="bg-dark-100 p-5 rounded-lg flex items-start py-[21px] my-[18px]">
                  <MessageSquare className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Phone Number</h4>
                    <p className="text-gray-300">+972 54-3551093</p>
                  </div>
                </div>
                
                <div className="bg-dark-100 p-5 rounded-lg flex items-start my-[11px] py-[5px]">
                  <svg className="w-5 h-5 text-primary mt-1 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  <div>
                    <h4 className="text-white font-medium mb-2">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/liran-sapozhnikov-b05577358/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/in/liran-sapozhnikov-b05577358</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;