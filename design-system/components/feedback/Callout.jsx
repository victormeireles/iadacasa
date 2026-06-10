import React from 'react';

const CSS = `
.ia-callout {
  display: flex; gap: 14px;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--surface-card);
  font-family: var(--font-sans);
}
.ia-callout__icon {
  flex: none; width: 38px; height: 38px; border-radius: var(--radius-sm);
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--brand-soft); color: var(--brand);
}
.ia-callout__icon svg, .ia-callout__icon i { width: 20px; height: 20px; }
.ia-callout__body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.ia-callout__title { font-weight: var(--fw-bold); color: var(--text-strong); font-size: var(--fs-body); }
.ia-callout__text { font-size: var(--fs-body-sm); color: var(--text-body); line-height: var(--lh-body); }

.ia-callout--ai { background: var(--green-50); border-color: var(--green-200); }
.ia-callout--ai .ia-callout__icon { background: var(--brand); color: #fff; }
.ia-callout--info { background: var(--info-soft); border-color: var(--sage-300); }
.ia-callout--info .ia-callout__icon { background: var(--sage-500); color: #fff; }
.ia-callout--warning { background: var(--warning-soft); border-color: var(--mustard-300); }
.ia-callout--warning .ia-callout__icon { background: var(--mustard-500); color: var(--graphite-900); }
.ia-callout--danger { background: var(--danger-soft); border-color: var(--wine-200); }
.ia-callout--danger .ia-callout__icon { background: var(--danger); color: #fff; }
.ia-callout--success { background: var(--success-soft); border-color: var(--green-200); }
.ia-callout--success .ia-callout__icon { background: var(--success); color: #fff; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-callout-css')) {
  const s = document.createElement('style'); s.id = 'ia-callout-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

const DEFAULT_ICONS = {
  ai: 'sparkles', info: 'info', warning: 'triangle-alert', danger: 'octagon-alert', success: 'circle-check',
};

export function Callout({ children, variant = 'ai', title, icon, className = '', ...rest }) {
  const cls = ['ia-callout', `ia-callout--${variant}`, className].filter(Boolean).join(' ');
  const iconNode = icon !== undefined ? icon : <i data-lucide={DEFAULT_ICONS[variant] || 'info'}></i>;
  return (
    <div className={cls} {...rest}>
      <span className="ia-callout__icon" aria-hidden="true">{iconNode}</span>
      <div className="ia-callout__body">
        {title ? <span className="ia-callout__title">{title}</span> : null}
        <span className="ia-callout__text">{children}</span>
      </div>
    </div>
  );
}
