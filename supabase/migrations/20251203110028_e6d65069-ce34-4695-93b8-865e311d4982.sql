-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can create contact submissions" ON public.contact_submissions;

-- Create an explicitly PERMISSIVE policy
CREATE POLICY "Allow public contact form submissions"
ON public.contact_submissions
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);