import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';

interface TimelineItem {
  id: string;
  title: string;
  company?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  type: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <motion.div
        className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative pl-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div className="absolute left-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              {item.type === 'education' ? (
                <GraduationCap className="w-5 h-5 text-primary" />
              ) : (
                <Briefcase className="w-5 h-5 text-primary" />
              )}
            </div>

            {/* Content */}
            <div className="bg-card rounded-xl p-6 border border-border card-hover">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <h3 className="text-lg font-display font-bold">{item.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {item.startDate && format(new Date(item.startDate), 'MMM yyyy')}
                  {' — '}
                  {item.isCurrent ? 'Present' : item.endDate && format(new Date(item.endDate), 'MMM yyyy')}
                </span>
              </div>
              
              {(item.company || item.location) && (
                <p className="text-primary font-medium mb-2">
                  {item.company}
                  {item.company && item.location && ' • '}
                  {item.location}
                </p>
              )}
              
              {item.description && (
                <p className="text-muted-foreground text-sm">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
