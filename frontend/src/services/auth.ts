import type { User } from '../types'
import { apiService } from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials)
    if (response.token) {
      localStorage.setItem('auth-token', response.token)
    }
    return response
  },

  async logout(): Promise<void> {
    await apiService.post('/auth/logout')
    localStorage.removeItem('auth-token')
  },

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/me')
  },

  async refreshToken(): Promise<string> {
    const response = await apiService.post<{ token: string }>('/auth/refresh')
    if (response.token) {
      localStorage.setItem('auth-token', response.token)
    }
    return response.token
  },
}
