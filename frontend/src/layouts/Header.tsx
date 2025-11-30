import { useUIStore } from '@store/uiStore'
import { useAuthStore } from '@store/authStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@utils/constants'
import { useMediaQuery } from '@hooks/useResponsive'

export default function Header() {
  const { toggleSidebar, darkMode, toggleDarkMode } = useUIStore()
  const { logout } = useAuthStore()
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        {/* Botón sidebar - oculto en móvil */}
        {!isMobile && (
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              data-widget="pushmenu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-bars"></i>
            </button>
          </li>
        )}
        {!isMobile && (
          <li className="nav-item d-none d-sm-inline-block">
            <Link to={ROUTES.HOME} className="nav-link">
              Inicio
            </Link>
          </li>
        )}
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Dark mode toggle */}
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
          </button>
        </li>

        {/* User menu - simplificado en móvil */}
        {!isMobile && (
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#" role="button">
              <img
                src={'/src/assets/img/user5-128x128.jpg'}
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
        )}

        {/* Botón logout directo en móvil */}
        {isMobile && (
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={logout}
              aria-label="Cerrar sesión"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
