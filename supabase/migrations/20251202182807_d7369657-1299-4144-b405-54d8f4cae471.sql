-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT,
  tools TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  video_url TEXT
);

-- Enable RLS but allow public read access (portfolio is public)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read projects (public portfolio)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  webhook_sent BOOLEAN DEFAULT false,
  webhook_sent_at TIMESTAMP WITH TIME ZONE,
  webhook_error TEXT
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms
CREATE POLICY "Anyone can create contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for project media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-media', 'project-media', true);

-- Allow public read access to project media
CREATE POLICY "Public read access for project media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-media');

-- Allow public upload to project media (for admin use)
CREATE POLICY "Public upload access for project media"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-media');