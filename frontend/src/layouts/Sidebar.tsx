import { Link, useLocation } from 'react-router-dom'
import type { NavigationItem } from '../types'
import { cn } from '@utils/helpers'
import { ROUTES } from '@utils/constants'

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-tachometer-alt',
    path: ROUTES.HOME,
  },
  {
    id: 'total-placas',
    label: 'Total Placas',
    icon: 'fa-solar-panel',
    path: ROUTES.PLACAS,
  },
//   {
//     id: 'solar-panels',
//     label: 'Gestión Placas',
//     icon: 'fa-sliders-h',
//     children: [
//       { id: 'panels-list', label: 'Lista de Placas', icon: 'fa-list', path: '/placas' },
//       { id: 'panels-map', label: 'Mapa', icon: 'fa-map-marked-alt', path: '/panels/map' },
//       { id: 'panels-analytics', label: 'Analíticas', icon: 'fa-chart-line', path: '/panels/analytics' },
//     ],
//   },
//   {
//     id: 'investments',
//     label: 'Inversiones',
//     icon: 'fa-coins',
//     path: '/investments',
//     badge: {
//       text: 'Nuevo',
//       variant: 'success',
//     },
//   },
//   {
//     id: 'users',
//     label: 'Usuarios',
//     icon: 'fa-users',
//     path: '/users',
//   },
//   {
//     id: 'settings',
//     label: 'Configuración',
//     icon: 'fa-cog',
//     path: '/settings',
//   },
]

export default function Sidebar() {
  const location = useLocation()

  const renderNavItem = (item: NavigationItem) => {
    const isActive = item.path === location.pathname
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <li key={item.id} className="nav-item has-treeview">
          <a href="#" className="nav-link">
            <i className={cn('nav-icon fas', item.icon)}></i>
            <p>
              {item.label}
              <i className="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul className="nav nav-treeview">
            {item.children?.map((child: NavigationItem) => (
              <li key={child.id} className="nav-item">
                <Link
                  to={child.path || '#'}
                  className={cn('nav-link', child.path === location.pathname && 'active')}
                >
                  <i className={cn('far fa-circle nav-icon', child.icon)}></i>
                  <p>{child.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )
    }

    return (
      <li key={item.id} className="nav-item">
        <Link to={item.path || '#'} className={cn('nav-link', isActive && 'active')}>
          <i className={cn('nav-icon fas', item.icon)}></i>
          <p>
            {item.label}
            {item.badge && (
              <span className={cn('right badge', `badge-${item.badge.variant}`)}>
                {item.badge.text}
              </span>
            )}
          </p>
        </Link>
      </li>
    )
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to={ROUTES.HOME} className="brand-link">
        <img
          src="/logo.png"
          alt="Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
          onError={e => {
            e.currentTarget.src = '/src/assets/img/energy.png'
          }}
        />
        <span className="brand-text font-weight-light">Cayapa Solar</span>
      </Link>

      {/* Sidebar */}
      <div className="sidebar">
        {/* User Panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/src/assets/img/user5-128x128.jpg"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Usuario Admin
            </a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {navigationItems.map(renderNavItem)}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
