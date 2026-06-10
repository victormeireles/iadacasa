import * as React from 'react';

/**
 * The primary surface container — warm paper, hairline border, soft shadow.
 * @startingPoint section="Core" subtitle="Surface container with elevation & states" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Inner padding scale. */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Resting shadow. */
  elevation?: 'none' | 'sm' | 'md';
  /** Adds hover-lift + pointer cursor (for clickable cards). */
  interactive?: boolean;
  /** Deep-green surface with light text (feature panels). */
  inverse?: boolean;
  /** Element tag to render. */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** The primary surface container — warm paper, hairline border, soft shadow. */
export function Card(props: CardProps): JSX.Element;
