import * as React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/** On/off toggle (green when on). Use for settings & "incluir no sistema" toggles. */
export function Switch(props: SwitchProps): JSX.Element;
