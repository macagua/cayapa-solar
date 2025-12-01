# Madrid Solar - Panel de Administración

Panel de administración moderno construido con React, TypeScript, Vite y AdminLTE siguiendo las mejores prácticas de desarrollo frontend 2025.

## 🚀 Características

- ⚡️ **Vite** - Build tool ultrarrápido para desarrollo moderno
- ⚛️ **React 18** - Última versión con mejoras de rendimiento
- 🔷 **TypeScript** - Type safety y mejor experiencia de desarrollo
- 🎨 **AdminLTE 3** - Framework UI profesional para paneles admin
- 🔄 **React Router v6** - Routing con lazy loading y code splitting
- 📦 **Zustand** - State management ligero y moderno (alternativa a Redux)
- 🔍 **React Query** - Gestión de estado del servidor y caché
- 🎯 **ESLint + Prettier** - Linting y formateo automático
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- ♿️ **Accesibilidad** - Cumplimiento de estándares WCAG
- 🌙 **Dark Mode** - Soporte para modo oscuro

---

## 🎨 Capturas de Pantalla

### Formulario de autenticación - Login

<img src="../docs/madrid_solar_frontend_login.png" alt="Frontend - Formulario de autenticación" width="469" height="420">

---

### Dashboard

#### Vista principal con estadísticas

<img src="../docs/madrid_solar_frontend_dashboard.png" alt="Frontend - Vista principal con estadísticas" width="800" height="487">

---

#### Placas - Mapa interactivo con marcadores

<img src="../docs/madrid_solar_frontend_placas_listado.png" alt="Frontend - Listdo de Placas - Mapa interactivo con marcadores" width="800" height="560">

---

#### Placas - Panel de información de placa seleccionada

<img src="../docs/madrid_solar_frontend_placas.png" alt="Frontend - Listdo de Placas - Panel de información de placa seleccionada" width="800" height="255">

---

#### Placas - Tabla de datos de energía

<img src="../docs/madrid_solar_frontend_placas_historial.png" alt="Frontend - Listdo de Placas - Tabla de datos de energía" width="800" height="609">

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── assets/          # Recursos estáticos (imágenes, fuentes)
│   ├── components/      # Componentes reutilizables
│   │   ├── Card.tsx
│   │   ├── StatsCard.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SolarMap.tsx
│   │   └── index.ts
│   ├── hooks/           # Custom hooks
│   │   ├── useAsync.ts
│   │   ├── useResponsive.ts  # useWindowSize, useMediaQuery
│   │   ├── useEnergyData.ts  # useEnergyData, useDeviceEnergyData
│   │   └── index.ts
│   ├── layouts/         # Componentes de layout
│   │   ├── MainLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Dashboard.tsx
│   │   ├── Placas.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   ├── router/          # Configuración de rutas
│   │   └── index.tsx
│   ├── services/        # Servicios API
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── energy.ts       # Servicio de datos de energía
│   │   └── index.ts
│   ├── store/           # Estado global con Zustand
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   ├── styles/          # Estilos globales
│   │   └── main.scss
│   ├── types/           # Definiciones de TypeScript
│   │   └── index.ts
│   ├── utils/           # Utilidades y helpers
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   └── vite-env.d.ts    # Tipos de Vite
├── .eslintrc.cjs        # Configuración ESLint
├── .prettierrc          # Configuración Prettier
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración TypeScript
├── tsconfig.node.json   # Configuración TypeScript para Node
└── vite.config.ts       # Configuración Vite
```

### Path Aliases Configurados

```typescript
@components -> src/components
@pages      -> src/pages
@layouts    -> src/layouts
@hooks      -> src/hooks
@services   -> src/services
@store      -> src/store
@types      -> src/types
@utils      -> src/utils
@assets     -> src/assets
```

---

## 🛠️ Instalación

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- **Backend de Madrid Solar** ejecutándose en `http://localhost:3001`

### Pasos

1. **Instalar dependencias:**

```bash
cd frontend
npm install
```

2. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Madrid Solar Admin
VITE_BACKEND_URL=http://localhost:3001
```

O copia el ejemplo:

```bash
cp .env.example .env
```

3. **Iniciar el backend (en otra terminal):**

```bash
cd ../backend
npm run dev
# El backend debe estar corriendo en http://localhost:3001
```

4. **Iniciar servidor de desarrollo:**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📜 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Compila para producción
npm run preview      # Preview de la build de producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos TypeScript sin compilar
```

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 📦 Código Fuente Detallado

### Core Application

#### `/src/main.tsx` - Entry Point
Punto de entrada de la aplicación React.

**Componentes clave:**
- **React.StrictMode**: Activa verificaciones adicionales en desarrollo
- **ReactDOM.createRoot**: API moderna de React 18 para rendering concurrente

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

#### `/src/App.tsx` - Application Root
Configuración principal de la aplicación con providers y efectos globales.

**Características:**

1. **React Query Setup:**
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 minutos cache
      retry: 1,                   // 1 reintento en error
      refetchOnWindowFocus: false // No refetch al volver
    }
  }
})
```

2. **Dark Mode Integration:**
- Escucha cambios en `useUIStore`
- Aplica clase `dark-mode` al body automáticamente
- Persistencia en localStorage vía Zustand

3. **AdminLTE Classes:**
- Aplica clases base: `hold-transition`, `sidebar-mini`, `layout-fixed`
- Gestiona clase `sidebar-collapse` dinámicamente

---

### Router System

#### `/src/router/index.tsx` - Routing Configuration
Sistema de rutas con protección de autenticación y lazy loading.

**Componentes:**

1. **ProtectedRoute:**
```tsx
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  return <>{children}</>
}
```

2. **PublicRoute:**
- Redirige a HOME si ya está autenticado
- Usado para página de Login

3. **Lazy Loading:**
```tsx
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Placas = lazy(() => import('@pages/Placas'))
```

**Rutas disponibles:**
- `/` - Dashboard (protegida)
- `/login` - Login (pública)
- `/placas` - Gestión de placas solares (protegida)
- `*` - NotFound (404)

---

### State Management

#### `/src/store/authStore.ts` - Authentication State
Store Zustand para gestión de autenticación con persistencia.

**API:**
```typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
```

**Persistencia:**
- Guarda `user` e `isAuthenticated` en localStorage
- Key: `auth-storage`
- Restauración automática al cargar app

**DevTools:**
- Integración con Redux DevTools
- Actions: `auth/login`, `auth/logout`, etc.

---

#### `/src/store/uiStore.ts` - UI State
Store para estado de interfaz con dark mode y sidebar.

**API:**
```typescript
interface UIStore {
  sidebarCollapsed: boolean
  darkMode: boolean

  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleDarkMode: () => void
  setDarkMode: (darkMode: boolean) => void
}
```

**Dark Mode Integration:**
```typescript
const applyDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}
```

**Persistencia:**
- Key: `ui-storage`
- Hook `onRehydrateStorage`: aplica dark mode al cargar

---

### Services Layer

#### `/src/services/api.ts` - API Client
Cliente Axios configurado con interceptores para autenticación.

**Características:**

1. **Base Configuration:**
```typescript
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
timeout: 10000 // 10 segundos
headers: { 'Content-Type': 'application/json' }
```

2. **Request Interceptor:**
- Añade token de autorización desde localStorage
- Header: `Authorization: Bearer ${token}`

3. **Response Interceptor:**
- Maneja errores 401 (Unauthorized)
- Redirige a `/login` automáticamente
- Limpia token en logout

4. **Methods:**
```typescript
get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
post<T>(url: string, data?: unknown, config?): Promise<T>
put<T>(url: string, data?: unknown, config?): Promise<T>
delete<T>(url: string, config?): Promise<T>
```

---

#### `/src/services/energy.ts` - Energy Service
Servicio para interactuar con endpoints de energía del backend.

**API:**

```typescript
energyService = {
  // GET /api/read
  getEnergyData(): Promise<EnergyDataStored[]>

  // POST /api/store-json
  storeEnergyData(data: {
    device_id: string
    energy: number
    timestamp: number
  }): Promise<{ txid: string; tx_link: string }>

  // Filtro local por device_id
  getEnergyDataByDevice(deviceId: string): Promise<EnergyDataStored[]>
}
```

**Uso:**
```typescript
const data = await energyService.getEnergyData()
const filtered = await energyService.getEnergyDataByDevice('cayapa-001')
```

---

### Custom Hooks

#### `/src/hooks/useEnergyData.ts` - Energy Data Hooks
Hooks para cargar datos de energía con gestión de estado asíncrono.

**1. useEnergyData:**
```typescript
const { energyData, loading, error, refetch } = useEnergyData()
```
- Carga automática al montar componente
- Retorna array de `EnergyDataStored[]`
- Función `refetch()` para recargar

**2. useDeviceEnergyData:**
```typescript
const { energyData, loading, error, refetch } = useDeviceEnergyData('cayapa-001')
```
- Filtra por `device_id` específico
- Re-ejecuta cuando cambia `deviceId`

**Implementación:**
- Usa `useAsync` internamente
- Maneja errores con console.error
- Auto-ejecuta en `useEffect`

---

#### `/src/hooks/useResponsive.ts` - Responsive Hooks
Hooks para diseño responsive y media queries.

**1. useWindowSize:**
```typescript
const { width, height } = useWindowSize()
```
- Escucha eventos `resize`
- Actualiza dimensiones en tiempo real
- Limpia listener al desmontar

**2. useMediaQuery:**
```typescript
const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)')
const isDesktop = useMediaQuery('(min-width: 992px)')
```
- Usa `window.matchMedia()`
- Actualiza al cambiar tamaño de ventana
- Limpia listener automáticamente

**Uso en componentes:**
```tsx
const isMobile = useMediaQuery('(max-width: 767px)')
return (
  <div>
    {isMobile ? <MobileNav /> : <DesktopNav />}
  </div>
)
```

---

#### `/src/hooks/useAsync.ts` - Async State Hook
Hook genérico para gestión de operaciones asíncronas.

**API:**
```typescript
const { data, loading, error, execute } = useAsync<T>()
```

**Estados:**
- `data: T | null` - Datos retornados
- `loading: boolean` - Estado de carga
- `error: Error | null` - Error si ocurre
- `execute: (promise: Promise<T>) => Promise<T>` - Ejecutar operación

**Uso:**
```typescript
const { data, loading, error, execute } = useAsync<User[]>()

