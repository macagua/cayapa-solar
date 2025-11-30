import { useUIStore } from '@store/uiStore'
import { useAuthStore } from '@store/authStore'
import { Link } from 'react-router-dom'

export default function Header() {
  const { toggleSidebar, darkMode, toggleDarkMode } = useUIStore()
  const { user, logout } = useAuthStore()

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Dark mode toggle */}
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
          </button>
        </li>

        {/* Notifications */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">3</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">3 Notificaciones</span>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2"></i> 4 nuevos mensajes
            </a>
          </div>
        </li>

        {/* User menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <img
              src={user?.avatar || 'https://placehold.co/40'}
              className="img-circle elevation-2"
              alt="User"
              style={{ width: '30px', height: '30px' }}
            />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" className="dropdown-item">
              <i className="fas fa-user mr-2"></i> Perfil
            </a>
            <a href="#" className="dropdown-item">
              <i className="fas fa-cog mr-2"></i> Configuración
            </a>
            <div className="dropdown-divider"></div>
            <button
              onClick={logout}
              className="dropdown-item"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Cerrar sesión
            </button>
          </div>
        </li>
      </ul>
    </nav>
  )
}
