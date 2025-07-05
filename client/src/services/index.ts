// New functional API exports (primary)
export * from './http.utils'
export * from './crud.factory'
export * from './api.types'
export * from './auth.api'

// Legacy class-based services (deprecated - for backward compatibility)
export { 
  // AuthService, 
  UsersService, 
  CitiesService, 
  ItinerariesService, 
  ActivitiesService, 
  FavouritesService, 
  CommentsService,
  buildLegacyUrl
} from './api.service'

// Export legacy apiClient with different name to avoid conflicts
export { apiClient as legacyApiClient } from './api.service'