useEffect(() => {
  execute(fetchUsers())
}, [])
```

---

### Pages

#### `/src/pages/Dashboard.tsx` - Dashboard Page
Página principal con estadísticas y gráfica de energía.

**Componentes:**

1. **Stats Cards:**
```tsx
const statsData: DashboardStats[] = [
  {
    id: 'total-panels',
    title: 'Total Placas',
    value: '5',
    icon: 'fa-solar-panel',
    color: 'info',
    trend: { value: 12, isPositive: true }
  },
  // ... más stats
]
```

2. **Chart.js Integration:**
```tsx
const chartInstanceRef = useRef<Chart | null>(null)

useEffect(() => {
  if (!chartRef.current) return

  // Destruir instancia anterior
  if (chartInstanceRef.current) {
    chartInstanceRef.current.destroy()
  }

  // Crear nueva gráfica
  chartInstanceRef.current = new Chart(ctx, {
    type: 'line',
    data: { /* ... */ },
    options: { /* ... */ }
  })

  // Cleanup
  return () => {
    chartInstanceRef.current?.destroy()
  }
}, [])
```

3. **Responsive Grid:**
```tsx
const getColumnClass = () => {
  if (width >= 1200) return 'col-xl-3 col-lg-4 col-md-6'
  if (width >= 992) return 'col-lg-4 col-md-6'
  if (width >= 768) return 'col-md-6'
  return 'col-12'
}
```

**Chart Data:**
- Últimos 7 días de producción
- Línea amarilla (#ffc107)
- Tension 0.4 para curvas suaves
- Responsive y altura fija (300px)

---

#### `/src/pages/Placas.tsx` - Solar Panels Page
Gestión de placas solares con mapa interactivo y tabla de datos.

**Características:**

1. **Panel Selection:**
```tsx
const [selectedPanel, setSelectedPanel] = useState<SolarPanel>(solarPanels[0])
```

2. **Energy Data Integration:**
```tsx
const { energyData, loading, error } = useEnergyData()
const selectedPanelData = energyData.filter(
  record => record.device_id === selectedPanel.id
)
```

3. **Leaflet Map:**
```tsx
<SolarMap
  center={selectedPanel.coordinates}
  markers={solarPanels.map(panel => ({
    id: panel.id,
    position: panel.coordinates,
    title: panel.name,
    onClick: () => setSelectedPanel(panel)
  }))}
