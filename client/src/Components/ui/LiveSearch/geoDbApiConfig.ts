export const BASE_GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

export const geoApiOptions = {
  method: 'GET',
  baseURL: BASE_GEO_API_URL,
  headers: {
    'X-RapidAPI-Key': '312e885d70msh49b3d4dcfdebf37p1945cdjsn1b9050b9edb7',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    // 'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    // 'X-RapidAPI-Host': process.env.RAPID_API_HOST,
  },
}
