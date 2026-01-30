'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Check authentication status with backend API
    // Example: GET /api/auth/me
    const checkAuth = async () => {
      try {
        // const response = await api.get('/auth/me')
        // setUser(response.data.user)
        setIsLoading(false)
      } catch {
        setUser(null)
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (_email: string, _password: string) => {
    // TODO: Implement with backend API
    // Example: POST /api/auth/login
    // const response = await api.post('/auth/login', { email, password })
    // setUser(response.data.user)
    throw new Error('Backend not implemented')
  }

  const register = async (_email: string, _password: string, _name: string) => {
    // TODO: Implement with backend API
    // Example: POST /api/auth/register
    // const response = await api.post('/auth/register', { email, password, name })
    // setUser(response.data.user)
    throw new Error('Backend not implemented')
  }

  const logout = () => {
    // TODO: Implement with backend API
    // Example: POST /api/auth/logout
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