/>
```

4. **Responsive Table:**
- Mobile: Oculta `Device ID` y `timestamp`
- Desktop: Muestra todas las columnas
- Botón TX Link: "TX" (móvil) vs "Ver TX" (desktop)

5. **Status Badges:**
```tsx
const getStatusBadge = (status: string) => {
  const badges = {
    ACTIVE: 'badge-success',
    INACTIVE: 'badge-danger',
    MAINTENANCE: 'badge-warning'
  }
  // Retorna badge con color apropiado
}
```

6. **Community Tokens:**
```tsx
<p><strong>Token ganados:</strong> 33 🎖️🎖️🎖️</p>
```

7. **Parking Benefit:**
```tsx
{getStatusBadge('BENEFIT')} Se conceden 3 horas de aparcamiento...
```

---

### Layouts

#### `/src/layouts/Header.tsx` - Top Navigation Bar
Barra de navegación superior con botones responsive.

**Características:**

1. **Sidebar Toggle (Desktop):**
```tsx
{!isMobile && (
  <button onClick={toggleSidebar}>
    <i className="fas fa-bars"></i>
  </button>
)}
```

2. **Home Button (Mobile):**
```tsx
{isMobile && (
  <Link to={ROUTES.HOME}>
    <i className="fas fa-home"></i>
  </Link>
)}
```

3. **Dark Mode Toggle:**
```tsx
<button onClick={toggleDarkMode}>
  <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
</button>
```

4. **User Dropdown (Desktop):**
```tsx
{!isMobile && (
  <li className="nav-item dropdown">
    <img src="/src/assets/img/madrd.png" />
    <div className="dropdown-menu">
      <a>Perfil</a>
      <a>Configuración</a>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  </li>
)}
```

5. **Logout Button (Mobile):**
```tsx
{isMobile && (
  <button onClick={logout}>
    <i className="fas fa-sign-out-alt"></i>
  </button>
)}
```

---

#### `/src/layouts/Sidebar.tsx` - Navigation Sidebar
Menú lateral con navegación y items activos.

**Navigation Items:**
```tsx
const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-tachometer-alt',
    path: ROUTES.HOME
  },
  {
    id: 'total-placas',
    label: 'Total Placas',
    icon: 'fa-solar-panel',
    path: ROUTES.PLACAS
  }
]
```

**Active State:**
```tsx
const isActive = item.path === location.pathname
<Link className={cn('nav-link', isActive && 'active')}>
```

**Tree View Support:**
- Detecta `children` en items
- Renderiza sub-menú con `.nav-treeview`
- Iconos con `fa-angle-left` para expandir

---

### Components

#### `/src/components/SolarMap.tsx` - Interactive Map
Componente de mapa con React Leaflet para visualizar placas solares.

**Props:**
```typescript
interface SolarMapProps {
  center?: [number, number]      // [40.4168, -3.7038]
  zoom?: number                  // 11
  markers: MapMarker[]
  height?: string                // '400px'
}

