import React from 'react';

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
  const s = document.createElement('style'); s.id = 'ia-avatar-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
}

export function Avatar({ name = '', src, size = 'md', color = 'brand', className = '', ...rest }) {
  const cls = ['ia-avatar', `ia-avatar--${size}`, color !== 'brand' ? `ia-avatar--${color}` : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
