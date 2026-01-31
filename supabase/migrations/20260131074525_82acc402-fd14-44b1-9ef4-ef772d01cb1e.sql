-- Create admin policies for CRUD operations
-- Since this is a personal portfolio, we'll use a simple approach with service role for admin
-- In production, you'd implement proper auth with user roles

-- Add policies for admin operations (using anon role for simplicity in demo)
-- These allow full CRUD on portfolio tables from the admin panel

CREATE POLICY "Admin can manage portfolio profile" 
ON public.portfolio_profile FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin can manage projects" 
ON public.projects FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin can manage experiences" 
ON public.experiences FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin can manage skills" 
ON public.skills FOR ALL 
USING (true)
WITH CHECK (true);

-- Admin can manage contact messages (view and delete)
CREATE POLICY "Admin can manage contact messages" 
ON public.contact_messages FOR ALL 
USING (true)
WITH CHECK (true);