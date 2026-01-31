import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Timeline from '@/components/Timeline';
import SkillIcon from '@/components/SkillIcon';
import SocialLinks from '@/components/SocialLinks';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';

interface Profile {
  name: string;
  bio: string;
  photo_url?: string;
  location?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  resume_url?: string;
}

interface Experience {
  id: string;
  title: string;
  company?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current: boolean;
  description?: string | null;
  type: string;
}

interface Skill {
  id: string;
  name: string;
  icon?: string;
  proficiency: number;
}

const About = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, skillsRes] = await Promise.all([
          supabase.from('portfolio_profile').select('*').limit(1).maybeSingle(),
          supabase.from('experiences').select('*').order('start_date', { ascending: false }),
          supabase.from('skills').select('*').order('display_order', { ascending: true }),
        ]);

        if (profileRes.data) setProfile(profileRes.data);
        if (expRes.data) setExperiences(expRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayProfile = profile || {
    name: 'Darshan Kumar',
    bio: 'Passionate full-stack developer crafting beautiful, performant web experiences. I love turning complex problems into elegant solutions.',
    location: 'Mysuru, India',
  };

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
              About <span className="text-gradient">Me</span>
            </h1>
          </motion.div>

          {/* Main Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Sidebar - Sticky on desktop */}
            <div className="lg:col-span-4">
              <motion.div
                className="lg:sticky lg:top-28 space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Photo */}
                <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64">
                  {profile?.photo_url ? (
                    <motion.img
                      src={profile.photo_url}
                      alt={displayProfile.name}
                      className="w-full h-full object-cover rounded-2xl glow-subtle"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <motion.div
                      className="w-full h-full rounded-2xl bg-gradient-primary flex items-center justify-center glow-subtle"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-6xl font-display font-bold text-primary-foreground">
                        {displayProfile.name.charAt(0)}
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Floating code icon */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code2 className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>

                {/* Name & Location */}
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-display font-bold mb-2">
                    {displayProfile.name}
                  </h2>
                  {displayProfile.location && (
                    <p className="text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {displayProfile.location}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed text-center lg:text-left">
                  {displayProfile.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start">
                  <SocialLinks
                    email={profile?.email}
                    githubUrl={profile?.github_url}
                    linkedinUrl={profile?.linkedin_url}
                    twitterUrl={profile?.twitter_url}
                    resumeUrl={profile?.resume_url}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Content - Scrollable */}
            <div className="lg:col-span-8 space-y-16">
              {/* Skills Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-display font-bold mb-8">
                  Skills & Technologies
                </h3>
                {skills.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <SkillIcon
                        key={skill.id}
                        name={skill.name}
                        icon={skill.icon}
                        proficiency={skill.proficiency}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Skills will appear here once added in the admin panel.
                  </p>
                )}
              </motion.section>

              {/* Experience Timeline */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-display font-bold mb-8">
                  Experience & Education
                </h3>
                {experiences.length > 0 ? (
                  <Timeline
                    items={experiences.map(exp => ({
                      id: exp.id,
                      title: exp.title,
                      company: exp.company,
                      location: exp.location,
                      startDate: exp.start_date,
                      endDate: exp.end_date,
                      isCurrent: exp.is_current,
                      description: exp.description,
                      type: exp.type,
                    }))}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    Timeline entries will appear here once added in the admin panel.
                  </p>
                )}
              </motion.section>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-24">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default About;
