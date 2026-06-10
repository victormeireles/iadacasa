import * as React from 'react';

export interface Step {
  title: string;
  description?: string;
  /** Visual state. */
  status?: 'done' | 'current' | 'upcoming';
}

/**
 * Vertical numbered step tracker — the guided "passo a passo" of the platform.
 * Green = done, mustard = current, neutral = upcoming.
 * @startingPoint section="Feedback" subtitle="Guided step-by-step tracker" viewport="700x320"
 */
export interface StepListProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
}

/** Vertical numbered step tracker — the guided "passo a passo" of the platform. */
export function StepList(props: StepListProps): JSX.Element;
