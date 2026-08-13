import { motion } from 'framer-motion';
import type { PortfolioProject } from './types';

interface ProjectLabelProps {
  project: PortfolioProject;
  textOn: 'light' | 'dark';
  placement: 'inside' | 'below';
}

export default function ProjectLabel({ project, textOn, placement }: ProjectLabelProps) {
  const effectiveTextOn = placement === 'below' ? 'dark' : textOn;
  const textColor = effectiveTextOn === 'light' ? 'text-white' : 'text-ink';
  const subColor = effectiveTextOn === 'light' ? 'text-white/70' : 'text-ink/60';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-hidden="true"
      className={
        placement === 'inside'
          ? 'pointer-events-none absolute inset-x-0 bottom-0 p-[8%]'
          : 'pointer-events-none absolute left-1/2 top-full mt-3 w-max max-w-[14rem] -translate-x-1/2 text-center'
      }
    >
      <p className={`font-serif text-[clamp(0.95rem,2vw,1.4rem)] leading-tight ${textColor}`}>
        {project.name}
      </p>
      <p className={`mt-1 flex items-center justify-center gap-1.5 font-sans text-[clamp(0.65rem,1vw,0.8rem)] uppercase tracking-wide ${subColor}`}>
        {project.type}
        <span aria-hidden="true">→</span>
      </p>
    </motion.div>
  );
}
