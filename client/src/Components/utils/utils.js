// random number generator
export const randomNumberGenerator = (min, max) => {
  const randomNumber = Math.floor(min + Math.random() * (max + 1 - min))
  return randomNumber
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
