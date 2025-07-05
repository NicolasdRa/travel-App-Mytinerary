// Legacy constants for backward compatibility
// MIGRATION PROGRESS:
// ✅ Auth slice - fully migrated to AuthService
// ✅ API services layer created with proper typing
// ⚠️  Other slices - partially migrated (main fetch calls use services)
// 📝 Remaining: complete migration of all thunks in other slices
//
// NEW APPROACH:
// 1. Use services from ./services/api.service.ts
// 2. Services provide typed methods and centralized config
// 3. All HTTP logic encapsulated in service layer
// 4. Better error handling and interceptors
import { API_CONFIG, buildApiUrl } from './config'

export const baseUrl = API_CONFIG.baseUrl

export const apiUrl = buildApiUrl('')

export const authUrl = buildApiUrl('/auth/')
export const usersUrl = buildApiUrl('/users/')
export const citiesUrl = buildApiUrl('/cities/')
export const itinerariesUrl = buildApiUrl('/itineraries/')
export const activitiesUrl = buildApiUrl('/activities/')
export const favouritesUrl = buildApiUrl('/favourites/')
