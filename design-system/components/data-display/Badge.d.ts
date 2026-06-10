import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. */
  variant?: 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  /** Fill style. */
  tone?: 'soft' | 'solid' | 'outline';
  /** Leading status dot. */
  dot?: boolean;
  /** Leading icon node. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** Small pill label for status, counts, and tags. */
export function Badge(props: BadgeProps): JSX.Element;
