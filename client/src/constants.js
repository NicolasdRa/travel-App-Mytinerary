export const baseUrl = 'http://localhost:5000/'
export const apiUrl = `${baseUrl}api/v1/`

// FIXME: for auth and users I need to change the port to 3000, find out why and fix
export const apiLocalUrl = 'http://localhost:3000/api/v1/'

export const authUrl = `${apiLocalUrl}auth/`
export const usersUrl = `${apiLocalUrl}users/`
export const citiesUrl = `${apiUrl}cities/`
export const itinerariesUrl = `${apiUrl}itineraries/`
export const activitiesUrl = `${apiUrl}activities/`
export const favouritesUrl = `${apiUrl}favourites/`
