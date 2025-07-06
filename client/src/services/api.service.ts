import axios, { AxiosInstance } from 'axios'
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from '../config'
import { geoApiOptions, GEODB_MAX_RESULTS } from '../components/ui/LiveSearch/geoDbApiConfig'

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

/**
 * Consolidated API Services with Full Server Endpoint Coverage
 * Provides 100% consistency with server endpoints
 */

// Authentication Service
export class AuthService {
  static async login(credentials: { email: string; password: string }) {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials)
    return response.data
  }

  static async signup(userData: { userName: string; email: string; password: string; passwordConfirm: string }) {
    const response = await apiClient.post(API_ENDPOINTS.auth.signup, userData)
    return response.data
  }

  static async logout() {
    const response = await apiClient.post(API_ENDPOINTS.auth.logout)
    return response.data
  }

  static async logoutAll() {
    const response = await apiClient.post(API_ENDPOINTS.auth.logoutAll)
    return response.data
  }

  static async forgotPassword(data: { email: string }) {
    const response = await apiClient.post(API_ENDPOINTS.auth.forgotPassword, data)
    return response.data
  }

  static async resetPassword(data: FormData) {
    const response = await apiClient.patch(API_ENDPOINTS.auth.resetPassword, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async updatePassword(data: { currentPassword: string; password: string; passwordConfirm: string }) {
    const response = await apiClient.post(API_ENDPOINTS.auth.updatePassword, data)
    return response.data
  }

  static async getCurrentUser() {
    const response = await apiClient.get(API_ENDPOINTS.auth.me)
    return response.data
  }

  static getGoogleAuthUrl(): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    return `${baseUrl}/api/v1${API_ENDPOINTS.auth.google}`
  }
}

// Users Service
export class UsersService {
  // Current user operations
  static async getCurrentUser() {
    const response = await apiClient.get(API_ENDPOINTS.auth.me)
    return response.data
  }

  static async updateUserProfile(formData: FormData) {
    const response = await apiClient.patch(API_ENDPOINTS.users.updateMe, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async deleteCurrentUser() {
    const response = await apiClient.delete(API_ENDPOINTS.users.deleteMe)
    return response.data
  }

  // Admin user operations
  static async getAllUsers() {
    const response = await apiClient.get(API_ENDPOINTS.users.base)
    return response.data
  }

  static async createUser(userData: any) {
    const response = await apiClient.post(API_ENDPOINTS.users.base, userData)
    return response.data
  }

  static async getUserById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.users.profile(id))
    return response.data
  }

  static async updateUser(id: string, userData: any) {
    const response = await apiClient.patch(API_ENDPOINTS.users.update(id), userData)
    return response.data
  }

  static async deleteUser(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.users.delete(id))
    return response.data
  }

  // Nested routes
  static async getUserFavourites(userId: string) {
    const response = await apiClient.get(`/users/${userId}/favourites`)
    return response.data
  }
}

// Cities Service
export class CitiesService {
  static async getAllCities() {
    const response = await apiClient.get(API_ENDPOINTS.cities.base)
    return response.data
  }

  static async createCity(cityData: any) {
    const response = await apiClient.post(API_ENDPOINTS.cities.base, cityData)
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

  static async updateCity(name: string, cityData: any) {
    const response = await apiClient.patch(API_ENDPOINTS.cities.update(name), cityData)
    return response.data
  }

  static async deleteCity(name: string) {
    const response = await apiClient.delete(API_ENDPOINTS.cities.delete(name))
    return response.data
  }

  // Nested routes
  static async getCityFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.favourites(id))
    return response.data
  }

  static async getCityComments(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.comments(id))
    return response.data
  }

  static async getCityActivities(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.cities.activities(id))
    return response.data
  }
}

// Itineraries Service
export class ItinerariesService {
  static async getAllItineraries() {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.base)
    return response.data
  }

  static async createItinerary(formData: FormData) {
    const response = await apiClient.post(API_ENDPOINTS.itineraries.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async getItineraryById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byId(id))
    return response.data
  }

  static async updateItinerary(id: string, formData: FormData) {
    const response = await apiClient.patch(API_ENDPOINTS.itineraries.update(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async deleteItinerary(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.itineraries.delete(id))
    return response.data
  }

  // Query methods
  static async getItineraryByTitle(title: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byTitle(title))
    return response.data
  }

  static async getItinerariesByCity(cityName: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byCity(cityName))
    return response.data
  }

  static async getItinerariesByUser(userId: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.byUser(userId))
    return response.data
  }

  // Nested routes
  static async getItineraryFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.favourites(id))
    return response.data
  }

  static async getItineraryComments(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.comments(id))
    return response.data
  }

  static async getItineraryActivities(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.itineraries.activities(id))
    return response.data
  }

  // Backward compatibility alias
  static async addItinerary(formData: FormData) {
    return this.createItinerary(formData)
  }
}

