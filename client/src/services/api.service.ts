import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../config'

// Create a configured axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: `${API_CONFIG.baseUrl}/api/${API_CONFIG.apiVersion}`,
    timeout: API_CONFIG.timeout,
    withCredentials: API_CONFIG.withCredentials,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Add request interceptor for debugging
  client.interceptors.request.use(
    (config) => {
      console.log('API Request:', config.method?.toUpperCase(), config.url)
      return config
    },
    (error) => {
      console.error('API Request Error:', error)
      return Promise.reject(error)
    }
  )

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Response Error:', error.response?.status, error.response?.data)
      return Promise.reject(error)
    }
  )

  return client
}

export const apiClient = createApiClient()

// API Service classes
// export class AuthService {
//   static async login(credentials: { email: string; password: string }) {
//     const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials)
//     return response.data
//   }

//   static async signup(userData: { userName: string; email: string; password: string; passwordConfirm: string }) {
//     const response = await apiClient.post(API_ENDPOINTS.auth.signup, userData)
//     return response.data
//   }

//   static async logout() {
//     const response = await apiClient.post(API_ENDPOINTS.auth.logout)
//     return response.data
//   }

//   static async getCurrentUser() {
//     const response = await apiClient.get(API_ENDPOINTS.auth.me)
//     return response.data
//   }

//   static async forgotPassword(data: { email: string }) {
//     const response = await apiClient.post(API_ENDPOINTS.auth.forgotPassword, data)
//     return response.data
//   }

//   static async resetPassword(data: FormData) {
//     const response = await apiClient.post(API_ENDPOINTS.auth.resetPassword, data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     })
//     return response.data
//   }
// }

export class UsersService {
  static async getCurrentUser() {
    const response = await apiClient.get(API_ENDPOINTS.auth.me)
    return response.data
  }

  static async getUserById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.users.profile(id))
    return response.data
  }

  static async updateUser(id: string, userData: any) {
    const response = await apiClient.put(API_ENDPOINTS.users.update(id), userData)
    return response.data
  }

  static async deleteUser(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.users.delete(id))
    return response.data
  }
}

export class CitiesService {
  static async getAllCities() {
    const response = await apiClient.get(API_ENDPOINTS.cities.base)
    return response.data
  }

  static async getCityById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.byId(id))
    return response.data
  }

  static async getCityByName(name: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.byName(name))
    return response.data
  }

  static async getCityFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.favourites(id))
    return response.data
  }
}

export class ItinerariesService {
  static async getAllItineraries() {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.base)
    return response.data
  }

  static async getItineraryById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byId(id))
    return response.data
  }

  static async getItineraryByTitle(title: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byTitle(title))
    return response.data
  }

  static async getItinerariesByCity(cityId: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byCity(cityId))
    return response.data
  }

  static async addItinerary(formData: FormData) {
    const response = await apiClient.post(API_ENDPOINTS.itineraries.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async getItineraryFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.favourites(id))
    return response.data
  }
}

export class ActivitiesService {
  static async getAllActivities() {
    const response = await apiClient.get(API_ENDPOINTS.activities.base)
    return response.data
  }

  static async getActivityById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byId(id))
    return response.data
  }

  static async getActivityByTitle(title: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byTitle(title))
    return response.data
  }

  static async getActivitiesByItinerary(itineraryId: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byItinerary(itineraryId))
    return response.data
  }

  static async addActivity(formData: FormData) {
    const response = await apiClient.post(API_ENDPOINTS.activities.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async getActivityFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.favourites(id))
    return response.data
  }
}

export class FavouritesService {
  static async getAllFavourites() {
    const response = await apiClient.get(API_ENDPOINTS.favourites.base)
    return response.data
  }

  static async getFavouriteById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.favourites.byId(id))
    return response.data
  }

  static async getFavouritesByUser(userId: string) {
    const response = await apiClient.get(API_ENDPOINTS.favourites.byUser(userId))
    return response.data
  }

  static async addFavourite(data: any) {
    const response = await apiClient.post(API_ENDPOINTS.favourites.base, data)
    return response.data
  }

  static async removeFavourite(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.favourites.byId(id))
    return response.data
  }
}

export class CommentsService {
  static async getAllComments() {
    const response = await apiClient.get(API_ENDPOINTS.comments.base)
    return response.data
  }

  static async getCommentById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.comments.byId(id))
    return response.data
  }

  static async getCommentsBySource(sourceType: string, sourceId: string) {
    const response = await apiClient.get(API_ENDPOINTS.comments.bySource(sourceType, sourceId))
    return response.data
  }

  static async addComment(data: any) {
    const response = await apiClient.post(API_ENDPOINTS.comments.base, data)
    return response.data
  }

  static async deleteComment(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.comments.byId(id))
    return response.data
  }
}

// Legacy URL builders for backward compatibility (to be removed)
export const buildLegacyUrl = (endpoint: string): string => {
  return buildApiUrl(endpoint)
}