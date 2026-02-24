import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const hideNavbar = location.pathname === '/login';

  if (hideNavbar) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">Employee Dashboard</div>
      <nav className="navbar-nav">
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          List
        </NavLink>
        <NavLink
          to="/photo"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Photo
        </NavLink>
        <NavLink
          to="/chart"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Chart
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Map
        </NavLink>
      </nav>
      {isAuthenticated && (
        <div className="navbar-nav">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle-slider">
              <span className="theme-toggle-icon">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </span>
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

