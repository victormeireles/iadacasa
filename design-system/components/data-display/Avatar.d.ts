import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — initials are derived when no image. */
  name?: string;
  /** Image URL; falls back to initials. */
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Tint when showing initials. */
  color?: 'brand' | 'accent' | 'wine' | 'terracotta';
}

/** Circular user/restaurant avatar — image or derived initials. */
export function Avatar(props: AvatarProps): JSX.Element;
