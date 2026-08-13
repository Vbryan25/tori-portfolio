import { AnimatePresence, motion } from 'framer-motion';
import type { ComposedShape } from './types';
import ProjectLabel from './ProjectLabel';

interface ProjectShapeProps {
  shape: ComposedShape;
  isActive: boolean;
  isAnyActive: boolean;
  reducedMotion: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

export default function ProjectShape({
  shape,
  isActive,
  isAnyActive,
  reducedMotion,
  onActivate,
  onDeactivate,
}: ProjectShapeProps) {
  const { project, region, style, index } = shape;

  const borderRadius = style.kind === 'circle' ? '50%' : style.radius;
  const fitsLabelInside = style.kind !== 'circle' && region.heightPct >= 18;

  const dx = (index % 2 === 0 ? 1 : -1) * (8 + index * 2.5);
  const dy = (index % 3 === 0 ? -1 : 1) * (6 + index * 2);
  const duration = 20 + index * 2.5;
  const delay = index * 0.7;

  const ambientAnimate = reducedMotion
    ? { x: 0, y: 0, scale: 1, opacity: 1 }
    : { x: [0, dx, 0, -dx, 0], y: [0, dy, 0, -dy, 0], scale: [1, 1.015, 1, 0.99, 1], opacity: 1 };

  const ambientTransition = {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };

  const focusedAnimate = { x: 0, y: 0, scale: 1.055, opacity: 1 };
  const dimmedAnimate = { x: 0, y: 0, scale: 0.97, opacity: 0.5 };

  const animate = isActive ? focusedAnimate : isAnyActive ? dimmedAnimate : ambientAnimate;
  const transition = isAnyActive || reducedMotion ? { duration: 0.6, ease: 'easeOut' as const } : ambientTransition;

  return (
    <motion.a
      href={project.href}
      aria-label={`${project.name} — ${project.type}`}
      onMouseEnter={() => onActivate(project.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(project.id)}
      onBlur={onDeactivate}
      className="absolute block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      style={{
        left: `${region.leftPct}%`,
        top: `${region.topPct}%`,
        width: `${region.widthPct}%`,
        height: `${region.heightPct}%`,
        zIndex: isActive ? 30 : 10,
      }}
      animate={animate}
      transition={transition}
    >
      <div
        className="relative h-full w-full"
        style={{ backgroundColor: style.color, borderRadius }}
      >
        <AnimatePresence>
          {isActive && (
            <ProjectLabel
              project={project}
              textOn={style.textOn}
              placement={fitsLabelInside ? 'inside' : 'below'}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
}
