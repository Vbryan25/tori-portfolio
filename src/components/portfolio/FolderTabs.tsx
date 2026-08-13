import { useState } from 'react';
import { motion } from 'framer-motion';
import { GooeyFilter } from '@/components/ui/gooey-filter';
import { useScreenSize } from '@/hooks/use-screen-size';

interface Fact {
  label: string;
  value: string;
}

interface FolderTabsProps {
  problem?: string;
  approach?: string;
  facts: Fact[];
  outcome?: string;
  excerpt: string;
  accent: string;
  slug: string;
  id: string;
}

const TABS = [
  { key: 'problem', label: '01 Problem' },
  { key: 'approach', label: '02 Approach' },
  { key: 'process', label: '03 Process' },
  { key: 'outcome', label: '04 Outcome' },
];

// The gooey filter's feColorMatrix needs a near-opaque input to produce a
// visible blob (low-alpha colors get crushed to fully transparent by the
// matrix), so we mix the accent with white into a solid pastel tint instead
// of using a translucent fill.
function pastelTint(hex: string, amount = 0.88) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const mix = (channel: number) => Math.round(channel * (1 - amount) + 255 * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export default function FolderTabs({
  problem,
  approach,
  facts,
  outcome,
  excerpt,
  accent,
  slug,
  id,
}: FolderTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const screenSize = useScreenSize();
  const filterId = `gooey-tabs-${id}`;
  const highlight = pastelTint(accent);

  return (
    <div className="relative">
      <GooeyFilter id={filterId} strength={screenSize.lessThan('md') ? 8 : 12} />

      {/* Filtered layer: sliding highlight + panel background, gooey-merged */}
      <div className="absolute inset-0" style={{ filter: `url(#${filterId})` }}>
        <div className="flex w-full">
          {TABS.map((tab, index) => (
            <div key={tab.key} className="relative h-10 flex-1">
              {activeTab === index && (
                <motion.div
                  layoutId={`folder-tab-highlight-${id}`}
                  className="absolute inset-0 rounded-t"
                  style={{ backgroundColor: highlight }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>
        <div
          className="h-full w-full rounded rounded-tl-none"
          style={{ backgroundColor: highlight }}
        />
      </div>

      {/* Unfiltered layer: interactive tab buttons + real content */}
      <div className="relative">
        <div className="flex w-full">
          {TABS.map((tab, index) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(index)}
              className="h-10 flex-1 font-sans text-sm transition-colors"
              style={{ color: activeTab === index ? accent : undefined }}
            >
              <span className={activeTab === index ? '' : 'text-white/60'}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[7rem] w-full p-5">
          {activeTab === 0 && <p className="text-ink-secondary">{problem ?? excerpt}</p>}
          {activeTab === 1 && <p className="text-ink-secondary">{approach ?? excerpt}</p>}
          {activeTab === 2 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-wide text-ink-tertiary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === 3 && (
            <div className="flex flex-col gap-3">
              <p className="text-ink-secondary">{outcome ?? excerpt}</p>
              <a
                href={`/work/${slug}`}
                className="inline-flex items-center gap-1.5 self-start text-sm transition-colors hover:opacity-70"
                style={{ color: accent }}
              >
                Read full case study
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
