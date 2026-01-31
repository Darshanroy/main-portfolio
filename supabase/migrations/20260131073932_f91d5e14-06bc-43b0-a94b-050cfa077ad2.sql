-- Portfolio content tables for admin panel

-- Profile/Settings table
CREATE TABLE public.portfolio_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Darshan Kumar',
    tagline TEXT DEFAULT 'Full-Stack Developer | Mysuru',
    bio TEXT,
    photo_url TEXT,
    resume_url TEXT,
    location TEXT DEFAULT 'Mysuru',
    email TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    thumbnail_url TEXT,
    live_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Experience/Timeline table
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT,
    location TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    type TEXT CHECK (type IN ('work', 'education')) DEFAULT 'work',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skills table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    category TEXT,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100) DEFAULT 80,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies for portfolio data (visitors can view)
CREATE POLICY "Anyone can view portfolio profile" 
ON public.portfolio_profile FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view projects" 
ON public.projects FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view experiences" 
ON public.experiences FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view skills" 
ON public.skills FOR SELECT 
USING (true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_portfolio_profile_updated_at
    BEFORE UPDATE ON public.portfolio_profile
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON public.experiences
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default profile
INSERT INTO public.portfolio_profile (name, tagline, bio, location)
VALUES (
    'Darshan Kumar',
    'Full-Stack Developer | Mysuru',
    'Passionate full-stack developer crafting beautiful, performant web experiences. I love turning complex problems into elegant solutions.',
    'Mysuru, India'
);