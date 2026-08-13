import { TextReveal } from '@/components/ui/text-reveal';

interface CategoryHeadingProps {
  name: string;
}

export default function CategoryHeading({ name }: CategoryHeadingProps) {
  return (
    <>
      <TextReveal
        text="Selected work"
        className="font-sans text-xs uppercase tracking-[0.25em] text-white/50"
        stagger={0.05}
      />
      <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">
        <TextReveal text={`${name} work`} delay={0.25} stagger={0.08} />
      </h1>
    </>
  );
}
