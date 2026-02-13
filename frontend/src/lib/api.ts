// API Service - All communication with backend
// Replace BASE_URL with your actual backend URL

const BASE_URL = '/api'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Include cookies for auth
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new ApiError(response.status, error.message || 'Request failed')
  }

  return response.json()
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (email: string, password: string, name: string) =>
    request('/auth/register', { method: 'POST', body: { email, password, name } }),
  
  logout: () => request('/auth/logout', { method: 'POST' }),
  
  me: () => request('/auth/me'),
}

// Exercises API
export const exercisesApi = {
  list: (params?: { type?: string; difficulty?: string; status?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.set('type', params.type)
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty)
    if (params?.status) searchParams.set('status', params.status)
    const query = searchParams.toString()
    return request(`/exercises${query ? `?${query}` : ''}`)
  },
  
  get: (id: string) => request(`/exercises/${id}`),
  
  submitStep: (exerciseId: string, stepIndex: number, answer: string) =>
    request(`/exercises/${exerciseId}/steps/${stepIndex}`, {
      method: 'POST',
      body: { answer },
    }),
  
  getResult: (exerciseId: string) => request(`/exercises/${exerciseId}/result`),
}

// Progress API
export const progressApi = {
  get: () => request('/progress'),
  
  getWeakAreas: () => request('/progress/weak-areas'),
  
  getHistory: () => request('/progress/history'),
}

// Admin API
export const adminApi = {
  // Dashboard
  getStats: () => request('/admin/stats'),
  
  // Exercises
  listExercises: (params?: { type?: string; difficulty?: string; status?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.set('type', params.type)
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty)
    if (params?.status) searchParams.set('status', params.status)
    const query = searchParams.toString()
    return request(`/admin/exercises${query ? `?${query}` : ''}`)
  },
  
  getExercise: (id: string) => request(`/admin/exercises/${id}`),
  
  createExercise: (data: unknown) =>
    request('/admin/exercises', { method: 'POST', body: data }),
  
  updateExercise: (id: string, data: unknown) =>
    request(`/admin/exercises/${id}`, { method: 'PUT', body: data }),
  
  deleteExercise: (id: string) =>
    request(`/admin/exercises/${id}`, { method: 'DELETE' }),
  
  // Users
  listUsers: () => request('/admin/users'),
  
  getUser: (id: string) => request(`/admin/users/${id}`),
  
  disableUser: (id: string) =>
    request(`/admin/users/${id}/disable`, { method: 'POST' }),
  
  enableUser: (id: string) =>
    request(`/admin/users/${id}/enable`, { method: 'POST' }),
  
  resetUserProgress: (id: string) =>
    request(`/admin/users/${id}/reset-progress`, { method: 'POST' }),
}

export { ApiError }
