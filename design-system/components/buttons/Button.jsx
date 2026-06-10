import React from 'react';

/* Inject component CSS once (real hover/active/focus states). */
const CSS = `
.ia-btn {
  --_bg: var(--brand);
  --_fg: var(--text-on-brand);
  --_bd: transparent;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  line-height: 1;
  border: var(--border-width-strong) solid var(--_bd);
  background: var(--_bg);
  color: var(--_fg);
  border-radius: var(--radius-pill);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: transform var(--dur-fast) var(--ease-out),
              background var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}
.ia-btn:hover { filter: brightness(0.96); }
.ia-btn:active { transform: translateY(1px) scale(0.985); }
.ia-btn:focus-visible { outline: none; box-shadow: var(--ring-brand); }
.ia-btn[aria-disabled="true"], .ia-btn:disabled {
  opacity: 0.45; cursor: not-allowed; pointer-events: none; transform: none;
}

/* sizes */
.ia-btn--sm { height: var(--control-sm); padding: 0 16px; font-size: var(--fs-body-sm); }
.ia-btn--md { height: var(--control-md); padding: 0 22px; font-size: var(--fs-body); }
.ia-btn--lg { height: var(--control-lg); padding: 0 30px; font-size: var(--fs-body-lg); }
.ia-btn--full { width: 100%; }

/* variants */
.ia-btn--primary   { --_bg: var(--brand); --_fg: var(--text-on-brand); box-shadow: var(--shadow-sm); }
.ia-btn--primary:hover { background: var(--brand-hover); filter: none; }
.ia-btn--accent    { --_bg: var(--accent); --_fg: var(--text-on-accent); box-shadow: var(--shadow-sm); }
.ia-btn--accent:hover { background: var(--mustard-400); filter: none; }
.ia-btn--secondary { --_bg: var(--surface-card); --_fg: var(--text-strong); --_bd: var(--border-default); }
.ia-btn--secondary:hover { background: var(--surface-sunken); filter: none; border-color: var(--border-strong); }
.ia-btn--ghost     { --_bg: transparent; --_fg: var(--brand); }
.ia-btn--ghost:hover { background: var(--brand-soft); filter: none; }
.ia-btn--danger    { --_bg: var(--danger); --_fg: #FBF1F2; box-shadow: var(--shadow-sm); }
.ia-btn--danger:focus-visible { box-shadow: var(--ring-danger); }
.ia-btn__icon { display: inline-flex; width: 1.15em; height: 1.15em; }
.ia-btn__icon > svg { width: 100%; height: 100%; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-btn-css')) {
  const s = document.createElement('style'); s.id = 'ia-btn-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  href,
  className = '',
  ...rest
}) {
  const cls = [
    'ia-btn',
    `ia-btn--${variant}`,
    `ia-btn--${size}`,
    fullWidth ? 'ia-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {leftIcon ? <span className="ia-btn__icon">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="ia-btn__icon">{rightIcon}</span> : null}
    </>
  );

  if (href && !disabled) {
    return <a className={cls} href={href} {...rest}>{content}</a>;
  }
  return (
    <button className={cls} disabled={disabled} aria-disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
