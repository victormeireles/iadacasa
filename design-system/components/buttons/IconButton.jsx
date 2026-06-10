import React from 'react';

const CSS = `
.ia-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md);
  border: var(--border-width-strong) solid transparent;
  background: transparent;
  color: var(--text-body);
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-out),
              color var(--dur-base) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.ia-iconbtn:hover { background: var(--surface-sunken); color: var(--text-strong); }
.ia-iconbtn:active { transform: scale(0.92); }
.ia-iconbtn:focus-visible { outline: none; box-shadow: var(--ring-brand); }
.ia-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; }
.ia-iconbtn--sm { width: 36px; height: 36px; }
.ia-iconbtn--md { width: 44px; height: 44px; }
.ia-iconbtn--lg { width: 54px; height: 54px; }
.ia-iconbtn--solid { background: var(--brand); color: var(--text-on-brand); }
.ia-iconbtn--solid:hover { background: var(--brand-hover); color: var(--text-on-brand); }
.ia-iconbtn--soft { background: var(--brand-soft); color: var(--brand); }
.ia-iconbtn--soft:hover { background: var(--green-200); }
.ia-iconbtn > svg, .ia-iconbtn > i { width: 1.25em; height: 1.25em; font-size: 20px; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-iconbtn-css')) {
  const s = document.createElement('style'); s.id = 'ia-iconbtn-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = [
    'ia-iconbtn',
    `ia-iconbtn--${variant}`,
    `ia-iconbtn--${size}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      {icon}
    </button>
  );
}
