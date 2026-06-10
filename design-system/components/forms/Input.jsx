import React from 'react';

const CSS = `
.ia-field { display: flex; flex-direction: column; gap: 7px; font-family: var(--font-sans); }
.ia-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
.ia-field__hint { font-size: var(--fs-caption); color: var(--text-muted); }
.ia-field__error { font-size: var(--fs-caption); color: var(--danger); font-weight: var(--fw-medium); }
.ia-field__req { color: var(--terracotta-600); margin-left: 2px; }

.ia-input {
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-width-strong) solid var(--border-default);
  border-radius: var(--radius-md);
  height: var(--control-md);
  padding: 0 14px;
  width: 100%;
  transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.ia-input::placeholder { color: var(--text-faint); }
.ia-input:hover { border-color: var(--border-strong); }
.ia-input:focus { outline: none; border-color: var(--brand); box-shadow: var(--ring-brand); }
.ia-input:disabled { background: var(--surface-sunken); color: var(--text-muted); cursor: not-allowed; }
.ia-input--invalid { border-color: var(--danger); }
.ia-input--invalid:focus { box-shadow: var(--ring-danger); }

.ia-input-wrap { position: relative; display: flex; align-items: center; }
.ia-input-wrap .ia-input { padding-left: 42px; }
.ia-input-wrap__icon {
  position: absolute; left: 14px; display: inline-flex;
  color: var(--text-muted); pointer-events: none;
}
.ia-input-wrap__icon svg, .ia-input-wrap__icon i { width: 18px; height: 18px; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-input-css')) {
  const s = document.createElement('style'); s.id = 'ia-input-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Input({
  label,
  hint,
  error,
  required = false,
  leftIcon,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `ia-input-${Math.random().toString(36).slice(2, 8)}`;
  const inputCls = ['ia-input', error ? 'ia-input--invalid' : '', className].filter(Boolean).join(' ');
  const input = (
    <input id={fieldId} className={inputCls} aria-invalid={!!error} {...rest} />
  );
  return (
    <div className="ia-field">
      {label ? (
        <label className="ia-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="ia-field__req">*</span> : null}
        </label>
      ) : null}
      {leftIcon ? (
        <div className="ia-input-wrap">
          <span className="ia-input-wrap__icon">{leftIcon}</span>
          {input}
        </div>
      ) : input}
      {error ? <span className="ia-field__error">{error}</span>
        : hint ? <span className="ia-field__hint">{hint}</span> : null}
    </div>
  );
}
