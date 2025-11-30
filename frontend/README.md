# Cayapa Solar - Panel de Administración

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

## 🛠️ Instalación

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- **Backend de Cayapa Solar** ejecutándose en `http://localhost:3001`

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
VITE_APP_TITLE=Cayapa Solar Admin
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

## 🎯 Mejores Prácticas Implementadas (2025)

### 1. **Arquitectura Moderna**
- Separación clara de responsabilidades (componentes, hooks, servicios)
- Lazy loading para optimización de bundle size
- Code splitting automático con Vite

### 2. **TypeScript Strict Mode**
- Type safety completo en toda la aplicación
- Interfaces bien definidas para datos
- No uso de `any` sin justificación

### 3. **State Management Moderno**
- Zustand en lugar de Redux (más ligero y simple)
- React Query para estado del servidor
- Persistencia automática de estado de autenticación

### 4. **Optimización de Rendimiento**
- Lazy loading de rutas
- Memoización cuando es necesario
- Code splitting por chunks
- Build optimizado con Vite

### 5. **Accesibilidad (a11y)**
- Semantic HTML
- ARIA labels apropiados
- Navegación por teclado
- Contraste de colores adecuado

### 6. **SEO y PWA Ready**
- Meta tags apropiados
- Estructura semántica
- Preparado para convertir a PWA

### 7. **Developer Experience**
- Hot Module Replacement (HMR) ultrarrápido
- ESLint + Prettier configurados
- Path aliases (@components, @pages, etc.)
- TypeScript con autocompletado completo

### 8. **Testing Ready**
- Estructura preparada para tests unitarios
- Componentes aislados y testeables
- Hooks personalizados reutilizables

## 🔐 Autenticación

El sistema incluye:
- Login con persistencia de sesión
- Rutas protegidas
- Logout automático al expirar token
- Interceptores de Axios para manejo de tokens

## 🎨 Personalización

### Cambiar colores

Edita las variables en `src/styles/main.scss`:

```scss
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  // ... más colores
}
```

### Agregar nuevas rutas

1. Crea el componente de página en `src/pages/`
2. Agrega la ruta en `src/router/index.tsx`
3. Actualiza el menú en `src/layouts/Sidebar.tsx`

## 📚 Tecnologías y Librerías

- **React 18.3** - Framework UI
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool
- **React Router 6.26** - Routing
- **Zustand 4.5** - State management
- **TanStack Query 5.56** - Server state
- **Axios 1.7** - HTTP client
- **AdminLTE 3.2** - UI Framework
- **date-fns 3.6** - Utilidades de fechas
- **clsx 2.1** - Utility classes

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

Desarrollado por el equipo de Cayapa Solar

## 🐛 Reportar Issues

Si encuentras algún bug o tienes sugerencias, por favor abre un issue en el repositorio.

---

**Construido con ❤️ usando las mejores prácticas de desarrollo frontend 2025**
