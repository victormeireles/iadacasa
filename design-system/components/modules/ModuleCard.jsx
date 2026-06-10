import React from 'react';

const ACCENTS = {
  ficha:      { line: 'var(--mod-ficha)',      soft: 'var(--mod-ficha-soft)' },
  receitas:   { line: 'var(--mod-receitas)',   soft: 'var(--mod-receitas-soft)' },
  estoque:    { line: 'var(--mod-estoque)',    soft: 'var(--mod-estoque-soft)' },
  compras:    { line: 'var(--mod-compras)',    soft: 'var(--mod-compras-soft)' },
  checklist:  { line: 'var(--mod-checklist)',  soft: 'var(--mod-checklist-soft)' },
  financeiro: { line: 'var(--mod-financeiro)', soft: 'var(--mod-financeiro-soft)' },
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
  const s = document.createElement('style'); s.id = 'ia-module-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function ModuleCard({
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
