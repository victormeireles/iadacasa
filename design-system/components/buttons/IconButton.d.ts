import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon node (Lucide <i data-lucide> or <svg>). */
  icon: React.ReactNode;
  /** Accessible label (also shown as tooltip). Required. */
  label: string;
  /** ghost = transparent (default), soft = green tint, solid = green fill. */
  variant?: 'ghost' | 'soft' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

/** Square, rounded icon-only button. Always pass an accessible `label`. */
export function IconButton(props: IconButtonProps): JSX.Element;
