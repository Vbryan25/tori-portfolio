import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PortfolioProject } from './types';
import { getShapeStyles } from './goldenLayout';
import ProjectLabel from './ProjectLabel';

interface MobileCompositionProps {
  projects: PortfolioProject[];
}

const RELATIVE_SIZE = [1, 0.618, 0.382, 0.236, 0.146, 0.09, 0.06];
const BASE_PX = 220;
const MIN_PX = 76;

export default function MobileComposition({ projects }: MobileCompositionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const styles = getShapeStyles(projects.length);

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-10 py-4 md:hidden">
      {projects.map((project, index) => {
        const style = styles[index];
        const size = Math.max(MIN_PX, RELATIVE_SIZE[index % RELATIVE_SIZE.length] * BASE_PX);
        const isActive = activeId === project.id;
        const align = index % 2 === 0 ? 'self-start' : 'self-end';
        const borderRadius = style.kind === 'circle' ? '50%' : style.kind === 'pill' ? '999px' : style.radius;

        const ambientAnimate = reducedMotion
          ? { scale: 1 }
          : { scale: [1, 1.02, 1] };

        return (
          <div key={project.id} className={`relative ${align}`} style={{ width: size, height: size }}>
            <motion.a
              href={project.href}
              aria-label={`${project.name} — ${project.type}`}
              className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              style={{ backgroundColor: style.color, borderRadius }}
              animate={isActive ? { scale: 1.04 } : ambientAnimate}
              transition={
                isActive
                  ? { duration: 0.4, ease: 'easeOut' }
                  : { duration: 9 + index * 1.5, repeat: Infinity, ease: 'easeInOut' }
              }
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  setActiveId(project.id);
                }
              }}
            />
            <AnimatePresence>
              {isActive && <ProjectLabel project={project} textOn={style.textOn} placement="below" />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
