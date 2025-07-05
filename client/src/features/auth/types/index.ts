// Auth-specific types
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData extends LoginCredentials {
  userName: string
  passwordConfirm: string
  firstName?: string
  lastName?: string
}

export interface AuthState {
  loading: 'idle' | 'pending' | 'done' | 'fail'
  isAuthenticated: boolean
  userId: string | null
  error: string | null
}

export interface AuthResponse {
  _id: string
  email: string
  userName: string
  token?: string
}

export interface AuthError {
  message: string
  statusCode?: number
}