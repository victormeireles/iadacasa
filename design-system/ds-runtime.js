/* IA da Casa — browser runtime (auto-generated from component sources).
   Provides window.IADaCasaDesignSystem_449ba5 for @dsCard cards & UI kits.
   Load via <script type="text/babel" src=".../ds-runtime.js"></script> AFTER React UMD.
   Regenerate when components change. */

/* ===== components/buttons/Button.jsx ===== */

/* Inject component CSS once (real hover/active/focus states). */
const CSS_1 = `
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
  const s = document.createElement('style'); s.id = 'ia-btn-css'; s.textContent = CSS_1;
  document.head.appendChild(s);
}

function Button({
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


/* ===== components/buttons/IconButton.jsx ===== */

const CSS_2 = `
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
  const s = document.createElement('style'); s.id = 'ia-iconbtn-css'; s.textContent = CSS_2;
  document.head.appendChild(s);
}

function IconButton({
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


/* ===== components/forms/Input.jsx ===== */

const CSS_3 = `
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
  const s = document.createElement('style'); s.id = 'ia-input-css'; s.textContent = CSS_3;
  document.head.appendChild(s);
}

function Input({
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


/* ===== components/forms/Textarea.jsx ===== */

const CSS_4 = `
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
  const s = document.createElement('style'); s.id = 'ia-textarea-css'; s.textContent = CSS_4;
  document.head.appendChild(s);
}

function Textarea({
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


/* ===== components/forms/Select.jsx ===== */

const CSS_5 = `
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
  const s = document.createElement('style'); s.id = 'ia-select-css'; s.textContent = CSS_5;
  document.head.appendChild(s);
}

function Select({
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


/* ===== components/forms/Checkbox.jsx ===== */

const CSS_6 = `
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
  const s = document.createElement('style'); s.id = 'ia-check-css'; s.textContent = CSS_6;
  document.head.appendChild(s);
}

function Checkbox({ label, id, className = '', children, ...rest }) {
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


/* ===== components/forms/Switch.jsx ===== */

const CSS_7 = `
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
  const s = document.createElement('style'); s.id = 'ia-switch-css'; s.textContent = CSS_7;
  document.head.appendChild(s);
}

function Switch({ label, id, className = '', ...rest }) {
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


/* ===== components/data-display/Card.jsx ===== */

const CSS_8 = `
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
  const s = document.createElement('style'); s.id = 'ia-card-css'; s.textContent = CSS_8;
  document.head.appendChild(s);
}

function Card({
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


/* ===== components/data-display/Badge.jsx ===== */

const CSS_9 = `
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
  const s = document.createElement('style'); s.id = 'ia-badge-css'; s.textContent = CSS_9;
  document.head.appendChild(s);
}

function Badge({
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


/* ===== components/data-display/Avatar.jsx ===== */

const CSS_10 = `
.ia-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; overflow: hidden;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  color: var(--green-800); background: var(--brand-soft);
  border: 2px solid var(--surface-card);
  flex: none; user-select: none;
}
.ia-avatar img { width: 100%; height: 100%; object-fit: cover; }
.ia-avatar--sm { width: 32px; height: 32px; font-size: 13px; }
.ia-avatar--md { width: 42px; height: 42px; font-size: 16px; }
.ia-avatar--lg { width: 56px; height: 56px; font-size: 20px; }
.ia-avatar--accent { background: var(--accent-soft); color: var(--mustard-700); }
.ia-avatar--wine { background: var(--wine-100); color: var(--wine-700); }
.ia-avatar--terracotta { background: var(--terracotta-100); color: var(--terracotta-700); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-avatar-css')) {
  const s = document.createElement('style'); s.id = 'ia-avatar-css'; s.textContent = CSS_10;
  document.head.appendChild(s);
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
}

function Avatar({ name = '', src, size = 'md', color = 'brand', className = '', ...rest }) {
  const cls = ['ia-avatar', `ia-avatar--${size}`, color !== 'brand' ? `ia-avatar--${color}` : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}


/* ===== components/feedback/Callout.jsx ===== */

const CSS_11 = `
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
  const s = document.createElement('style'); s.id = 'ia-callout-css'; s.textContent = CSS_11;
  document.head.appendChild(s);
}

const DEFAULT_ICONS = {
  ai: 'sparkles', info: 'info', warning: 'triangle-alert', danger: 'octagon-alert', success: 'circle-check',
};

function Callout({ children, variant = 'ai', title, icon, className = '', ...rest }) {
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


/* ===== components/feedback/StepList.jsx ===== */

const CSS_12 = `
.ia-steplist { display: flex; flex-direction: column; font-family: var(--font-sans); }
.ia-step { display: flex; gap: 14px; }
.ia-step__rail { display: flex; flex-direction: column; align-items: center; }
.ia-step__marker {
  flex: none; width: 30px; height: 30px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: var(--fs-body-sm); font-weight: var(--fw-bold);
  background: var(--surface-card); color: var(--text-muted);
  border: var(--border-width-strong) solid var(--border-default);
  transition: all var(--dur-base) var(--ease-out);
}
.ia-step__marker svg { width: 15px; height: 15px; }
.ia-step__line { flex: 1; width: 2px; background: var(--border-default); margin: 4px 0; border-radius: 2px; min-height: 14px; }
.ia-step__content { padding-bottom: 22px; padding-top: 3px; }
.ia-step:last-child .ia-step__content { padding-bottom: 0; }
.ia-step__title { font-weight: var(--fw-semibold); color: var(--text-strong); font-size: var(--fs-body); }
.ia-step__desc { font-size: var(--fs-body-sm); color: var(--text-muted); line-height: var(--lh-body); margin-top: 2px; }

/* done */
.ia-step--done .ia-step__marker { background: var(--brand); border-color: var(--brand); color: #fff; }
.ia-step--done .ia-step__line { background: var(--brand); }
/* current */
.ia-step--current .ia-step__marker { background: var(--accent); border-color: var(--accent); color: var(--graphite-900); box-shadow: var(--ring-accent); }
.ia-step--current .ia-step__title { color: var(--text-strong); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-steplist-css')) {
  const s = document.createElement('style'); s.id = 'ia-steplist-css'; s.textContent = CSS_12;
  document.head.appendChild(s);
}

function StepList({ steps = [], className = '', ...rest }) {
  return (
    <div className={['ia-steplist', className].filter(Boolean).join(' ')} {...rest}>
      {steps.map((step, i) => {
        const status = step.status || 'upcoming';
        const last = i === steps.length - 1;
        return (
          <div key={i} className={`ia-step ia-step--${status}`}>
            <div className="ia-step__rail">
              <span className="ia-step__marker" aria-hidden="true">
                {status === 'done'
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  : (i + 1)}
              </span>
              {!last ? <span className="ia-step__line"></span> : null}
            </div>
            <div className="ia-step__content">
              <div className="ia-step__title">{step.title}</div>
              {step.description ? <div className="ia-step__desc">{step.description}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ===== components/modules/ModuleCard.jsx ===== */

const ACCENTS = {
  ficha:      { line: 'var(--mod-ficha)',      soft: 'var(--mod-ficha-soft)' },
  receitas:   { line: 'var(--mod-receitas)',   soft: 'var(--mod-receitas-soft)' },
  estoque:    { line: 'var(--mod-estoque)',    soft: 'var(--mod-estoque-soft)' },
  compras:    { line: 'var(--mod-compras)',    soft: 'var(--mod-compras-soft)' },
  checklist:  { line: 'var(--mod-checklist)',  soft: 'var(--mod-checklist-soft)' },
  financeiro: { line: 'var(--mod-financeiro)', soft: 'var(--mod-financeiro-soft)' },
};

const CSS_13 = `
.ia-module {
  position: relative;
  display: flex; flex-direction: column; gap: 14px;
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 22px;
  font-family: var(--font-sans);
  text-align: left; width: 100%;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.ia-module:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.ia-module:focus-visible { outline: none; box-shadow: var(--ring-brand); }
.ia-module:active { transform: translateY(-1px); }
.ia-module--selected { border-color: var(--_line); box-shadow: 0 0 0 2px var(--_line), var(--shadow-md); }
.ia-module--soon { opacity: 0.72; }

.ia-module__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ia-module__icon {
  width: 52px; height: 52px; border-radius: var(--radius-md);
  background: var(--_soft); color: var(--_line);
  display: inline-flex; align-items: center; justify-content: center; flex: none;
}
.ia-module__icon svg, .ia-module__icon i { width: 26px; height: 26px; }
.ia-module__check {
  width: 26px; height: 26px; border-radius: 50%; flex: none;
  background: var(--_line); color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
}
.ia-module__check svg { width: 15px; height: 15px; }
.ia-module__title { font-size: var(--fs-h4); font-weight: var(--fw-bold); color: var(--text-strong); letter-spacing: var(--ls-snug); }
.ia-module__desc { font-size: var(--fs-body-sm); color: var(--text-muted); line-height: var(--lh-body); }
.ia-module__foot { display: flex; align-items: center; gap: 8px; margin-top: 2px; flex-wrap: wrap; }
.ia-module__meta {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: var(--fs-caption); font-weight: var(--fw-medium); color: var(--text-faint);
}
.ia-module__meta svg, .ia-module__meta i { width: 13px; height: 13px; }
.ia-module__pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: var(--fs-caption); font-weight: var(--fw-semibold);
  padding: 4px 9px; border-radius: var(--radius-pill);
  background: var(--_soft); color: var(--_line);
}
.ia-module__pill--soon { background: var(--cream-200); color: var(--text-muted); }
`;
if (typeof document !== 'undefined' && !document.getElementById('ia-module-css')) {
  const s = document.createElement('style'); s.id = 'ia-module-css'; s.textContent = CSS_13;
  document.head.appendChild(s);
}

function ModuleCard({
  title,
  description,
  icon,
  accent = 'ficha',
  meta,
  status = 'available',
  selected = false,
  className = '',
  as = 'button',
  ...rest
}) {
  const a = ACCENTS[accent] || ACCENTS.ficha;
  const Tag = as;
  const cls = [
    'ia-module',
    selected ? 'ia-module--selected' : '',
    status === 'soon' ? 'ia-module--soon' : '',
    className,
  ].filter(Boolean).join(' ');
  const style = { '--_line': a.line, '--_soft': a.soft };
  const iconNode = typeof icon === 'string' ? <i data-lucide={icon}></i> : icon;

  return (
    <Tag className={cls} style={style} type={as === 'button' ? 'button' : undefined} {...rest}>
      <div className="ia-module__top">
        <span className="ia-module__icon" aria-hidden="true">{iconNode}</span>
        {selected ? (
          <span className="ia-module__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </span>
        ) : status === 'soon' ? (
          <span className="ia-module__pill ia-module__pill--soon">Em breve</span>
        ) : null}
      </div>
      <div>
        <div className="ia-module__title">{title}</div>
      </div>
      {description ? <div className="ia-module__desc">{description}</div> : null}
      {meta ? (
        <div className="ia-module__foot">
          <span className="ia-module__meta">{meta}</span>
        </div>
      ) : null}
    </Tag>
  );
}


window.IADaCasaDesignSystem_449ba5 = Object.assign(window.IADaCasaDesignSystem_449ba5 || {}, { Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Card, Badge, Avatar, Callout, StepList, ModuleCard });
