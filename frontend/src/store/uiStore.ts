import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIStore {
  sidebarCollapsed: boolean
  darkMode: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleDarkMode: () => void
}

export const useUIStore = create<UIStore>()(
  devtools(set => ({
    sidebarCollapsed: false,
    darkMode: false,

    toggleSidebar: () =>
      set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }), false, 'ui/toggleSidebar'),

    setSidebarCollapsed: (collapsed: boolean) =>
      set({ sidebarCollapsed: collapsed }, false, 'ui/setSidebarCollapsed'),

    toggleDarkMode: () =>
      set(state => ({ darkMode: !state.darkMode }), false, 'ui/toggleDarkMode'),
  }))
)
