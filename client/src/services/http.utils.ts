import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_CONFIG } from '../config'

// Enhanced request configuration type
export interface RequestConfig extends AxiosRequestConfig {
  url: string
  skipInterceptors?: boolean
}

// Generic response type for better type inference
export interface HttpResponse<T = any> {
  data: T
  status: number
  message?: string
}

// Error response type for HTTP utilities
export interface HttpError {
  message: string
  status?: number
  code?: string
  errors?: Record<string, string[]>
}

// Create a configured axios instance
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: `${API_CONFIG.baseUrl}/api/${API_CONFIG.apiVersion}`,
    timeout: API_CONFIG.timeout,
    withCredentials: API_CONFIG.withCredentials,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor for debugging and auth
  client.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 API Request:', config.method?.toUpperCase(), config.url)
      }
      return config
    },
    (error) => {
      console.error('❌ API Request Error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling and data transformation
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ API Response:', response.status, response.config.url)
      }
      return response
    },
    (error) => {
      const httpError: HttpError = {
        message: error.response?.data?.message || error.message || 'Unknown error occurred',
        status: error.response?.status,
        code: error.response?.data?.code || error.code,
        errors: error.response?.data?.errors
      }
      
      console.error('❌ API Response Error:', httpError.status, httpError.message)
      
      // Transform error for consistent handling
      return Promise.reject(httpError)
    }
  )

  return client
}

// Global API client instance
export const apiClient = createApiClient()

// Core HTTP utility function with enhanced type safety
export const makeRequest = async <T = any>(
  config: RequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.request<T>(config)
    return response.data
  } catch (error) {
    // Re-throw with consistent error structure
    throw error as HttpError
  }
}

// HTTP method shortcuts with better type inference
export const httpGet = <T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<T> =>
  makeRequest<T>({ ...config, url, method: 'GET' })

export const httpPost = <T = any>(
  url: string, 
  data?: any, 
  config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
): Promise<T> =>
  makeRequest<T>({ ...config, url, method: 'POST', data })

export const httpPut = <T = any>(
  url: string, 
  data?: any, 
  config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
): Promise<T> =>
  makeRequest<T>({ ...config, url, method: 'PUT', data })

export const httpPatch = <T = any>(
  url: string, 
  data?: any, 
  config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
): Promise<T> =>
  makeRequest<T>({ ...config, url, method: 'PATCH', data })

export const httpDelete = <T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<T> =>
  makeRequest<T>({ ...config, url, method: 'DELETE' })

// Specialized utilities for common patterns
export const uploadFile = <T = any>(
  url: string, 
  formData: FormData, 
  config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
): Promise<T> =>
  makeRequest<T>({
    ...config,
    url,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })

// Request composition utilities
export const withAuth = (config: RequestConfig): RequestConfig => ({
  ...config,
  withCredentials: true
})

export const withTimeout = (timeout: number) => 
  (config: RequestConfig): RequestConfig => ({
    ...config,
    timeout
  })

export const withRetry = (retries: number = 3) => 
  async <T>(requestFn: () => Promise<T>): Promise<T> => {
    let lastError: any
    
    for (let i = 0; i <= retries; i++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error
        if (i === retries) break
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
    
    throw lastError
  }

// Response transformation utilities
export const extractData = <T>(response: { data: T }): T => response.data

export const transformResponse = <T, U>(
  transformer: (data: T) => U
) => 
  (response: T): U => transformer(response)

// Error handling utilities
export const isApiError = (error: any): error is HttpError => {
  return error && typeof error.message === 'string'
}

export const handleApiError = (error: any): never => {
  if (isApiError(error)) {
    throw error
  }
  
  throw {
    message: 'An unexpected error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR'
  } as HttpError
}