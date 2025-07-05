// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  apiVersion: 'v1',
  timeout: 30000,
  withCredentials: true
}

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    signup: '/auth/signup',
    me: '/users/me',
    forgotPassword: '/auth/forgotpassword',
    resetPassword: '/auth/resetpassword',
    google: '/auth/google'
  },
  users: {
    base: '/users',
    profile: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`
  },
  cities: {
    base: '/cities',
    byId: (id: string) => `/cities/${id}`,
    byName: (name: string) => `/cities/name/${name}`,
    favourites: (id: string) => `/cities/${id}/favourites`
  },
  itineraries: {
    base: '/itineraries',
    byId: (id: string) => `/itineraries/${id}`,
    byTitle: (title: string) => `/itineraries/title/${title}`,
    byCity: (cityId: string) => `/itineraries/city/${cityId}`,
    favourites: (id: string) => `/itineraries/${id}/favourites`
  },
  activities: {
    base: '/activities',
    byId: (id: string) => `/activities/${id}`,
    byTitle: (title: string) => `/activities/title/${title}`,
    byItinerary: (itineraryId: string) => `/activities/itinerary/${itineraryId}`,
    favourites: (id: string) => `/activities/${id}/favourites`
  },
  favourites: {
    base: '/favourites',
    byId: (id: string) => `/favourites/${id}`,
    byUser: (userId: string) => `/favourites/user/${userId}`
  },
  comments: {
    base: '/comments',
    byId: (id: string) => `/comments/${id}`,
    bySource: (sourceType: string, sourceId: string) => `/comments/${sourceType}/${sourceId}`
  }
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  const base = `${API_CONFIG.baseUrl}/api/${API_CONFIG.apiVersion}`
  // Ensure there's exactly one slash between base and endpoint
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${normalizedEndpoint}`
}