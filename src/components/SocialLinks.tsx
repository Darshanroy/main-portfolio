import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';

interface SocialLinksProps {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  resumeUrl?: string;
}

const SocialLinks = ({ email, githubUrl, linkedinUrl, twitterUrl, resumeUrl }: SocialLinksProps) => {
  const links = [
    { icon: Github, href: githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: twitterUrl, label: 'Twitter' },
    { icon: Mail, href: email ? `mailto:${email}` : undefined, label: 'Email' },
  ].filter(link => link.href);

  return (
    <div className="flex items-center gap-4">
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.label !== 'Email' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.label}
        >
          <link.icon className="w-5 h-5" />
        </motion.a>
      ))}

      {resumeUrl && (
        <motion.a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-4 h-4" />
          Resume
        </motion.a>
      )}
    </div>
  );
};

export default SocialLinks;
