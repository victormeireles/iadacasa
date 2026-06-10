import React from 'react';

const CSS = `
.ia-card {
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--text-body);
  font-family: var(--font-sans);
  display: block;
}
.ia-card--pad-sm { padding: 16px; }
.ia-card--pad-md { padding: 24px; }
.ia-card--pad-lg { padding: 32px; }
.ia-card--pad-none { padding: 0; }
.ia-card--elevated { box-shadow: var(--shadow-md); }
.ia-card--flat { box-shadow: none; }
.ia-card--interactive {
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.ia-card--interactive:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--border-default); }
.ia-card--interactive:active { transform: translateY(-1px); }
.ia-card--inverse { background: var(--surface-inverse); border-color: transparent; color: var(--green-100); }
.ia-card--inverse h1, .ia-card--inverse h2, .ia-card--inverse h3, .ia-card--inverse h4 { color: #F4FBF5; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-card-css')) {
  const s = document.createElement('style'); s.id = 'ia-card-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Card({
  children,
  padding = 'md',
  elevation = 'sm',
  interactive = false,
  inverse = false,
  as = 'div',
  className = '',
  ...rest
}) {
  const Tag = as;
  const cls = [
    'ia-card',
    `ia-card--pad-${padding}`,
    elevation === 'md' ? 'ia-card--elevated' : elevation === 'none' ? 'ia-card--flat' : '',
    interactive ? 'ia-card--interactive' : '',
    inverse ? 'ia-card--inverse' : '',
    className,
  ].filter(Boolean).join(' ');
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
