/* @ds-bundle: {"format":3,"namespace":"IADaCasaDesignSystem_449ba5","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"StepList","sourcePath":"components/feedback/StepList.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"ModuleCard","sourcePath":"components/modules/ModuleCard.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"0b6b1cb1950f","components/buttons/IconButton.jsx":"9cabf679bdf5","components/data-display/Avatar.jsx":"04ee2c3f00d8","components/data-display/Badge.jsx":"625e68b09b3c","components/data-display/Card.jsx":"a846a5974803","components/feedback/Callout.jsx":"d46d7930563e","components/feedback/StepList.jsx":"fac4c6b41518","components/forms/Checkbox.jsx":"fd04c7f0a828","components/forms/Input.jsx":"aef9c9247525","components/forms/Select.jsx":"93c3478afc08","components/forms/Switch.jsx":"6e8f56956e89","components/forms/Textarea.jsx":"13d58e6fb765","components/modules/ModuleCard.jsx":"58510482a456","ds-runtime.js":"a8ad2ce49827","ui_kits/app/AppShell.jsx":"f46b25041dea","ui_kits/app/CardapioScreen.jsx":"57d90fb87525","ui_kits/app/ModuloScreen.jsx":"0864bec42f23","ui_kits/app/ReceitaScreen.jsx":"b96f3d1945ff","ui_kits/app/data.js":"68e19a8e5289"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.IADaCasaDesignSystem_449ba5 = window.IADaCasaDesignSystem_449ba5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-btn-css';
  s.textContent = CSS;
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
  const cls = ['ia-btn', `ia-btn--${variant}`, `ia-btn--${size}`, fullWidth ? 'ia-btn--full' : '', className].filter(Boolean).join(' ');
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, leftIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ia-btn__icon"
  }, leftIcon) : null, children, rightIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ia-btn__icon"
  }, rightIcon) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-iconbtn-css';
  s.textContent = CSS;
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
  const cls = ['ia-iconbtn', `ia-iconbtn--${variant}`, `ia-iconbtn--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
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
  const s = document.createElement('style');
  s.id = 'ia-avatar-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function Avatar({
  name = '',
  src,
  size = 'md',
  color = 'brand',
  className = '',
  ...rest
}) {
  const cls = ['ia-avatar', `ia-avatar--${size}`, color !== 'brand' ? `ia-avatar--${color}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-badge-css';
  s.textContent = CSS;
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
  const cls = ['ia-badge', `ia-badge--${variant}`, tone === 'solid' ? 'ia-badge--solid' : tone === 'outline' ? 'ia-badge--outline' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ia-badge__dot",
    "aria-hidden": "true"
  }) : null, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
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
  const s = document.createElement('style');
  s.id = 'ia-card-css';
  s.textContent = CSS;
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
  const cls = ['ia-card', `ia-card--pad-${padding}`, elevation === 'md' ? 'ia-card--elevated' : elevation === 'none' ? 'ia-card--flat' : '', interactive ? 'ia-card--interactive' : '', inverse ? 'ia-card--inverse' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-callout-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const DEFAULT_ICONS = {
  ai: 'sparkles',
  info: 'info',
  warning: 'triangle-alert',
  danger: 'octagon-alert',
  success: 'circle-check'
};
function Callout({
  children,
  variant = 'ai',
  title,
  icon,
  className = '',
  ...rest
}) {
  const cls = ['ia-callout', `ia-callout--${variant}`, className].filter(Boolean).join(' ');
  const iconNode = icon !== undefined ? icon : /*#__PURE__*/React.createElement("i", {
    "data-lucide": DEFAULT_ICONS[variant] || 'info'
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__icon",
    "aria-hidden": "true"
  }, iconNode), /*#__PURE__*/React.createElement("div", {
    className: "ia-callout__body"
  }, title ? /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__title"
  }, title) : null, /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__text"
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StepList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
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
  const s = document.createElement('style');
  s.id = 'ia-steplist-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function StepList({
  steps = [],
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ia-steplist', className].filter(Boolean).join(' ')
  }, rest), steps.map((step, i) => {
    const status = step.status || 'upcoming';
    const last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `ia-step ia-step--${status}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "ia-step__rail"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ia-step__marker",
      "aria-hidden": "true"
    }, status === 'done' ? /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    })) : i + 1), !last ? /*#__PURE__*/React.createElement("span", {
      className: "ia-step__line"
    }) : null), /*#__PURE__*/React.createElement("div", {
      className: "ia-step__content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ia-step__title"
    }, step.title), step.description ? /*#__PURE__*/React.createElement("div", {
      className: "ia-step__desc"
    }, step.description) : null));
  }));
}
Object.assign(__ds_scope, { StepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StepList.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-check-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  id,
  className = '',
  children,
  ...rest
}) {
  const fieldId = id || `ia-check-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: ['ia-check', className].filter(Boolean).join(' '),
    htmlFor: fieldId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: fieldId
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ia-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label || children ? /*#__PURE__*/React.createElement("span", {
    className: "ia-check__label"
  }, label || children) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-input-css';
  s.textContent = CSS;
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
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, leftIcon ? /*#__PURE__*/React.createElement("div", {
    className: "ia-input-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-input-wrap__icon"
  }, leftIcon), input) : input, error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-select-css';
  s.textContent = CSS;
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
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "ia-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: ['ia-select', className].filter(Boolean).join(' ')
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "ia-select-wrap__chevron",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-switch-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({
  label,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `ia-switch-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: ['ia-switch', className].filter(Boolean).join(' '),
    htmlFor: fieldId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    id: fieldId
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-textarea-css';
  s.textContent = CSS;
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
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: cls,
    "aria-invalid": !!error
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/modules/ModuleCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ACCENTS = {
  ficha: {
    line: 'var(--mod-ficha)',
    soft: 'var(--mod-ficha-soft)'
  },
  receitas: {
    line: 'var(--mod-receitas)',
    soft: 'var(--mod-receitas-soft)'
  },
  estoque: {
    line: 'var(--mod-estoque)',
    soft: 'var(--mod-estoque-soft)'
  },
  compras: {
    line: 'var(--mod-compras)',
    soft: 'var(--mod-compras-soft)'
  },
  checklist: {
    line: 'var(--mod-checklist)',
    soft: 'var(--mod-checklist-soft)'
  },
  financeiro: {
    line: 'var(--mod-financeiro)',
    soft: 'var(--mod-financeiro-soft)'
  }
};
const CSS = `
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
  const s = document.createElement('style');
  s.id = 'ia-module-css';
  s.textContent = CSS;
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
  const cls = ['ia-module', selected ? 'ia-module--selected' : '', status === 'soon' ? 'ia-module--soon' : '', className].filter(Boolean).join(' ');
  const style = {
    '--_line': a.line,
    '--_soft': a.soft
  };
  const iconNode = typeof icon === 'string' ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  }) : icon;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: style,
    type: as === 'button' ? 'button' : undefined
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ia-module__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-module__icon",
    "aria-hidden": "true"
  }, iconNode), selected ? /*#__PURE__*/React.createElement("span", {
    className: "ia-module__check",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))) : status === 'soon' ? /*#__PURE__*/React.createElement("span", {
    className: "ia-module__pill ia-module__pill--soon"
  }, "Em breve") : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ia-module__title"
  }, title)), description ? /*#__PURE__*/React.createElement("div", {
    className: "ia-module__desc"
  }, description) : null, meta ? /*#__PURE__*/React.createElement("div", {
    className: "ia-module__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-module__meta"
  }, meta)) : null);
}
Object.assign(__ds_scope, { ModuleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/modules/ModuleCard.jsx", error: String((e && e.message) || e) }); }

// ds-runtime.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const s = document.createElement('style');
  s.id = 'ia-btn-css';
  s.textContent = CSS_1;
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
  const cls = ['ia-btn', `ia-btn--${variant}`, `ia-btn--${size}`, fullWidth ? 'ia-btn--full' : '', className].filter(Boolean).join(' ');
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, leftIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ia-btn__icon"
  }, leftIcon) : null, children, rightIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ia-btn__icon"
  }, rightIcon) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), content);
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
  const s = document.createElement('style');
  s.id = 'ia-iconbtn-css';
  s.textContent = CSS_2;
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
  const cls = ['ia-iconbtn', `ia-iconbtn--${variant}`, `ia-iconbtn--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), icon);
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
  const s = document.createElement('style');
  s.id = 'ia-input-css';
  s.textContent = CSS_3;
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
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, leftIcon ? /*#__PURE__*/React.createElement("div", {
    className: "ia-input-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-input-wrap__icon"
  }, leftIcon), input) : input, error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
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
  const s = document.createElement('style');
  s.id = 'ia-textarea-css';
  s.textContent = CSS_4;
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
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: cls,
    "aria-invalid": !!error
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
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
  const s = document.createElement('style');
  s.id = 'ia-select-css';
  s.textContent = CSS_5;
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
  return /*#__PURE__*/React.createElement("div", {
    className: "ia-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ia-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "ia-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: ['ia-select', className].filter(Boolean).join(' ')
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "ia-select-wrap__chevron",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ia-field__hint"
  }, hint) : null);
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
  const s = document.createElement('style');
  s.id = 'ia-check-css';
  s.textContent = CSS_6;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  id,
  className = '',
  children,
  ...rest
}) {
  const fieldId = id || `ia-check-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: ['ia-check', className].filter(Boolean).join(' '),
    htmlFor: fieldId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: fieldId
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ia-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label || children ? /*#__PURE__*/React.createElement("span", {
    className: "ia-check__label"
  }, label || children) : null);
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
  const s = document.createElement('style');
  s.id = 'ia-switch-css';
  s.textContent = CSS_7;
  document.head.appendChild(s);
}
function Switch({
  label,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || `ia-switch-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: ['ia-switch', className].filter(Boolean).join(' '),
    htmlFor: fieldId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    id: fieldId
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "ia-switch__label"
  }, label) : null);
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
  const s = document.createElement('style');
  s.id = 'ia-card-css';
  s.textContent = CSS_8;
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
  const cls = ['ia-card', `ia-card--pad-${padding}`, elevation === 'md' ? 'ia-card--elevated' : elevation === 'none' ? 'ia-card--flat' : '', interactive ? 'ia-card--interactive' : '', inverse ? 'ia-card--inverse' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
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
  const s = document.createElement('style');
  s.id = 'ia-badge-css';
  s.textContent = CSS_9;
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
  const cls = ['ia-badge', `ia-badge--${variant}`, tone === 'solid' ? 'ia-badge--solid' : tone === 'outline' ? 'ia-badge--outline' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ia-badge__dot",
    "aria-hidden": "true"
  }) : null, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon) : null, children);
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
  const s = document.createElement('style');
  s.id = 'ia-avatar-css';
  s.textContent = CSS_10;
  document.head.appendChild(s);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function Avatar({
  name = '',
  src,
  size = 'md',
  color = 'brand',
  className = '',
  ...rest
}) {
  const cls = ['ia-avatar', `ia-avatar--${size}`, color !== 'brand' ? `ia-avatar--${color}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
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
  const s = document.createElement('style');
  s.id = 'ia-callout-css';
  s.textContent = CSS_11;
  document.head.appendChild(s);
}
const DEFAULT_ICONS = {
  ai: 'sparkles',
  info: 'info',
  warning: 'triangle-alert',
  danger: 'octagon-alert',
  success: 'circle-check'
};
function Callout({
  children,
  variant = 'ai',
  title,
  icon,
  className = '',
  ...rest
}) {
  const cls = ['ia-callout', `ia-callout--${variant}`, className].filter(Boolean).join(' ');
  const iconNode = icon !== undefined ? icon : /*#__PURE__*/React.createElement("i", {
    "data-lucide": DEFAULT_ICONS[variant] || 'info'
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__icon",
    "aria-hidden": "true"
  }, iconNode), /*#__PURE__*/React.createElement("div", {
    className: "ia-callout__body"
  }, title ? /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__title"
  }, title) : null, /*#__PURE__*/React.createElement("span", {
    className: "ia-callout__text"
  }, children)));
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
  const s = document.createElement('style');
  s.id = 'ia-steplist-css';
  s.textContent = CSS_12;
  document.head.appendChild(s);
}
function StepList({
  steps = [],
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ia-steplist', className].filter(Boolean).join(' ')
  }, rest), steps.map((step, i) => {
    const status = step.status || 'upcoming';
    const last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `ia-step ia-step--${status}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "ia-step__rail"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ia-step__marker",
      "aria-hidden": "true"
    }, status === 'done' ? /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    })) : i + 1), !last ? /*#__PURE__*/React.createElement("span", {
      className: "ia-step__line"
    }) : null), /*#__PURE__*/React.createElement("div", {
      className: "ia-step__content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ia-step__title"
    }, step.title), step.description ? /*#__PURE__*/React.createElement("div", {
      className: "ia-step__desc"
    }, step.description) : null));
  }));
}

/* ===== components/modules/ModuleCard.jsx ===== */

const ACCENTS = {
  ficha: {
    line: 'var(--mod-ficha)',
    soft: 'var(--mod-ficha-soft)'
  },
  receitas: {
    line: 'var(--mod-receitas)',
    soft: 'var(--mod-receitas-soft)'
  },
  estoque: {
    line: 'var(--mod-estoque)',
    soft: 'var(--mod-estoque-soft)'
  },
  compras: {
    line: 'var(--mod-compras)',
    soft: 'var(--mod-compras-soft)'
  },
  checklist: {
    line: 'var(--mod-checklist)',
    soft: 'var(--mod-checklist-soft)'
  },
  financeiro: {
    line: 'var(--mod-financeiro)',
    soft: 'var(--mod-financeiro-soft)'
  }
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
  const s = document.createElement('style');
  s.id = 'ia-module-css';
  s.textContent = CSS_13;
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
  const cls = ['ia-module', selected ? 'ia-module--selected' : '', status === 'soon' ? 'ia-module--soon' : '', className].filter(Boolean).join(' ');
  const style = {
    '--_line': a.line,
    '--_soft': a.soft
  };
  const iconNode = typeof icon === 'string' ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  }) : icon;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: style,
    type: as === 'button' ? 'button' : undefined
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ia-module__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-module__icon",
    "aria-hidden": "true"
  }, iconNode), selected ? /*#__PURE__*/React.createElement("span", {
    className: "ia-module__check",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))) : status === 'soon' ? /*#__PURE__*/React.createElement("span", {
    className: "ia-module__pill ia-module__pill--soon"
  }, "Em breve") : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ia-module__title"
  }, title)), description ? /*#__PURE__*/React.createElement("div", {
    className: "ia-module__desc"
  }, description) : null, meta ? /*#__PURE__*/React.createElement("div", {
    className: "ia-module__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-module__meta"
  }, meta)) : null);
}
window.IADaCasaDesignSystem_449ba5 = Object.assign(window.IADaCasaDesignSystem_449ba5 || {}, {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Card,
  Badge,
  Avatar,
  Callout,
  StepList,
  ModuleCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds-runtime.js", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
/* IA da Casa — App shell (topbar + page chrome) */
const DS = window.IADaCasaDesignSystem_449ba5;
function AppTopbar({
  restaurant,
  onHome,
  progress
}) {
  const {
    Avatar,
    Badge
  } = DS;
  return /*#__PURE__*/React.createElement("header", {
    className: "ia-topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ia-topbar__brand",
    onClick: onHome,
    "aria-label": "In\xEDcio"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    alt: "",
    className: "ia-topbar__logo"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ia-topbar__name"
  }, "IA da Casa")), progress ? /*#__PURE__*/React.createElement("div", {
    className: "ia-topbar__progress"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-topbar__progress-label"
  }, progress)) : null, /*#__PURE__*/React.createElement("div", {
    className: "ia-topbar__right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ia-topbar__help"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "life-buoy"
  }), " Ajuda"), /*#__PURE__*/React.createElement("div", {
    className: "ia-topbar__rest"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ia-topbar__rest-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ia-topbar__rest-name"
  }, restaurant.name), /*#__PURE__*/React.createElement("span", {
    className: "ia-topbar__rest-plan"
  }, restaurant.plan)), /*#__PURE__*/React.createElement(Avatar, {
    name: restaurant.name,
    color: "terracotta"
  }))));
}
function Page({
  children,
  width = 'lg'
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "ia-page",
    "data-width": width
  }, children);
}
Object.assign(window, {
  AppTopbar,
  Page
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CardapioScreen.jsx
try { (() => {
/* IA da Casa — Cardápio de soluções (home) */
const DS = window.IADaCasaDesignSystem_449ba5;
function CardapioScreen({
  data,
  onPick
}) {
  const {
    ModuleCard,
    Badge
  } = DS;
  const {
    modules,
    restaurant
  } = data;
  return /*#__PURE__*/React.createElement(Page, {
    width: "lg"
  }, /*#__PURE__*/React.createElement("section", {
    className: "cardapio-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cardapio-hero__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ia-eyebrow"
  }, "Card\xE1pio de solu\xE7\xF5es"), /*#__PURE__*/React.createElement("h1", {
    className: "cardapio-hero__title"
  }, "Qual dor da sua cozinha", /*#__PURE__*/React.createElement("br", null), "vamos resolver primeiro?"), /*#__PURE__*/React.createElement("p", {
    className: "cardapio-hero__sub"
  }, "Escolha um m\xF3dulo, responda algumas perguntas sobre o seu neg\xF3cio e receba a ", /*#__PURE__*/React.createElement("strong", null, "Receita do Sistema"), " \u2014 pronta pra montar.")), /*#__PURE__*/React.createElement("div", {
    className: "cardapio-hero__card"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "brand",
    dot: true
  }, "2 m\xF3dulos prontos"), /*#__PURE__*/React.createElement("p", {
    className: "cardapio-hero__card-q"
  }, "\u201C", modules[0].dor, "\u201D"), /*#__PURE__*/React.createElement("p", {
    className: "cardapio-hero__card-a"
  }, "Comece pela ", /*#__PURE__*/React.createElement("strong", null, "Ficha T\xE9cnica"), ". \xC9 a base de tudo."))), /*#__PURE__*/React.createElement("div", {
    className: "cardapio-grid"
  }, modules.map(m => /*#__PURE__*/React.createElement(ModuleCard, {
    key: m.key,
    accent: m.accent,
    icon: m.icon,
    title: m.title,
    description: m.desc,
    status: m.status,
    meta: m.status === 'soon' ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "clock"
    }), " ", m.time),
    onClick: () => m.status !== 'soon' && onPick(m)
  }))));
}
Object.assign(window, {
  CardapioScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CardapioScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ModuloScreen.jsx
try { (() => {
/* IA da Casa — Módulo + questionário guiado */
const DS = window.IADaCasaDesignSystem_449ba5;
function ModuloScreen({
  data,
  module,
  onBack,
  onGenerate
}) {
  const {
    Input,
    Textarea,
    Select,
    Checkbox,
    Button,
    StepList,
    Callout,
    Badge
  } = DS;
  const m = module || data.modules[0];
  return /*#__PURE__*/React.createElement(Page, {
    width: "lg"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ia-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left"
  }), " Voltar ao card\xE1pio"), /*#__PURE__*/React.createElement("div", {
    className: "modulo-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "modulo-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: `modulo-aside__head mod-${m.accent}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "modulo-aside__icon"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": m.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ia-eyebrow"
  }, "M\xF3dulo"), /*#__PURE__*/React.createElement("h2", {
    className: "modulo-aside__title"
  }, m.title))), /*#__PURE__*/React.createElement("p", {
    className: "modulo-aside__desc"
  }, m.desc), /*#__PURE__*/React.createElement("div", {
    className: "modulo-aside__steps"
  }, /*#__PURE__*/React.createElement(StepList, {
    steps: data.steps
  }))), /*#__PURE__*/React.createElement("section", {
    className: "modulo-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modulo-main__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ia-eyebrow"
  }, "Passo 2 de 4 \xB7 Question\xE1rio"), /*#__PURE__*/React.createElement("h1", {
    className: "modulo-main__title"
  }, "Conte como funciona hoje"), /*#__PURE__*/React.createElement("p", {
    className: "modulo-main__lead"
  }, "Sem termos t\xE9cnicos. Responda do seu jeito \u2014 o copiloto traduz pra um sistema depois.")), /*#__PURE__*/React.createElement(Callout, {
    variant: "ai",
    title: "Por que perguntamos isso?"
  }, "Quanto melhor a gente entende a sua opera\xE7\xE3o, mais a Receita do Sistema vai ter a cara do seu restaurante."), /*#__PURE__*/React.createElement("div", {
    className: "modulo-form"
  }, data.questions.map(q => {
    if (q.kind === 'select') {
      return /*#__PURE__*/React.createElement(Select, {
        key: q.id,
        label: q.label,
        options: q.options,
        defaultValue: q.value
      });
    }
    if (q.kind === 'input') {
      return /*#__PURE__*/React.createElement(Input, {
        key: q.id,
        label: q.label,
        placeholder: q.placeholder,
        defaultValue: q.value,
        hint: q.hint
      });
    }
    if (q.kind === 'textarea') {
      return /*#__PURE__*/React.createElement(Textarea, {
        key: q.id,
        label: q.label,
        placeholder: q.placeholder,
        defaultValue: q.value,
        rows: 3
      });
    }
    if (q.kind === 'checks') {
      return /*#__PURE__*/React.createElement("div", {
        key: q.id,
        className: "ia-field"
      }, /*#__PURE__*/React.createElement("span", {
        className: "ia-field__label",
        style: {
          fontSize: 'var(--fs-body-sm)',
          fontWeight: 'var(--fw-semibold)'
        }
      }, q.label), /*#__PURE__*/React.createElement("div", {
        className: "modulo-checks"
      }, q.options.map((o, i) => /*#__PURE__*/React.createElement(Checkbox, {
        key: i,
        label: o.label,
        defaultChecked: o.checked
      }))));
    }
    return null;
  })), /*#__PURE__*/React.createElement("div", {
    className: "modulo-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onBack
  }, "Salvar e sair"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    rightIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "sparkles"
    }),
    onClick: onGenerate
  }, "Gerar a Receita do Sistema")))));
}
Object.assign(window, {
  ModuloScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ModuloScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ReceitaScreen.jsx
try { (() => {
/* IA da Casa — Receita do Sistema (output gerado) */
const DS = window.IADaCasaDesignSystem_449ba5;
function ReceitaScreen({
  data,
  module,
  onBack
}) {
  const {
    Button,
    Badge,
    Card,
    Callout,
    StepList
  } = DS;
  const m = module || data.modules[0];
  const r = data.recipe;
  const [copied, setCopied] = React.useState(false);
  const copyPrompt = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(r.prompt);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /*#__PURE__*/React.createElement(Page, {
    width: "lg"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ia-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left"
  }), " Voltar ao question\xE1rio"), /*#__PURE__*/React.createElement("header", {
    className: "receita-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "receita-head__left"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    dot: true
  }, "Receita pronta"), /*#__PURE__*/React.createElement("h1", {
    className: "receita-head__title"
  }, "Receita do Sistema \xB7 ", r.module), /*#__PURE__*/React.createElement("p", {
    className: "receita-head__sub"
  }, "Feita para uma ", /*#__PURE__*/React.createElement("strong", null, data.questions[0].value.toLowerCase()), " com cerca de", ' ', data.questions[1].value, " itens no card\xE1pio.")), /*#__PURE__*/React.createElement("div", {
    className: "receita-head__actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    leftIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "download"
    })
  }, "Baixar PDF"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    rightIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-up-right"
    })
  }, "Montar no Lovable"))), /*#__PURE__*/React.createElement("div", {
    className: "receita-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "receita-main"
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ia-eyebrow"
  }, "O que \xE9 esse m\xF3dulo"), /*#__PURE__*/React.createElement("p", {
    className: "receita-summary"
  }, r.summary)), /*#__PURE__*/React.createElement("section", {
    className: "receita-block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "receita-block__title"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "scale"
  }), " Regras de neg\xF3cio"), /*#__PURE__*/React.createElement("ul", {
    className: "receita-rules"
  }, r.rules.map((rule, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "receita-rules__mk"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check"
  })), rule)))), /*#__PURE__*/React.createElement("section", {
    className: "receita-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "receita-prompt__head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "receita-block__title"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles"
  }), " Prompt pronto"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: copyPrompt,
    leftIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": copied ? 'check' : 'copy'
    })
  }, copied ? 'Copiado!' : 'Copiar')), /*#__PURE__*/React.createElement("pre", {
    className: "receita-prompt"
  }, /*#__PURE__*/React.createElement("code", null, r.prompt))), /*#__PURE__*/React.createElement("section", {
    className: "receita-block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "receita-block__title"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "list-checks"
  }), " Passo a passo para montar"), /*#__PURE__*/React.createElement(StepList, {
    steps: r.build.map((b, i) => ({
      ...b,
      status: i === 0 ? 'current' : 'upcoming'
    }))
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "receita-aside"
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    inverse: true
  }, /*#__PURE__*/React.createElement("p", {
    className: "ia-eyebrow",
    style: {
      color: 'var(--green-300)'
    }
  }, "Seu copiloto"), /*#__PURE__*/React.createElement("p", {
    className: "receita-aside__lead"
  }, "Tudo pronto pra montar."), /*#__PURE__*/React.createElement("p", {
    className: "receita-aside__text"
  }, "Leve o prompt pro Lovable e siga o passo a passo. Travou em alguma parte? Eu te ajudo a ajustar."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    fullWidth: true,
    rightIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-up-right"
    })
  }, "Montar no Lovable"), /*#__PURE__*/React.createElement("button", {
    className: "receita-aside__ghost"
  }, "Refazer o question\xE1rio")), /*#__PURE__*/React.createElement(Callout, {
    variant: "info",
    title: "Dica"
  }, "Comece com 3 pratos reais antes de cadastrar o card\xE1pio inteiro. Valida a conta sem trabalho \xE0 toa."))));
}
Object.assign(window, {
  ReceitaScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ReceitaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
/* IA da Casa — UI kit demo data */
window.IA_APP_DATA = {
  restaurant: {
    name: 'Bar do Zé',
    plan: 'Cozinha organizada',
    city: 'São Paulo · SP'
  },
  modules: [{
    key: 'ficha',
    accent: 'ficha',
    icon: 'clipboard-list',
    title: 'Ficha Técnica',
    desc: 'Padronize fichas e calcule o custo real de cada prato.',
    time: '~5 min',
    dor: 'Não sei o custo certo de cada prato.'
  }, {
    key: 'receitas',
    accent: 'receitas',
    icon: 'cooking-pot',
    title: 'Receitas',
    desc: 'Centralize o modo de preparo e mantenha o padrão da casa.',
    time: '~6 min',
    dor: 'Cada um faz de um jeito na cozinha.'
  }, {
    key: 'estoque',
    accent: 'estoque',
    icon: 'package',
    title: 'Estoque',
    desc: 'Saiba o que tem, o que falta e o que está vencendo.',
    time: '~7 min',
    dor: 'Sempre falta ingrediente na hora errada.'
  }, {
    key: 'compras',
    accent: 'compras',
    icon: 'shopping-cart',
    title: 'Compras',
    desc: 'Liste o que comprar com base no consumo real.',
    time: '~5 min',
    dor: 'Compro no susto e gasto demais.'
  }, {
    key: 'checklist',
    accent: 'checklist',
    icon: 'list-checks',
    title: 'Checklist',
    desc: 'Rotinas de abertura e fechamento sem esquecer nada.',
    time: '~4 min',
    dor: 'A equipe esquece etapas da rotina.'
  }, {
    key: 'financeiro',
    accent: 'financeiro',
    icon: 'wallet',
    title: 'Financeiro',
    desc: 'Controle entradas, saídas e o caixa do dia.',
    time: '~8 min',
    dor: 'Não sei se o dia fechou no positivo.',
    status: 'soon'
  }],
  /* Questionário do módulo Ficha Técnica */
  questions: [{
    id: 'op',
    kind: 'select',
    label: 'Qual o tipo da sua operação?',
    options: ['Hamburgueria', 'Pizzaria', 'Bar', 'Restaurante', 'Cafeteria'],
    value: 'Hamburgueria'
  }, {
    id: 'pratos',
    kind: 'input',
    label: 'Quantos itens no cardápio, mais ou menos?',
    placeholder: 'Ex.: 24',
    value: '24',
    hint: 'Não precisa ser exato.'
  }, {
    id: 'hoje',
    kind: 'textarea',
    label: 'Como você calcula o preço dos pratos hoje?',
    placeholder: 'Conte do seu jeito. A gente organiza depois.',
    value: 'Olho o preço dos concorrentes e chuto uma margem por cima do custo dos ingredientes principais.'
  }, {
    id: 'controlar',
    kind: 'checks',
    label: 'O que você quer controlar?',
    options: [{
      label: 'Custo por porção',
      checked: true
    }, {
      label: 'Margem de lucro alvo',
      checked: true
    }, {
      label: 'Rendimento da receita',
      checked: false
    }, {
      label: 'Validade dos insumos',
      checked: false
    }]
  }],
  steps: [{
    title: 'Escolher módulo',
    status: 'done'
  }, {
    title: 'Responder o questionário',
    status: 'current',
    description: 'Conte como funciona hoje.'
  }, {
    title: 'Revisar regras de negócio',
    status: 'upcoming'
  }, {
    title: 'Receber a Receita do Sistema',
    status: 'upcoming'
  }],
  /* Receita do Sistema gerada (Ficha Técnica) */
  recipe: {
    module: 'Ficha Técnica',
    summary: 'Um módulo onde você cadastra cada prato com seus ingredientes e quantidades. O sistema calcula o custo por porção e sugere o preço de venda pela margem que você definir — atualizando sozinho quando o preço de um insumo muda.',
    rules: ['Cada prato tem uma lista de ingredientes com quantidade e unidade.', 'O custo do prato é a soma (quantidade × preço unitário) de cada ingrediente.', 'O preço sugerido = custo ÷ (1 − margem alvo).', 'Se faltar o preço de um ingrediente, o prato fica marcado como "custo incompleto".', 'Alterou o preço de um insumo? Todos os pratos que o usam são recalculados.'],
    prompt: `# Módulo: Ficha Técnica — IA da Casa
Você é um assistente de fichas técnicas para um restaurante.

Contexto: operação de hamburgueria, ~24 itens no cardápio.
Objetivo: calcular o custo por porção e sugerir o preço de venda.

Para cada prato, peça:
- nome do prato
- ingredientes (item, quantidade, unidade, preço unitário)
- margem alvo (%)

Então calcule:
- custo_total = soma(quantidade × preço_unitário)
- preço_sugerido = custo_total ÷ (1 − margem/100)

Sinalize pratos com ingrediente sem preço como "custo incompleto".`,
    build: [{
      title: 'Crie o app no Lovable',
      description: 'Cole o prompt acima como descrição inicial do projeto.'
    }, {
      title: 'Adicione a tabela de ingredientes',
      description: 'Campos: nome, unidade, preço unitário.'
    }, {
      title: 'Adicione a tabela de pratos',
      description: 'Cada prato referencia ingredientes com quantidade.'
    }, {
      title: 'Ligue o cálculo de custo e preço',
      description: 'Use a regra de margem para sugerir o preço.'
    }, {
      title: 'Teste com 3 pratos reais',
      description: 'Confira se o custo bate com a sua conta.'
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.StepList = __ds_scope.StepList;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.ModuleCard = __ds_scope.ModuleCard;

})();
