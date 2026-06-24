import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button className="ao-btn ao-btn--subtle ao-btn--sm" onClick={onToggle} type="button">
      {theme === 'dark' ? 'Escuro' : 'Claro'}
    </button>
  );
}

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function AuthLayout({ children, title, subtitle, onBack }: AuthLayoutProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', 'work');
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="auth-shell" data-theme={theme} data-mode="work">
      <header className="ao-appbar">
        <Link className="ao-appbar__brand" to="/auth/dashboard" aria-label="AIOSON Auth">
          <span className="ao-appbar__brand-logo">A</span>
          <span>AIOSON Auth</span>
        </Link>

        <nav className="ao-appbar__nav" aria-label="Navegação principal">
          <NavLink
            to="/auth/dashboard"
            className={({ isActive }) => `ao-appbar__link${isActive ? ' ao-appbar__link--active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/auth/users"
            className={({ isActive }) => `ao-appbar__link${isActive ? ' ao-appbar__link--active' : ''}`}
          >
            Operadores
          </NavLink>
          <Link className="ao-appbar__link" to="/auth/dashboard#access-control">
            Acesso
          </Link>
        </nav>

        <div className="ao-appbar__spacer" />
        <div className="ao-appbar__actions">
          <span className="ao-chip ao-chip--secondary ao-chip--sm">Work mode</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="auth-page">
        <div className="auth-page-head">
          <div>
            <p className="auth-page-kicker">Administração</p>
            <h1 className="auth-page-title">{title}</h1>
            {subtitle && <p className="auth-page-subtitle">{subtitle}</p>}
          </div>
          {onBack && (
            <button className="ao-btn ao-btn--ghost ao-btn--sm" type="button" onClick={onBack}>
              Voltar
            </button>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}
