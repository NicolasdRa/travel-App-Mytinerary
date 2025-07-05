export const BASE_GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

export const geoApiOptions = {
  method: 'GET',
  baseURL: BASE_GEO_API_URL,
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
}
