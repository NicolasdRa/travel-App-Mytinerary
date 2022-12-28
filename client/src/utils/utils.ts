// random number generator
export const randomNumberGenerator = (min: number, max: number) => {
  const randomNumber = Math.floor(min + Math.random() * (max + 1 - min))
  return randomNumber
}

// get cookie value by name
export const getCookieValue = (name: string) => {
  const cookieName = name

  const cookies = document.cookie.split(';')

  const jwtCookie = cookies.filter((cookie) => cookie.includes(cookieName))[0]

  if (!jwtCookie) {
    return null
  } else {
    const cookieValue = jwtCookie.split('=')[1]

    return cookieValue
  }
}

// // util Setup config/headers & token -- check if/when to use
// export const tokenConfig = (getState) => {
//   // 1. Get token from local storage
//   const token = getState().auth.token

//   // 2. Set Headers
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }

//   // 3. If token, add to headers
//   if (token) {
//     config.headers['x-auth-token'] = token
//   }
//   return config
// }

// // util set authorization token -- check if/when to use
// export const setAuthToken = (token) => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//   } else {
//     delete axios.defaults.headers.common['Authorization']
//   }
// }