// Activities Service
export class ActivitiesService {
  static async getAllActivities() {
    const response = await apiClient.get(API_ENDPOINTS.activities.base)
    return response.data
  }

  static async createActivity(formData: FormData) {
    const response = await apiClient.post(API_ENDPOINTS.activities.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async getActivityById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byId(id))
    return response.data
  }

  static async updateActivity(id: string, formData: FormData) {
    const response = await apiClient.patch(API_ENDPOINTS.activities.update(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async deleteActivity(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.activities.delete(id))
    return response.data
  }

  // Query methods
  static async getActivityByTitle(title: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byTitle(title))
    return response.data
  }

  static async getActivitiesByItinerary(itineraryName: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byItinerary(itineraryName))
    return response.data
  }

  static async getActivitiesByCity(cityName: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byCity(cityName))
    return response.data
  }

  static async getActivitiesByUser(userId: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.byUser(userId))
    return response.data
  }

  // Nested routes
  static async getActivityFavourites(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.favourites(id))
    return response.data
  }

  static async getActivityComments(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.activities.comments(id))
    return response.data
  }

  // Backward compatibility alias
  static async addActivity(formData: FormData) {
    return this.createActivity(formData)
  }
}

// Favourites Service
export class FavouritesService {
  static async getAllFavourites() {
    const response = await apiClient.get(API_ENDPOINTS.favourites.base)
    return response.data
  }

  static async createFavourite(data: any) {
    const response = await apiClient.post(API_ENDPOINTS.favourites.base, data)
    return response.data
  }

  static async getFavouriteById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.favourites.byId(id))
    return response.data
  }

  static async updateFavourite(id: string, data: any) {
    const response = await apiClient.patch(API_ENDPOINTS.favourites.byId(id), data)
    return response.data
  }

  static async deleteFavourite(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.favourites.byId(id))
    return response.data
  }

  // Query methods
  static async getFavouritesByUser(userId: string) {
    const response = await apiClient.get(API_ENDPOINTS.favourites.byUser(userId))
    return response.data
  }

  // Backward compatibility aliases
  static async addFavourite(data: any) {
    return this.createFavourite(data)
  }

  static async removeFavourite(id: string) {
    return this.deleteFavourite(id)
  }
}

// Comments Service
export class CommentsService {
  static async getAllComments() {
    const response = await apiClient.get(API_ENDPOINTS.comments.base)
    return response.data
  }

  static async createComment(data: any) {
    const response = await apiClient.post(API_ENDPOINTS.comments.base, data)
    return response.data
  }

  static async getCommentById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.comments.byId(id))
    return response.data
  }

  static async updateComment(id: string, data: any) {
    const response = await apiClient.patch(API_ENDPOINTS.comments.byId(id), data)
    return response.data
  }

  static async deleteComment(id: string) {
    const response = await apiClient.delete(API_ENDPOINTS.comments.byId(id))
    return response.data
  }

  // Query methods
  static async getCommentsBySource(sourceType: string, sourceId: string) {
    const response = await apiClient.get(API_ENDPOINTS.comments.bySource(sourceType, sourceId))
    return response.data
  }

  // Backward compatibility alias
  static async addComment(data: any) {
    return this.createComment(data)
  }
}

// GeoDB Service (external API)
export class GeoDBService {
  static async getCitiesGeoDB(namePrefix: string, target: 'cities' | 'itineraries' | 'activities' = 'cities') {
    const options = {
      url: `/${target}`,
      ...geoApiOptions,
      params: { 
        namePrefix, 
        limit: GEODB_MAX_RESULTS.toString(),
        minPopulation: '20000',
        sort: 'population'
      },
    }
    const response = await axios(options)
    return response.data.data
  }
}

// Legacy URL builder for backward compatibility
export const buildLegacyUrl = (endpoint: string): string => {
  return buildApiUrl(endpoint)
}

// Comprehensive API object for easy access
export const API = {
  auth: AuthService,
  users: UsersService,
  cities: CitiesService,
  itineraries: ItinerariesService,
  activities: ActivitiesService,
  favourites: FavouritesService,
  comments: CommentsService,
  geoDB: GeoDBService
} as const

export default API