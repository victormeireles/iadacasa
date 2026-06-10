import React from 'react';

const CSS = `
.ia-switch { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-family: var(--font-sans); }
.ia-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.ia-switch__track {
  flex: none; width: 46px; height: 27px; border-radius: var(--radius-pill);
  background: var(--cream-400); position: relative;
  transition: background var(--dur-base) var(--ease-out);
}
.ia-switch__thumb {
  position: absolute; top: 3px; left: 3px; width: 21px; height: 21px;
  border-radius: 50%; background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.ia-switch input:checked + .ia-switch__track { background: var(--brand); }
.ia-switch input:checked + .ia-switch__track .ia-switch__thumb { transform: translateX(19px); }
.ia-switch input:focus-visible + .ia-switch__track { box-shadow: var(--ring-brand); }
.ia-switch input:disabled + .ia-switch__track { opacity: 0.45; }
.ia-switch__label { font-size: var(--fs-body); color: var(--text-body); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-switch-css')) {
  const s = document.createElement('style'); s.id = 'ia-switch-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Switch({ label, id, className = '', ...rest }) {
  const fieldId = id || `ia-switch-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <label className={['ia-switch', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <input type="checkbox" role="switch" id={fieldId} {...rest} />
      <span className="ia-switch__track" aria-hidden="true">
        <span className="ia-switch__thumb"></span>
      </span>
      {label ? <span className="ia-switch__label">{label}</span> : null}
    </label>
  );
}
