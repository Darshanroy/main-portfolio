import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';

interface Profile {
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  resume_url?: string;
  location?: string;
}

const Contact = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('portfolio_profile')
        .select('email, github_url, linkedin_url, twitter_url, resume_url, location')
        .limit(1)
        .maybeSingle();

      if (data) setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's talk about how we can work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Let's Connect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, creative ideas, 
                  or ways to be part of your vision. Feel free to reach out!
                </p>
              </div>

              {/* Location with animated pin */}
              {profile?.location && (
                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MapPin className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{profile.location}</p>
                  </div>
                </motion.div>
              )}

              {/* Email */}
              {profile?.email && (
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                </motion.a>
              )}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-medium mb-4">Find me on</p>
                <SocialLinks
                  githubUrl={profile?.github_url}
                  linkedinUrl={profile?.linkedin_url}
                  twitterUrl={profile?.twitter_url}
                  resumeUrl={profile?.resume_url}
                />
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl mt-24">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default Contact;
