import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User, AuthState } from '../types'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: (user: User) =>
          set({ user, isAuthenticated: true, error: null }, false, 'auth/login'),

        logout: () =>
          set({ user: null, isAuthenticated: false, error: null }, false, 'auth/logout'),

        setLoading: (isLoading: boolean) => set({ isLoading }, false, 'auth/setLoading'),

        setError: (error: string | null) => set({ error }, false, 'auth/setError'),
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
)
