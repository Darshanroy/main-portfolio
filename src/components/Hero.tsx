import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface HeroProps {
  name: string;
  tagline: string;
  photoUrl?: string;
}

const Hero = ({ name, tagline, photoUrl }: HeroProps) => {
  const firstName = name.split(' ')[0];
  const letters = firstName.split('');

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated background orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            {/* Name with staggered letter animation */}
            <h1 className="mb-6">
              <span className="sr-only">{name}</span>
              <span className="block overflow-hidden">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-6xl md:text-8xl lg:text-9xl font-display font-bold text-gradient"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {tagline}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <MagneticButton onClick={scrollToProjects}>
                View Work
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Photo */}
          {photoUrl && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
                
                {/* Image container */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 glow-subtle"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
