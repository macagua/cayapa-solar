import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UIStore {
  sidebarCollapsed: boolean
  darkMode: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleDarkMode: () => void
  setDarkMode: (darkMode: boolean) => void
}

// Aplicar dark mode al body
const applyDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      set => ({
        sidebarCollapsed: false,
        darkMode: false,

        toggleSidebar: () =>
          set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }), false, 'ui/toggleSidebar'),

        setSidebarCollapsed: (collapsed: boolean) =>
          set({ sidebarCollapsed: collapsed }, false, 'ui/setSidebarCollapsed'),

        toggleDarkMode: () =>
          set(
            state => {
              const newDarkMode = !state.darkMode
              applyDarkMode(newDarkMode)
              return { darkMode: newDarkMode }
            },
            false,
            'ui/toggleDarkMode'
          ),

        setDarkMode: (darkMode: boolean) => {
          applyDarkMode(darkMode)
          set({ darkMode }, false, 'ui/setDarkMode')
        },
      }),
      {
        name: 'ui-storage',
        onRehydrateStorage: () => state => {
          // Aplicar dark mode al cargar desde localStorage
          if (state?.darkMode) {
            applyDarkMode(true)
          }
        },
      }
    )
  )
)
