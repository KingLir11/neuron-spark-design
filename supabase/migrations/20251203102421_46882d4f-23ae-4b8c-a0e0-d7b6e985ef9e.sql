-- Allow anyone to update projects (for admin use)
CREATE POLICY "Anyone can update projects" 
ON public.projects 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Allow anyone to insert projects (for admin use)
CREATE POLICY "Anyone can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to delete projects (for admin use)
CREATE POLICY "Anyone can delete projects" 
ON public.projects 
FOR DELETE 
USING (true);