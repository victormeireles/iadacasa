import React from 'react';

const CSS = `
.ia-textarea {
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-width-strong) solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  width: 100%;
  min-height: 96px;
  resize: vertical;
  transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.ia-textarea::placeholder { color: var(--text-faint); }
.ia-textarea:hover { border-color: var(--border-strong); }
.ia-textarea:focus { outline: none; border-color: var(--brand); box-shadow: var(--ring-brand); }
.ia-textarea--invalid { border-color: var(--danger); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-textarea-css')) {
  const s = document.createElement('style'); s.id = 'ia-textarea-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function Textarea({
  label,
  hint,
  error,
  required = false,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `ia-textarea-${Math.random().toString(36).slice(2, 8)}`;
  const cls = ['ia-textarea', error ? 'ia-textarea--invalid' : '', className].filter(Boolean).join(' ');
  return (
    <div className="ia-field">
      {label ? (
        <label className="ia-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="ia-field__req">*</span> : null}
        </label>
      ) : null}
      <textarea id={fieldId} className={cls} aria-invalid={!!error} {...rest} />
      {error ? <span className="ia-field__error">{error}</span>
        : hint ? <span className="ia-field__hint">{hint}</span> : null}
    </div>
  );
}
