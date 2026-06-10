import * as React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Options as strings or {value,label}. You may also pass <option> children. */
  options?: (string | SelectOption)[];
  /** Disabled first option shown when nothing is selected. */
  placeholder?: string;
}

/** Native select styled to match IA da Casa, with a custom chevron. */
export function Select(props: SelectProps): JSX.Element;
