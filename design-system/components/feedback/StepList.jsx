import React from 'react';

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
  const s = document.createElement('style'); s.id = 'ia-steplist-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

export function StepList({ steps = [], className = '', ...rest }) {
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
