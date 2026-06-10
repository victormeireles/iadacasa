import React from 'react';

const CSS = `
.ia-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-sans); }
.ia-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.ia-check__box {
  flex: none; width: 22px; height: 22px; margin-top: 1px;
  border: var(--border-width-strong) solid var(--border-strong);
  border-radius: 7px; background: var(--surface-card);
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.ia-check__box svg { width: 14px; height: 14px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-spring); }
.ia-check:hover .ia-check__box { border-color: var(--brand); }
.ia-check input:checked + .ia-check__box { background: var(--brand); border-color: var(--brand); }
.ia-check input:checked + .ia-check__box svg { opacity: 1; transform: scale(1); }
.ia-check input:focus-visible + .ia-check__box { box-shadow: var(--ring-brand); }
.ia-check input:disabled + .ia-check__box { opacity: 0.45; }
.ia-check__label { font-size: var(--fs-body); color: var(--text-body); line-height: 1.45; }
.ia-check__label b { color: var(--text-strong); font-weight: var(--fw-semibold); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-check-css')) {
  const s = document.createElement('style'); s.id = 'ia-check-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Checkbox({ label, id, className = '', children, ...rest }) {
  const fieldId = id || `ia-check-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <label className={['ia-check', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <input type="checkbox" id={fieldId} {...rest} />
      <span className="ia-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      {(label || children) ? <span className="ia-check__label">{label || children}</span> : null}
    </label>
  );
}
