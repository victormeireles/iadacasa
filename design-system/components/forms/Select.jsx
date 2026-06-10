import React from 'react';

const CSS = `
.ia-select-wrap { position: relative; display: flex; align-items: center; }
.ia-select {
  appearance: none;
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-width-strong) solid var(--border-default);
  border-radius: var(--radius-md);
  height: var(--control-md);
  padding: 0 42px 0 14px;
  width: 100%;
  cursor: pointer;
  transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.ia-select:hover { border-color: var(--border-strong); }
.ia-select:focus { outline: none; border-color: var(--brand); box-shadow: var(--ring-brand); }
.ia-select:disabled { background: var(--surface-sunken); color: var(--text-muted); cursor: not-allowed; }
.ia-select-wrap__chevron {
  position: absolute; right: 14px; pointer-events: none; color: var(--text-muted);
  display: inline-flex;
}
.ia-select-wrap__chevron svg { width: 18px; height: 18px; }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-select-css')) {
  const s = document.createElement('style'); s.id = 'ia-select-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Select({
  label,
  hint,
  error,
  required = false,
  options = [],
  placeholder,
  id,
  className = '',
  children,
  ...rest
}) {
  const fieldId = id || `ia-select-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="ia-field">
      {label ? (
        <label className="ia-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="ia-field__req">*</span> : null}
        </label>
      ) : null}
      <div className="ia-select-wrap">
        <select id={fieldId} className={['ia-select', className].filter(Boolean).join(' ')} {...rest}>
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((o) => {
            const value = typeof o === 'string' ? o : o.value;
            const text = typeof o === 'string' ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
          {children}
        </select>
        <span className="ia-select-wrap__chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
      {error ? <span className="ia-field__error">{error}</span>
        : hint ? <span className="ia-field__hint">{hint}</span> : null}
    </div>
  );
}
