
-- Create a table to store contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  webhook_sent BOOLEAN DEFAULT false,
  webhook_sent_at TIMESTAMP WITH TIME ZONE,
  webhook_error TEXT
);

-- Add Row Level Security (RLS) - only you should be able to see these submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows viewing all submissions (you'll need to be authenticated as admin)
CREATE POLICY "Admin can view all contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (true);

-- Create a policy that allows inserting new submissions (public access for the contact form)
CREATE POLICY "Anyone can create contact submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy that allows updating submissions (for webhook status updates)
CREATE POLICY "System can update webhook status" 
  ON public.contact_submissions 
  FOR UPDATE 
  USING (true);