interface MapMarker {
  id: string
  position: [number, number]
  title: string
  description?: string
  onClick?: () => void
}
```

**Características:**

1. **ChangeView Component:**
```tsx
function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}
```
- Centra mapa cuando cambia `center` prop

2. **OpenStreetMap Tiles:**
```tsx
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
```

3. **Interactive Markers:**
```tsx
<Marker
  position={marker.position}
  eventHandlers={{
    click: () => marker.onClick?.()
  }}
>
  <Popup>
    <strong>{marker.title}</strong>
    <span>{marker.description}</span>
  </Popup>
</Marker>
```

---

#### `/src/components/StatsCard.tsx` - Statistics Card
Card para mostrar métricas con tendencias.

**Props:**
```typescript
interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  trend?: {
    value: number
    isPositive: boolean
  }
}
```

**Estructura:**
- Icono grande con fondo de color
- Valor principal (grande)
- Título (pequeño)
- Badge de tendencia opcional (↑/↓)

---

### Utilities

#### `/src/utils/constants.ts` - Application Constants
Constantes centralizadas de la aplicación.

**Rutas:**
```typescript
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PLACAS: '/placas',
  // ... más rutas
} as const
```

**Roles:**
```typescript
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager'
} as const
```

**Panel Status:**
```typescript
export const PANEL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error'
} as const
```

---

#### `/src/utils/helpers.ts` - Helper Functions
Funciones utilitarias reutilizables.

**cn() - Class Names:**
```typescript
cn('nav-link', isActive && 'active')
// Combina clases condicionalmente
```

**formatDate():**
```typescript
formatDate(new Date(), 'dd/MM/yyyy') // "01/12/2025"
```

**formatCurrency():**
```typescript
formatCurrency(50000, 'USD') // "$50,000.00"
```

**debounce():**
```typescript
const debouncedSearch = debounce(searchFunction, 300)
```

---

### Build Configuration

#### `/vite.config.ts` - Vite Configuration
Configuración de Vite con path aliases y optimizaciones.

**Path Aliases:**
```typescript
alias: {
  '@': './src',
  '@components': './src/components',
  '@pages': './src/pages',
  '@layouts': './src/layouts',
  '@hooks': './src/hooks',
  '@services': './src/services',
  '@store': './src/store',
  '@utils': './src/utils',
  '@types': './src/types',
  '@assets': './src/assets'
}
```

**Server:**
```typescript
server: {
  port: 3000,
  open: true  // Abre navegador automáticamente
}
```

**Build Optimization:**
```typescript
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      'query-vendor': ['@tanstack/react-query']
    }
  }
}
```
- Separa vendors en chunks independientes
- Mejor caching en navegador
- Reduce bundle principal

---

## 🎯 Mejores Prácticas Implementadas (2025)

### 1. **Arquitectura Moderna**
- Separación clara de responsabilidades (componentes, hooks, servicios)
- Lazy loading para optimización de bundle size
- Code splitting automático con Vite
- Path aliases para imports limpios

### 2. **TypeScript Strict Mode**
- Type safety completo en toda la aplicación
- Interfaces bien definidas para datos
- No uso de `any` sin justificación
- IntelliSense completo en VSCode

### 3. **State Management Moderno**
- Zustand en lugar de Redux (más ligero y simple)
- React Query para estado del servidor (opcional, preparado)
- Persistencia automática de estado de autenticación
- DevTools integration para debugging

### 4. **Optimización de Rendimiento**
- Lazy loading de rutas con React.lazy()
- Memoización cuando es necesario
- Code splitting por chunks (react-vendor, query-vendor)
- Build optimizado con Vite (~5x más rápido que Webpack)
- HMR (Hot Module Replacement) ultrarrápido

### 5. **Responsive Design**
- Mobile-first approach
- Breakpoints: 767px (mobile), 768px (tablet), 992px (desktop), 1200px (XL)
- Custom hooks `useWindowSize` y `useMediaQuery`
- Componentes adaptativos (Header, Sidebar, Dashboard)
- Touch targets de 44x44px mínimo

### 6. **Accesibilidad (a11y)**
- Semantic HTML (nav, header, main, footer)
- ARIA labels apropiados (`aria-label="Toggle sidebar"`)
- Navegación por teclado funcional
- Contraste de colores adecuado (WCAG AA)
- Focus visible en elementos interactivos

### 7. **SEO y PWA Ready**
- Meta tags apropiados en index.html
- Estructura semántica correcta
- Preparado para convertir a PWA (manifest.json listo)
- Build optimizado para producción

### 8. **Developer Experience**
- Hot Module Replacement (HMR) ultrarrápido
- ESLint + Prettier configurados
- Path aliases (@components, @pages, etc.)
- TypeScript con autocompletado completo
- Scripts npm organizados (dev, build, lint, format)
- Vite dev server con port 3000 fijo

### 9. **Security Best Practices**
- Token almacenado en localStorage (considerar httpOnly cookies para producción)
- Interceptores Axios para manejo centralizado de auth
- Rutas protegidas con ProtectedRoute component
- Logout automático en 401 Unauthorized
- CORS configurado en backend

### 10. **Testing Ready**
- Estructura preparada para tests unitarios
- Componentes aislados y testeables
- Hooks personalizados reutilizables
- Servicios desacoplados de componentes
- TypeScript facilita mocking

## 🔐 Autenticación

### Sistema de Autenticación

El sistema incluye autenticación completa con Zustand y localStorage:

#### 1. **AuthStore (Zustand)**
```typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
```

**Persistencia:**
- Store key: `auth-storage` en localStorage
- Campos persistidos: `user`, `isAuthenticated`
- Restauración automática al cargar app

#### 2. **Protected Routes**
```tsx
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}
```

**Uso:**
```tsx
<Route path="/" element={
  <ProtectedRoute>
    <MainLayout>
      <Dashboard />
    </MainLayout>
  </ProtectedRoute>
} />
```

#### 3. **API Interceptors**
```typescript
// Request Interceptor - Añade token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor - Maneja 401
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

