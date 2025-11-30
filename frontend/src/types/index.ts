export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'manager'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
  path?: string
  children?: NavigationItem[]
  badge?: {
    text: string
    variant: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }
}

export interface DashboardStats {
  id: string
  title: string
  value: string | number
  icon: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  trend?: {
    value: number
    isPositive: boolean
  }
}
