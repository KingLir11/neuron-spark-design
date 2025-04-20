
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
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
                  <Input 
                    type="text" 
                    placeholder="Your Name" 
                    className="bg-dark-100 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="bg-dark-100 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    className="bg-dark-100 border-gray-700 text-white min-h-[120px]"
                  />
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
                    <p className="text-gray-300">contact@aiexpert.com</p>
                  </div>
                </div>
                
                <div className="bg-dark-100 p-5 rounded-lg flex items-start">
                  <MessageSquare className="w-5 h-5 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Telegram</h4>
                    <p className="text-gray-300">@ai_expert</p>
                  </div>
                </div>
                
                <div className="bg-dark-100 p-5 rounded-lg">
                  <h4 className="text-white font-medium mb-3">Availability</h4>
                  <p className="text-gray-300 mb-2">Monday - Friday</p>
                  <p className="text-gray-300 font-mono">09:00 - 18:00 UTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
