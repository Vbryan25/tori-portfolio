export interface PortfolioProject {
  id: string;
  name: string;
  type: string;
  href: string;
}

export type ShapeKind = 'rounded-rect' | 'circle' | 'pill';

export interface ShapeStyle {
  kind: ShapeKind;
  color: string;
  radius: string;
  textOn: 'light' | 'dark';
}

export interface LayoutRegion {
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}

export interface ComposedShape {
  project: PortfolioProject;
  region: LayoutRegion;
  style: ShapeStyle;
  index: number;
}
