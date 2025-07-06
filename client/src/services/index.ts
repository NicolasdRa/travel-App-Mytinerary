// New functional API exports (primary)
export * from './http.utils'
export * from './crud.factory'
export * from './api.types'
export * from './auth.api'

// Consolidated API services with full server consistency
export { 
  AuthService,
  UsersService, 
  CitiesService, 
  ItinerariesService, 
  ActivitiesService, 
  FavouritesService, 
  CommentsService,
  GeoDBService,
  buildLegacyUrl,
  apiClient,
  API
} from './api.service'

// Re-export API object as default
export { default as APIService } from './api.service'