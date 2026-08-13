import type { LayoutRegion, ShapeStyle } from './types';

export const PHI = (1 + Math.sqrt(5)) / 2;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Recursively subdivides a golden rectangle (PHI x 1) into `count` regions
 * by repeatedly cutting the largest possible square off one edge, rotating
 * the cut direction each step (left, top, right, bottom, ...). Each region
 * after the first is ~1/PHI the area of the one before it, producing a
 * self-similar spiral of decreasing squares with one elongated remainder.
 */
function computeSpiralBoxes(count: number): Box[] {
  const directions = ['left', 'top', 'right', 'bottom'] as const;
  let box: Box = { x: 0, y: 0, w: PHI, h: 1 };
  const boxes: Box[] = [];

  for (let i = 0; i < count; i++) {
    if (i === count - 1) {
      boxes.push(box);
      break;
    }
    const dir = directions[i % 4];
    const side = Math.min(box.w, box.h);
    let square: Box;
    let remainder: Box;

    switch (dir) {
      case 'left':
        square = { x: box.x, y: box.y, w: side, h: side };
        remainder = { x: box.x + side, y: box.y, w: box.w - side, h: box.h };
        break;
      case 'top':
        square = { x: box.x, y: box.y, w: side, h: side };
        remainder = { x: box.x, y: box.y + side, w: box.w, h: box.h - side };
        break;
      case 'right':
        square = { x: box.x + box.w - side, y: box.y, w: side, h: side };
        remainder = { x: box.x, y: box.y, w: box.w - side, h: box.h };
        break;
      case 'bottom':
        square = { x: box.x, y: box.y + box.h - side, w: side, h: side };
        remainder = { x: box.x, y: box.y, w: box.w, h: box.h - side };
        break;
    }

    boxes.push(square);
    box = remainder;
  }

  return boxes;
}

export function computeSpiralRegions(count: number): LayoutRegion[] {
  return computeSpiralBoxes(count).map((box) => ({
    leftPct: (box.x / PHI) * 100,
    topPct: (box.y / 1) * 100,
    widthPct: (box.w / PHI) * 100,
    heightPct: (box.h / 1) * 100,
  }));
}

const PALETTE = [
  'var(--color-shape-electric)',
  'var(--color-shape-coral)',
  'var(--color-shape-yellow)',
  'var(--color-shape-green)',
  'var(--color-shape-cobalt)',
  'var(--color-shape-ink)',
  'var(--color-shape-gray)',
];

// Pastel palette sampled from the hero painting — all light enough to need dark (ink) label text.
const PALETTE_LUMINANCE = [0.78, 0.67, 0.84, 0.78, 0.75, 0.64, 0.86];

const KIND_SEQUENCE: ShapeStyle['kind'][] = [
  'rounded-rect',
  'circle',
  'rounded-rect',
  'circle',
  'pill',
  'circle',
  'rounded-rect',
];

const RADIUS_SEQUENCE = ['14%', '50%', '28%', '50%', '999px', '50%', '20%'];

export function getShapeStyles(count: number): ShapeStyle[] {
  return Array.from({ length: count }, (_, i) => ({
    kind: KIND_SEQUENCE[i % KIND_SEQUENCE.length],
    color: PALETTE[i % PALETTE.length],
    radius: RADIUS_SEQUENCE[i % RADIUS_SEQUENCE.length],
    textOn: PALETTE_LUMINANCE[i % PALETTE_LUMINANCE.length] > 0.6 ? 'dark' : 'light',
  }));
}
