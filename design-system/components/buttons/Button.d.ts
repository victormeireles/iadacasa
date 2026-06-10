import * as React from 'react';

/**
 * Primary action control for IA da Casa. Pill-shaped, warm, confident.
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary = green fill (default CTA). Accent = mustard. Secondary = bordered. Ghost = text-only. Danger = wine. */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  /** Control height / padding scale. */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node rendered before the label (e.g. a Lucide <i data-lucide> or <svg>). */
  leftIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  rightIcon?: React.ReactNode;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Render as an anchor instead of a button. */
  href?: string;
  children?: React.ReactNode;
}

/** Primary action control for IA da Casa. Pill-shaped, warm, confident. */
export function Button(props: ButtonProps): JSX.Element;
