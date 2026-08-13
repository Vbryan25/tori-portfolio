import type { PortfolioProject } from './types';
import ProjectComposition from './ProjectComposition';
import MobileComposition from './MobileComposition';

interface PortfolioHomeProps {
  projects: PortfolioProject[];
}

export default function PortfolioHome({ projects }: PortfolioHomeProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-center px-6 py-10 md:px-12">
      <ProjectComposition projects={projects} />
      <MobileComposition projects={projects} />
    </div>
  );
}
