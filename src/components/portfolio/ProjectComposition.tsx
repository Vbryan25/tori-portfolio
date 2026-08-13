import { useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { PortfolioProject, ComposedShape } from './types';
import { computeSpiralRegions, getShapeStyles } from './goldenLayout';
import ProjectShape from './ProjectShape';

interface ProjectCompositionProps {
  projects: PortfolioProject[];
}

export default function ProjectComposition({ projects }: ProjectCompositionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const shapes: ComposedShape[] = useMemo(() => {
    const regions = computeSpiralRegions(projects.length);
    const styles = getShapeStyles(projects.length);
    return projects.map((project, index) => ({
      project,
      region: regions[index],
      style: styles[index],
      index,
    }));
  }, [projects]);

  return (
    <div
      className="relative mx-auto hidden md:block"
      style={{ aspectRatio: '1.618 / 1', width: 'min(100%, calc(78vh * 1.618))' }}
    >
      {shapes.map((shape) => (
        <ProjectShape
          key={shape.project.id}
          shape={shape}
          isActive={activeId === shape.project.id}
          isAnyActive={activeId !== null}
          reducedMotion={!!reducedMotion}
          onActivate={setActiveId}
          onDeactivate={() => setActiveId(null)}
        />
      ))}
    </div>
  );
}
