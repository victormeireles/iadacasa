import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

/** Multi-line text field. Used heavily in the questionário ("conte como funciona…"). */
export function Textarea(props: TextareaProps): JSX.Element;
