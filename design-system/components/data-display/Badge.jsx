import React from 'react';

const CSS = `
.ia-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-caption);
  line-height: 1;
  padding: 5px 11px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  white-space: nowrap;
}
.ia-badge svg, .ia-badge i { width: 13px; height: 13px; }
.ia-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

/* soft (default) */
.ia-badge--neutral  { background: var(--cream-200); color: var(--graphite-700); }
.ia-badge--brand    { background: var(--brand-soft); color: var(--green-800); }
.ia-badge--accent   { background: var(--accent-soft); color: var(--mustard-700); }
.ia-badge--success  { background: var(--success-soft); color: var(--green-700); }
.ia-badge--warning  { background: var(--warning-soft); color: var(--mustard-700); }
.ia-badge--danger   { background: var(--danger-soft); color: var(--wine-700); }
.ia-badge--info     { background: var(--info-soft); color: var(--sage-600); }

/* solid */
.ia-badge--solid.ia-badge--brand   { background: var(--brand); color: var(--text-on-brand); }
.ia-badge--solid.ia-badge--accent  { background: var(--accent); color: var(--text-on-accent); }
.ia-badge--solid.ia-badge--success { background: var(--success); color: #fff; }
.ia-badge--solid.ia-badge--danger  { background: var(--danger); color: #FBF1F2; }
.ia-badge--solid.ia-badge--neutral { background: var(--graphite-800); color: var(--cream-100); }

/* outline */
.ia-badge--outline { background: transparent; border-color: var(--border-default); color: var(--text-body); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-badge-css')) {
  const s = document.createElement('style'); s.id = 'ia-badge-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Badge({
  children,
  variant = 'neutral',
  tone = 'soft',
  dot = false,
  icon,
  className = '',
  ...rest
}) {
  const cls = [
    'ia-badge',
    `ia-badge--${variant}`,
    tone === 'solid' ? 'ia-badge--solid' : tone === 'outline' ? 'ia-badge--outline' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="ia-badge__dot" aria-hidden="true"></span> : null}
      {icon ? <span style={{display:'inline-flex'}}>{icon}</span> : null}
      {children}
    </span>
  );
}
