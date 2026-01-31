import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';

interface Profile {
  name: string;
  tagline: string;
  photo_url?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
}

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('portfolio_profile')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch featured projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true)
          .order('display_order', { ascending: true })
          .limit(4);

        if (projectsData) {
          setProjects(projectsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default values for demo
  const displayProfile = profile || {
    name: 'Darshan Kumar',
    tagline: 'Full-Stack Developer | Mysuru',
    photo_url: undefined,
  };

  return (
    <PageTransition>
      <main>
        {/* Hero Section */}
        <Hero
          name={displayProfile.name}
          tagline={displayProfile.tagline || ''}
          photoUrl={displayProfile.photo_url}
        />

        {/* Featured Projects Section */}
        <section id="featured-projects" className="py-24 px-6">
          <div className="container mx-auto">
            <motion.div
              className="flex items-center justify-between mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Featured Work
                </h2>
                <p className="text-muted-foreground">
                  Selected projects I'm proud of
                </p>
              </div>
              <Link
                to="/projects"
                className="hidden md:flex items-center gap-2 text-primary hover:gap-4 transition-all font-medium"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description || ''}
                    thumbnailUrl={project.thumbnail_url}
                    techStack={project.tech_stack || []}
                    liveUrl={project.live_url}
                    githubUrl={project.github_url}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground text-lg mb-4">
                  No projects added yet
                </p>
                <Link
                  to="/admin"
                  className="text-primary hover:underline font-medium"
                >
                  Add your first project →
                </Link>
              </motion.div>
            )}

            {/* Mobile view all link */}
            <motion.div
              className="mt-8 text-center md:hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-primary font-medium"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Index;
