// Constantes de la aplicación

export const APP_NAME = 'Madrid Solar'
export const APP_VERSION = '1.0.0'

// API Configuration
export const API_TIMEOUT = 10000 // 10 segundos

// Paginación
// export const DEFAULT_PAGE_SIZE = 10
// export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// Formatos de fecha
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
// export const TIME_FORMAT = 'HH:mm'

// Rutas
export const ROUTES = {
  // Rutas activas
  HOME: '/',
  LOGIN: '/login',
  PLACAS: '/placas',

  // Rutas futuras (roadmap Q1 2026)
  // DASHBOARD: '/dashboard',
  // PANELS: '/panels',
  // PANELS_MAP: '/panels/map',
  // PANELS_ANALYTICS: '/panels/analytics',
  // INVESTMENTS: '/investments',
  // USERS: '/users',
  // SETTINGS: '/settings',
} as const

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const

// Estados de las placas solares
export const PANEL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
} as const

// Colores del tema
export const THEME_COLORS = {
  PRIMARY: '#007bff',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
} as const
