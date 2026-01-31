import { motion } from 'framer-motion';

interface SkillIconProps {
  name: string;
  icon?: string;
  proficiency?: number;
  index: number;
}

const SkillIcon = ({ name, proficiency = 80, index }: SkillIconProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      {/* Skill name initial as icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <span className="text-xl font-display font-bold text-primary">
          {name.charAt(0)}
        </span>
      </div>
      
      <span className="text-sm font-medium text-center">{name}</span>
      
      {/* Proficiency bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillIcon;
