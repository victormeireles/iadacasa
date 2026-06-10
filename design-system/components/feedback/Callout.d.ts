import * as React from 'react';

/**
 * Inline notice box. The `ai` variant is the platform's co-pilot voice — use it
 * for AI suggestions, generated tips and reassurance.
 * @startingPoint section="Feedback" subtitle="Co-pilot & status callouts" viewport="700x150"
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ai = the IA da Casa co-pilot voice (default). */
  variant?: 'ai' | 'info' | 'warning' | 'danger' | 'success';
  /** Bold title line. */
  title?: string;
  /** Override the default icon (pass a node, or null to hide). */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** Inline notice box. The `ai` variant is the platform's co-pilot voice. */
export function Callout(props: CalloutProps): JSX.Element;