#### 4. **Login Flow**
```tsx
// En componente Login
const handleLogin = async (credentials: LoginCredentials) => {
  try {
    setLoading(true)
    const response = await authService.login(credentials)

    // Guardar token
    localStorage.setItem('auth-token', response.token)

    // Actualizar store
    login({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.user.role
    })

    // Redirigir a dashboard
    navigate(ROUTES.HOME)
  } catch (err) {
    setError('Credenciales inválidas')
  } finally {
    setLoading(false)
  }
}
```

#### 5. **Logout Flow**
```tsx
const handleLogout = () => {
  // Limpiar token
  localStorage.removeItem('auth-token')

  // Actualizar store
  logout()

  // Redirigir a login
  navigate(ROUTES.LOGIN)
}
```

#### 6. **Session Persistence**
- Token guardado en localStorage
- Restauración automática al recargar página
- Expiración manejada por backend (JWT)
- Logout automático en token inválido (401)

### Seguridad

**Implementado:**
- ✅ Token-based authentication
- ✅ Protected routes
- ✅ Auto-logout en 401
- ✅ Persistencia en localStorage

**Recomendado para producción:**
- 🔵 HttpOnly cookies en lugar de localStorage
- 🔵 CSRF tokens
- 🔵 Refresh tokens
- 🔵 Token rotation
- 🔵 Rate limiting en login

## 🎨 Personalización

### Cambiar colores del tema

Edita las variables SCSS en `src/styles/main.scss`:

```scss
:root {
  // Colores principales
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;

  // Colores de fondo
  --bg-light: #f4f6f9;
  --bg-dark: #1a1a1a;

  // Texto
  --text-primary: #212529;
  --text-secondary: #6c757d;
}

// Dark mode
.dark-mode {
  --bg-light: #1a1a1a;
  --bg-dark: #121212;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
}
```

### Agregar nuevas rutas

