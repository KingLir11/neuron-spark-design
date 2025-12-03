
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
      window.history.replaceState({}, '', window.location.pathname + '#contact');
    }

    const handleServiceSelected = (event: CustomEvent) => {
      setFormData(prev => ({ ...prev, service: event.detail }));
    };

    window.addEventListener('serviceSelected', handleServiceSelected as EventListener);
    return () => {
      window.removeEventListener('serviceSelected', handleServiceSelected as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Sending email via edge function...');
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message
        }
      });

      console.log('Edge function response:', data, error);

      if (error) {
        throw new Error(error.message || 'Failed to send email');
      }

      if (data?.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        throw new Error(data?.error || 'Failed to send email');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="bg-dark-100 border-gray-700 text-white" 
          />
        </div>
        <div>
          <Input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            className="bg-dark-100 border-gray-700 text-white" 
          />
        </div>
        <div>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger className="bg-dark-100 border-gray-700 text-white">
              <SelectValue placeholder="Select the desired service" />
            </SelectTrigger>
            <SelectContent className="bg-dark-100 border-gray-700">
              <SelectItem value="Web Development" className="text-white hover:bg-gray-700">Web Development</SelectItem>
              <SelectItem value="Automation" className="text-white hover:bg-gray-700">Automation</SelectItem>
              <SelectItem value="Media Generation" className="text-white hover:bg-gray-700">Media Generation</SelectItem>
              <SelectItem value="Prompt Engineering" className="text-white hover:bg-gray-700">Prompt Engineering</SelectItem>
              <SelectItem value="Other" className="text-white hover:bg-gray-700">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Textarea 
            name="message" 
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleInputChange} 
            className="bg-dark-100 border-gray-700 text-white min-h-[120px]" 
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-black">
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
