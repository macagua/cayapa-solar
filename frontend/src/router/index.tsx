import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import MainLayout from '@layouts/MainLayout'
import LoadingSpinner from '@components/LoadingSpinner'
import { ROUTES } from '@utils/constants'

// Lazy loading de páginas para code splitting
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Login = lazy(() => import('@pages/Login'))
const Placas = lazy(() => import('@pages/Placas'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Componente de ruta protegida
interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}

// Componente de ruta pública (solo accesible si NO está autenticado)
function PublicRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <>{children}</>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Rutas públicas */}
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.PLACAS}
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Placas />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
