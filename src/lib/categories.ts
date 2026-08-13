export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Matches the accent used throughout the Figma work-section spec.
const ACCENT = '#7f285c';

export function categoryAccent(_category: string): string {
  return ACCENT;
}

// Only "Product Design" uses the tabbed module layout in the Figma spec;
// other categories use the simpler timeline-entry layout.
const TABBED_CATEGORIES = new Set(['product-design']);

export function isTabbedCategory(category: string): boolean {
  return TABBED_CATEGORIES.has(categorySlug(category));
}

export function categoryTags(stacks: (string | undefined)[], max = 3): string[] {
  const tags: string[] = [];
  const seen = new Set<string>();
  for (const stack of stacks) {
    if (!stack) continue;
    for (const part of stack.split(',')) {
      const tag = part.trim();
      if (!tag || seen.has(tag.toLowerCase())) continue;
      seen.add(tag.toLowerCase());
      tags.push(tag);
      if (tags.length >= max) return tags;
    }
  }
  return tags;
}
