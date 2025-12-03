-- Drop the restrictive policy
DROP POLICY IF EXISTS "Anyone can create contact submissions" ON public.contact_submissions;

-- Create a PERMISSIVE policy for anonymous inserts
CREATE POLICY "Anyone can create contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);