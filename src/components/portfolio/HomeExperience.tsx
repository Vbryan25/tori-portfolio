import { useEffect, useRef, useState } from 'react';
import Hero from './Hero';
import WorkListSection from './WorkListSection';
import NavOverlay from './NavOverlay';

interface CategoryRow {
  slug: string;
  name: string;
  tags: string[];
}

interface HomeExperienceProps {
  categories: CategoryRow[];
  heroImage: string;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mapRange(value: number, inMin: number, inMax: number) {
  return clamp01((value - inMin) / (inMax - inMin));
}

export default function HomeExperience({ categories, heroImage }: HomeExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolledIntoContainer = -el.getBoundingClientRect().top;
      setProgress(clamp01(scrolledIntoContainer / scrollable));
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  // Hero fades/slides away in the first half of the scroll range; the work
  // section slides/fades in on top of it over the second half, so it reads
  // as one section replacing the other rather than two separate sections.
  const heroOpacity = 1 - mapRange(progress, 0, 0.55);
  const heroTranslate = -mapRange(progress, 0, 0.6) * 40;
  const workProgress = mapRange(progress, 0.3, 0.9);
  const workOpacity = workProgress;
  const workTranslate = (1 - workProgress) * 48;

  return (
    <div ref={containerRef} className="relative" style={{ height: '170vh' }}>
      <div className="fixed inset-0 -z-10 bg-[#0c0d10]">
        <img src={heroImage} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <NavOverlay />

      <div
        aria-hidden={workProgress > 0.5}
        style={{ opacity: heroOpacity, transform: `translateY(${heroTranslate}px)` }}
        className="sticky top-0 z-10 h-screen w-full"
      >
        <Hero />
      </div>

      <div
        style={{
          opacity: workOpacity,
          transform: `translateY(${workTranslate}px)`,
          marginTop: '-100vh',
        }}
        className="sticky top-0 z-20 h-screen w-full py-10"
      >
        <WorkListSection categories={categories} />
      </div>
    </div>
  );
}