**1. Crear componente de página:**
```bash
# En src/pages/
touch src/pages/MyNewPage.tsx
```

```tsx
// src/pages/MyNewPage.tsx
export default function MyNewPage() {
  return (
    <>
      <div className="content-header">
        <h1>Mi Nueva Página</h1>
      </div>
      <div className="content">
        {/* Contenido aquí */}
      </div>
    </>
  )
}
```

**2. Agregar constante de ruta:**
```typescript
// src/utils/constants.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PLACAS: '/placas',
  MY_NEW_PAGE: '/my-new-page', // ← Nueva ruta
} as const
```

**3. Registrar ruta en router:**
```tsx
// src/router/index.tsx
import MyNewPage from '@pages/MyNewPage'

<Route
  path={ROUTES.MY_NEW_PAGE}
  element={
    <ProtectedRoute>
      <MainLayout>
        <MyNewPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>
```

**4. Actualizar menú sidebar:**
```tsx
// src/layouts/Sidebar.tsx
const navigationItems: NavigationItem[] = [
  // ... items existentes
  {
    id: 'my-new-page',
    label: 'Mi Nueva Página',
    icon: 'fa-star',
    path: ROUTES.MY_NEW_PAGE,
  },
]
```

### Agregar nuevos componentes

**1. Crear componente:**
```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
  onAction?: () => void
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="my-component">
      <h3>{title}</h3>
      {onAction && (
        <button onClick={onAction}>Acción</button>
      )}
    </div>
  )
}
```

**2. Exportar en index:**
```typescript
// src/components/index.ts
export { default as MyComponent } from './MyComponent'
```

**3. Usar en páginas:**
```tsx
import { MyComponent } from '@components'

<MyComponent title="Hola" onAction={() => alert('Click')} />
```

### Crear custom hooks

**1. Crear hook:**
```typescript
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react'

export function useMyHook(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    console.log('Value changed:', value)
  }, [value])

  return { value, setValue }
}
```

**2. Exportar:**
```typescript
// src/hooks/index.ts
export * from './useMyHook'
```

**3. Usar:**
```tsx
import { useMyHook } from '@hooks'

const { value, setValue } = useMyHook('inicial')
```

### Modificar estilos responsive

Edita breakpoints en `src/styles/main.scss`:

```scss
// Mobile
@media (max-width: 767px) {
  .container-fluid {
    padding: 0.5rem;
  }

  .card {
    margin-bottom: 0.5rem;
  }
}

// Tablet
@media (min-width: 768px) and (max-width: 991px) {
  .container-fluid {
    padding: 1rem;
  }
}

// Desktop
@media (min-width: 992px) {
  .container-fluid {
    padding: 1.5rem;
  }
}
```

### Configurar API base URL

Edita `.env`:

```env
# Development
VITE_API_BASE_URL=http://localhost:3001/api

# Production
# VITE_API_BASE_URL=https://api.cayapa-solar.com/api
```

**Acceso en código:**
```typescript
const API_URL = import.meta.env.VITE_API_BASE_URL
```

### Agregar nuevos servicios

**1. Crear servicio:**
```typescript
// src/services/myService.ts
import { apiService } from './api'

export const myService = {
  async getData(): Promise<MyData[]> {
    return apiService.get<MyData[]>('/my-endpoint')
  },

  async postData(data: MyData): Promise<void> {
    return apiService.post('/my-endpoint', data)
  }
}
```

**2. Exportar:**
```typescript
// src/services/index.ts
export * from './myService'
```

**3. Usar:**
```tsx
import { myService } from '@services'

const data = await myService.getData()
```

---

## 📚 Tecnologías y Librerías

### Core Framework
- **React 18.3.1** - Framework UI con rendering concurrente
- **TypeScript 5.5.4** - Type safety y mejor DX
- **Vite 5.4.6** - Build tool ultrarrápido (~5x Webpack)

### Routing & Navigation
- **React Router 6.26.0** - Routing declarativo con lazy loading
- Path-based routing con protección de autenticación

