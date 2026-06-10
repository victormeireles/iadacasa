import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text (or pass children). */
  label?: React.ReactNode;
}

/** Checkbox with a green fill + check on select. Use for multi-select lists. */
export function Checkbox(props: CheckboxProps): JSX.Element;
