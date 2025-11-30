import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import AppRouter from './router'
import { useUIStore } from '@store/uiStore'
import './styles/main.scss'

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const darkMode = useUIStore(state => state.darkMode)
  const sidebarCollapsed = useUIStore(state => state.sidebarCollapsed)

  // Aplicar dark mode al body cuando cambie el estado
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Aplicar clase sidebar-collapse al body cuando el sidebar esté colapsado
  useEffect(() => {
    // Agregar clases base de AdminLTE
    document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed')

    if (sidebarCollapsed) {
      document.body.classList.add('sidebar-collapse')
    } else {
      document.body.classList.remove('sidebar-collapse')
    }
  }, [sidebarCollapsed])

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