### State Management
- **Zustand 4.5.5** - State management minimalista (3kb)
  - Alternativa moderna a Redux
  - API simple basada en hooks
  - DevTools integration
  - Middleware: `persist`, `devtools`
- **TanStack Query 5.56.2** - Server state management
  - Cache automático
  - Refetch inteligente
  - Optimistic updates ready

### HTTP Client
- **Axios 1.7.7** - Cliente HTTP con interceptores
  - Request/Response interceptors
  - Timeout configuration
  - Auto-retry on failure
  - Token injection automático

### UI Framework & Styling
- **AdminLTE 3.2.0** - Template administrativo profesional
  - Dashboard components
  - Responsive layouts
  - Dark mode support
- **Sass 1.79.3** - Preprocesador CSS
  - Variables y mixins
  - Nested selectors
  - Modularización

### Data Visualization
- **Chart.js 4.5.1** - Gráficas interactivas
  - Line, bar, pie charts
  - Responsive design
  - Animation support
  - Canvas-based rendering

### Maps
- **Leaflet 1.9.4** - Mapas interactivos
  - OpenStreetMap integration
  - Custom markers
  - Popups y tooltips
- **React Leaflet 4.2.1** - React bindings para Leaflet
  - Componentes declarativos
  - Hooks para map instances

### Utilities
- **date-fns 3.6.0** - Manipulación de fechas
  - Lightweight (< 50kb)
  - Tree-shakeable
  - TypeScript types incluidos
- **clsx 2.1.1** - Utility para class names
  - Conditional classes
  - String concatenation

### Development Tools
- **ESLint 8.57.0** - Linter JavaScript/TypeScript
  - Plugin: react-hooks
  - Plugin: react-refresh
  - Config: prettier integration
- **Prettier 3.3.3** - Code formatter
  - Auto-format on save
  - Consistent style
- **TypeScript 5.5.4** - Type checker
  - Strict mode enabled
  - Path aliases support
- **@vitejs/plugin-react-swc 3.7.0** - Vite plugin con SWC
  - ~20x faster than Babel
  - Fast Refresh support

### Build Optimization
```json
{
  "rollupOptions": {
    "output": {
      "manualChunks": {
        "react-vendor": ["react", "react-dom", "react-router-dom"],
        "query-vendor": ["@tanstack/react-query"]
      }
    }
  }
}
```

### Bundle Size Analysis
- React vendor: ~150KB (gzipped)
- Query vendor: ~40KB (gzipped)
- App code: ~80KB (gzipped)
- **Total inicial**: ~270KB (excelente para SPA moderna)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar problemas o sugerencias, consulta los archivos:
- `frontend/TESTING.md` - Guía de pruebas
- `frontend/IMPLEMENTATION_SUMMARY.md` - Detalles técnicos

## 🐛 Reportar Issues

Si encuentras algún bug o tienes sugerencias, por favor abre un issue en el repositorio.

---

## 👥 Equipo Cayapa

Proyecto desarrollado para **Hackathon 2025 - M Merge**

- [Alejandro Sanchez](https://www.linkedin.com/in/alejandrocarracedo/)
- [Álvaro Rubén Hurtado Maldonado](https://www.linkedin.com/in/alvarohurtadobo/), [@alvarohurtadobo](https://github.com/alvarohurtadobo)
- [Victor Bague](https://www.linkedin.com/in/victorbague/), [@VictorBagueUAX](https://github.com/VictorBagueUAX)
- [Manuel Jesús Rojas Villanueva](https://www.linkedin.com/in/manuelrojasvillanueva/), [@texaco](https://github.com/texaco)
- [Leonardo J. Caballero G.](https://www.linkedin.com/in/leonardojcaballerog/), [@macagua](https://github.com/macagua)

<img src="../docs/mmerge_web3_hackathon_2025.jpeg" alt="MMERGE Web3 Hackathon 2025" width="800" height="450">

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE.md).

---

**Construido con ❤️ usando las mejores prácticas de desarrollo frontend 2025**
