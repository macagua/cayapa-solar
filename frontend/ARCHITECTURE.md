# 📊 Arquitectura del Proyecto

## 🎯 Visión General

Cayapa Solar Admin Panel es una aplicación web moderna construida con React, TypeScript y Vite, siguiendo las mejores prácticas de desarrollo frontend 2025.

## 🏗️ Estructura de Carpetas

```
frontend/
│
├── 📁 .vscode/                    # Configuración VS Code
│   ├── extensions.json            # Extensiones recomendadas
│   └── settings.json              # Settings del editor
│
├── 📁 src/                        # Código fuente
│   │
│   ├── 📁 assets/                 # Recursos estáticos
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── 📁 components/             # Componentes reutilizables
│   │   ├── Card.tsx               # Componente de tarjeta genérica
│   │   ├── StatsCard.tsx          # Tarjeta de estadísticas
│   │   ├── Breadcrumb.tsx         # Breadcrumb de navegación
│   │   ├── LoadingSpinner.tsx     # Spinner de carga
│   │   ├── SolarMap.tsx           # Mapa de paneles solares
│   │   └── index.ts               # Barrel export
│   │
│   ├── 📁 hooks/                  # Custom React Hooks
│   │   ├── useAsync.ts            # Hook para operaciones asíncronas genéricas
│   │   ├── useResponsive.ts       # Hooks responsive (useWindowSize, useMediaQuery)
│   │   ├── useEnergyData.ts       # Hooks especializados (useEnergyData, useDeviceEnergyData)
│   │   └── index.ts
│   │
│   ├── 📁 layouts/                # Componentes de layout
│   │   ├── MainLayout.tsx         # Layout principal
│   │   ├── Header.tsx             # Cabecera
│   │   ├── Sidebar.tsx            # Menú lateral
│   │   └── Footer.tsx             # Pie de página
│   │
│   ├── 📁 pages/                  # Páginas de la app
│   │   ├── Dashboard.tsx          # Dashboard principal
│   │   ├── Placas.tsx             # Gestión de placas solares
│   │   ├── Login.tsx              # Página de login
│   │   └── NotFound.tsx           # Página 404
│   │
│   ├── 📁 router/                 # Routing
│   │   └── index.tsx              # Configuración de rutas
│   │
│   ├── 📁 services/               # Servicios externos
│   │   ├── api.ts                 # Cliente API base
│   │   ├── auth.ts                # Servicio de autenticación
│   │   └── index.ts
│   │
│   ├── 📁 store/                  # Estado global (Zustand)
│   │   ├── authStore.ts           # Store de autenticación
│   │   ├── uiStore.ts             # Store de UI (darkMode, sidebar)
│   │   └── index.ts
│   │
│   ├── 📁 styles/                 # Estilos globales
│   │   └── main.scss              # Estilos principales
│   │
│   ├── 📁 types/                  # Definiciones TypeScript
│   │   └── index.ts               # Tipos e interfaces
│   │
│   ├── 📁 utils/                  # Utilidades
│   │   ├── helpers.ts             # Funciones helper
│   │   ├── constants.ts           # Constantes
│   │   └── index.ts
│   │
│   ├── App.tsx                    # Componente raíz
│   ├── main.tsx                   # Punto de entrada
│   └── vite-env.d.ts              # Tipos de Vite
│
├── 📄 .env.example                # Ejemplo variables de entorno
├── 📄 .eslintrc.cjs               # Configuración ESLint
├── 📄 .gitignore                  # Archivos ignorados por Git
├── 📄 .prettierrc                 # Configuración Prettier
├── 📄 CHANGELOG.md                # Registro de cambios
├── 📄 CONTRIBUTING.md             # Guía de contribución
├── 📄 index.html                  # HTML principal
├── 📄 package.json                # Dependencias y scripts
├── 📄 QUICKSTART.md               # Guía de inicio rápido
├── 📄 README.md                   # Documentación principal
├── 📄 tsconfig.json               # Configuración TypeScript
├── 📄 tsconfig.node.json          # Config TS para Node
└── 📄 vite.config.ts              # Configuración Vite
```

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Router    │ ◄─── React Router v6 con lazy loading
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Layout    │ ◄─── Header + Sidebar + Footer
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Page     │ ◄─── Dashboard, Login, etc.
└──────┬──────┘
       │
       ├──────► Components (UI)
       │
       ├──────► Hooks (Logic)
       │
       └──────► Store (State)
                   │
                   ├─► Auth Store (Zustand)
                   └─► UI Store (Zustand)
                       │
                       ▼
                   Services
                       │
                       └─► API (Axios)
                           │
                           ▼
                       Backend
```

## 🎨 Patrones de Diseño

### 1. **Container/Presentational Pattern**
- Components: Lógica de presentación
- Pages: Lógica de negocio
- Services: Lógica de datos

### 2. **Custom Hooks Pattern**
- Reutilización de lógica
- Separación de concerns
- Testing más fácil

### 3. **Store Pattern (Zustand)**
- Estado global centralizado
- Subscripciones automáticas
- DevTools integrado

### 4. **Service Pattern**
- Abstracción de API calls
- Interceptors centralizados
- Error handling unificado

## 🔐 Flujo de Autenticación

```
Login
  │
  ├─► authService.login()
  │      │
  │      ├─► API POST /auth/login
  │      │
  │      └─► Guardar token en localStorage
  │
  ├─► authStore.login(user)
  │      │
  │      └─► Actualizar estado global
  │
  └─► Navigate to Dashboard

Protected Route
  │
  ├─► Verificar authStore.isAuthenticated
  │      │
  │      ├─► TRUE  → Renderizar componente
  │      │
  │      └─► FALSE → Redirect a /login
```

## 📦 Gestión de Estado

### Estado Local (useState)
- Estado de formularios
- UI temporal
- Datos de componente específico

### Estado Global (Zustand)
- Autenticación de usuario
- Preferencias de UI
- Datos compartidos entre componentes

### Estado del Servidor (React Query)
- Cache de datos del servidor
- Sincronización automática
- Optimistic updates

## 🚀 Optimizaciones

### Build Time
- Tree shaking automático
- Code splitting por rutas
- Minificación de código
- Compresión de assets

### Runtime
- Lazy loading de componentes
- Memoización selectiva
- Virtual scrolling para listas grandes
- Debouncing de búsquedas

### Network
- HTTP caching
- Request deduplication
- Automatic retries
- Timeout configuration

## 🧪 Testing Strategy

```
Unit Tests
  ├─► Utils y helpers
  ├─► Custom hooks
  └─► Pure components

Integration Tests
  ├─► Stores
  ├─► Services
  └─► Component interactions

E2E Tests
  └─► User flows completos
```

## 📱 Responsive Design

```
Mobile First Approach

Breakpoints:
├─► xs: < 576px   (Mobile)
├─► sm: ≥ 576px   (Mobile landscape)
├─► md: ≥ 768px   (Tablet)
├─► lg: ≥ 992px   (Desktop)
└─► xl: ≥ 1200px  (Large desktop)
```

## 🎯 Próximas Features

- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios
- [ ] Storybook para componentes
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Monitoring y analytics

---

**Última actualización:** 29 de Noviembre, 2025
