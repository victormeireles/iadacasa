/* IA da Casa — App shell (topbar + page chrome) */
const DS = window.IADaCasaDesignSystem_449ba5;

function AppTopbar({ restaurant, onHome, progress }) {
  const { Avatar, Badge } = DS;
  return (
    <header className="ia-topbar">
      <button className="ia-topbar__brand" onClick={onHome} aria-label="Início">
        <img src="../../assets/logo-mark.svg" alt="" className="ia-topbar__logo" />
        <span className="ia-topbar__name">IA da Casa</span>
      </button>

      {progress ? (
        <div className="ia-topbar__progress">
          <span className="ia-topbar__progress-label">{progress}</span>
        </div>
      ) : null}

      <div className="ia-topbar__right">
        <button className="ia-topbar__help">
          <i data-lucide="life-buoy"></i> Ajuda
        </button>
        <div className="ia-topbar__rest">
          <div className="ia-topbar__rest-meta">
            <span className="ia-topbar__rest-name">{restaurant.name}</span>
            <span className="ia-topbar__rest-plan">{restaurant.plan}</span>
          </div>
          <Avatar name={restaurant.name} color="terracotta" />
        </div>
      </div>
    </header>
  );
}

function Page({ children, width = 'lg' }) {
  return <main className="ia-page" data-width={width}>{children}</main>;
}

Object.assign(window, { AppTopbar, Page });
