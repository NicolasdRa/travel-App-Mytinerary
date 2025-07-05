import { STORAGE_KEYS } from '../config'

// Local Storage utilities
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// JSON storage utilities
export const jsonStorage = {
  get: <T>(key: string): T | null => {
    const item = storage.get(key)
    if (!item) return null
    
    try {
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error)
      return null
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      storage.set(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error stringifying JSON to localStorage:', error)
    }
  }
}

// Auth token utilities
export const authStorage = {
  getToken: (): string | null => storage.get(STORAGE_KEYS.authToken),
  setToken: (token: string): void => storage.set(STORAGE_KEYS.authToken, token),
  removeToken: (): void => storage.remove(STORAGE_KEYS.authToken),
  hasToken: (): boolean => !!storage.get(STORAGE_KEYS.authToken)
}

// Path storage utilities
export const pathStorage = {
  getLastPath: (): string | null => storage.get(STORAGE_KEYS.lastPath),
  setLastPath: (path: string): void => storage.set(STORAGE_KEYS.lastPath, path),
  removeLastPath: (): void => storage.remove(STORAGE_KEYS.lastPath)
}