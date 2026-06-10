import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label shown above the input. */
  label?: string;
  /** Helper text shown below the input. */
  hint?: string;
  /** Error message — turns the field wine-red and overrides hint. */
  error?: string;
  /** Show a required asterisk after the label. */
  required?: boolean;
  /** Leading icon node (Lucide). Adds left padding. */
  leftIcon?: React.ReactNode;
}

/** Single-line text field with label, hint and error states. */
export function Input(props: InputProps): JSX.Element;
