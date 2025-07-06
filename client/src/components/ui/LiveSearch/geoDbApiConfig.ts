export const BASE_GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

/**
 * GeoDB Cities API Configuration
 * 
 * FREE TIER LIMITS:
 * - Rate limit: 1 request per second
 * - Max results per request: 10
 * - Daily quota: 1000 requests
 * 
 * These limits are enforced by the API and will return 429 errors if exceeded
 */
export const GEODB_MAX_RESULTS = 10 // Maximum allowed by free tier

export const geoApiOptions = {
  method: 'GET',
  baseURL: BASE_GEO_API_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
}
