// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  apiVersion: 'v1',
  timeout: 30000,
  withCredentials: true
}

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    logoutAll: '/auth/logoutall',
    signup: '/auth/signup',
    me: '/users/me',
    forgotPassword: '/auth/forgotpassword',
    resetPassword: '/auth/resetpassword',
    updatePassword: '/auth/updatepassword',
    google: '/auth/google'
  },
  users: {
    base: '/users',
    profile: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    updateMe: '/users/updateMe',
    deleteMe: '/users/deleteMe',
    delete: (id: string) => `/users/${id}`
  },
  cities: {
    base: '/cities',
    byId: (id: string) => `/cities/${id}`,
    byName: (name: string) => `/cities/name/${name}`,
    update: (name: string) => `/cities/${name}`,
    delete: (name: string) => `/cities/${name}`,
    favourites: (id: string) => `/cities/${id}/favourites`,
    comments: (id: string) => `/cities/${id}/comments`,
    activities: (id: string) => `/cities/${id}/activities`
  },
  itineraries: {
    base: '/itineraries',
    byId: (id: string) => `/itineraries/${id}`,
    byTitle: (title: string) => `/itineraries/title/${title}`,
    byCity: (cityName: string) => `/itineraries/city/${cityName}`,
    byUser: (userId: string) => `/itineraries/user/${userId}`,
    update: (id: string) => `/itineraries/${id}`,
    delete: (id: string) => `/itineraries/${id}`,
    favourites: (id: string) => `/itineraries/${id}/favourites`,
    comments: (id: string) => `/itineraries/${id}/comments`,
    activities: (id: string) => `/itineraries/${id}/activities`
  },
  activities: {
    base: '/activities',
    byId: (id: string) => `/activities/${id}`,
    byTitle: (title: string) => `/activities/title/${title}`,
    byItinerary: (itineraryName: string) => `/activities/itinerary/${itineraryName}`,
    byCity: (cityName: string) => `/activities/city/${cityName}`,
    byUser: (userId: string) => `/activities/user/${userId}`,
    update: (id: string) => `/activities/${id}`,
    delete: (id: string) => `/activities/${id}`,
    favourites: (id: string) => `/activities/${id}/favourites`,
    comments: (id: string) => `/activities/${id}/comments`
  },
  favourites: {
    base: '/favourites',
    byId: (id: string) => `/favourites/${id}`,
    byUser: (userId: string) => `/favourites/user/${userId}`,
    update: (id: string) => `/favourites/${id}`,
    delete: (id: string) => `/favourites/${id}`
  },
  comments: {
    base: '/comments',
    byId: (id: string) => `/comments/${id}`,
    bySource: (sourceType: string, sourceId: string) => `/comments/${sourceType}/${sourceId}`,
    update: (id: string) => `/comments/${id}`,
    delete: (id: string) => `/comments/${id}`,
    create: '/comments'
  }
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  const base = `${API_CONFIG.baseUrl}/api/${API_CONFIG.apiVersion}`
  // Ensure there's exactly one slash between base and endpoint
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${normalizedEndpoint}`
}