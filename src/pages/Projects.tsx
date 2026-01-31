import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '@/components/ProjectCard';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              My <span className="text-gradient">Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects I've built, from web applications to experiments
            </p>
          </motion.div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>

        <div className="container mx-auto mt-24">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default Projects;
