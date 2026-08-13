// Logos whose mark is solid black/near-black in the source SVG — invisible
// on the dark glass panel unless flipped to white. Naturally colorful marks
// (Figma, Adobe, Webflow, Loom, UserTesting, azure, claude, lovable) are left
// as-is so their real brand color still reads.
const MONOCHROME = new Set(['Framer', 'Vercel', 'Cursor', 'ElevenLabs', 'GitHub']);

const LOGOS = [
  { name: 'Figma', src: '/Figma.svg' },
  { name: 'Framer', src: '/Framer.svg' },
  { name: 'Vercel', src: '/Vercel.svg' },
  { name: 'Webflow', src: '/Webflow.svg' },
  { name: 'Adobe', src: '/Adobe.svg' },
  { name: 'Azure', src: '/azure.svg' },
  { name: 'Claude', src: '/claude.svg' },
  { name: 'Cursor', src: '/cursor.svg' },
  { name: 'GitHub', src: '/github.svg' },
  { name: 'Loom', src: '/Loom.svg' },
  { name: 'Lovable', src: '/lovable.svg' },
  { name: 'ElevenLabs', src: '/elevenlabsai.svg' },
  { name: 'UserTesting', src: '/UserTesting.svg' },
];

export default function LogoCarousel() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className="w-full overflow-hidden px-6 py-8 md:px-12 md:py-10"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-12 md:gap-14">
        {items.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            title={logo.name}
            draggable={false}
            className={`h-8 w-auto shrink-0 opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-10 ${
              MONOCHROME.has(logo.name) ? 'invert' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
