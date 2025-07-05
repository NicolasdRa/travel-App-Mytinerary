import { httpGet, httpPost, uploadFile, withAuth } from './http.utils'
import { API_ENDPOINTS } from '../config'
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  User,
  ApiResponse,
  ApiFunction,
  ApiWithData
} from './api.types'

// Auth-specific response types
export interface LoginResponse extends AuthResponse {}
export interface SignupResponse extends AuthResponse {}
export interface LogoutResponse {
  status: 'success'
  message: string
}

export interface ForgotPasswordResponse {
  status: 'success'
  message: string
}

export interface ResetPasswordResponse {
  status: 'success'
  message: string
  data: User
}

// Core authentication functions
export const login: ApiWithData<LoginCredentials, LoginResponse> = async (credentials) => {
  return httpPost<LoginResponse>(API_ENDPOINTS.auth.login, credentials)
}

export const signup: ApiWithData<SignupData, SignupResponse> = async (userData) => {
  return httpPost<SignupResponse>(API_ENDPOINTS.auth.signup, userData)
}

export const logout: ApiFunction<void, LogoutResponse> = async () => {
  return httpPost<LogoutResponse>(API_ENDPOINTS.auth.logout)
}

export const getCurrentUser: ApiFunction<void, ApiResponse<User>> = async () => {
  return httpGet<ApiResponse<User>>(API_ENDPOINTS.auth.me)
}

// Password management functions
export const forgotPassword: ApiWithData<{ email: string }, ForgotPasswordResponse> = async (data) => {
  return httpPost<ForgotPasswordResponse>(API_ENDPOINTS.auth.forgotPassword, data)
}

export const resetPassword: ApiWithData<FormData, ResetPasswordResponse> = async (formData) => {
  return uploadFile<ResetPasswordResponse>(API_ENDPOINTS.auth.resetPassword, formData)
}

// OAuth functions
export const getGoogleAuthUrl = (): string => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'
  return `${baseUrl}/api/v1${API_ENDPOINTS.auth.google}`
}

// Enhanced auth functions with error handling
export const safeLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await login(credentials)
    
    // Store token if needed (depending on your auth strategy)
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }
    
    return response
  } catch (error: any) {
    // Transform specific auth errors
    if (error.status === 401) {
      throw {
        ...error,
        message: 'Invalid email or password'
      }
    }
    throw error
  }
}

export const safeSignup = async (userData: SignupData): Promise<SignupResponse> => {
  try {
    // Validate password confirmation on client side
    if (userData.password !== userData.passwordConfirm) {
      throw {
        message: 'Passwords do not match',
        status: 400,
        code: 'PASSWORD_MISMATCH'
      }
    }
    
    const response = await signup(userData)
    
    // Store token if needed
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }
    
    return response
  } catch (error: any) {
    // Transform specific signup errors
    if (error.status === 409) {
      throw {
        ...error,
        message: 'Email already exists'
      }
    }
    throw error
  }
}

export const safeLogout = async (): Promise<void> => {
  try {
    await logout()
  } catch (error) {
    // Even if logout fails on server, clear local storage
    console.warn('Logout failed on server, but clearing local auth data')
  } finally {
    // Always clear local auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('lastPath')
  }
}

// Token management functions
export const getStoredToken = (): string | null => {
  return localStorage.getItem('authToken')
}

export const isTokenValid = (): boolean => {
  const token = getStoredToken()
  if (!token) return false
  
  try {
    // Basic JWT validation (decode without verification)
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    
    return payload.exp > currentTime
  } catch {
    return false
  }
}

export const clearAuthData = (): void => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('lastPath')
}

// User profile functions (auth-related)
export const refreshCurrentUser = async (): Promise<User> => {
  const response = await getCurrentUser()
  return response.data
}

export const validateSession = async (): Promise<boolean> => {
  try {
    await getCurrentUser()
    return true
  } catch {
    clearAuthData()
    return false
  }
}

// Composable auth functions
export const withAuthValidation = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    if (!isTokenValid()) {
      throw {
        message: 'Session expired. Please login again.',
        status: 401,
        code: 'SESSION_EXPIRED'
      }
    }
    
    try {
      return await fn(...args)
    } catch (error: any) {
      if (error.status === 401) {
        clearAuthData()
        throw {
          ...error,
          message: 'Session expired. Please login again.',
          code: 'SESSION_EXPIRED'
        }
      }
      throw error
    }
  }
}

export const withRetryOnAuthFailure = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  maxRetries: number = 1
) => {
  return async (...args: T): Promise<R> => {
    let lastError: any
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn(...args)
      } catch (error: any) {
        lastError = error
        
        if (error.status === 401 && i < maxRetries) {
          // Try to refresh session
          try {
            await refreshCurrentUser()
            continue
          } catch {
            clearAuthData()
            break
          }
        }
        
        if (i === maxRetries) break
      }
    }
    
    throw lastError
  }
}

// Auth utilities object for easier importing
export const authApi = {
  login: safeLogin,
  signup: safeSignup,
  logout: safeLogout,
  getCurrentUser: refreshCurrentUser,
  forgotPassword,
  resetPassword,
  validateSession,
  isTokenValid,
  clearAuthData,
  getGoogleAuthUrl
} as const

// Default export for backward compatibility
export default authApi