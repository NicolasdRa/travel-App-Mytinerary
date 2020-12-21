import { combineReducers } from 'redux'

// import authReducer from './auth/authReducer'
// import userReducer from './users/userReducer'

import errorReducer from './error/errorReducer'
import loginFormReducer from './loginForm/loginFormReducer'
import signupFormReducer from './signupForm/signupFormReducer'

import citiesSlice from './citiesSlice'
import itinerariesSlice from './itinerariesSlice'
import activitiesSlice from './activitiesSlice'
import favouritesSlice from './favouritesSlice'
import authSlice from './authSlice'
import usersSlice from './usersSlice'

const rootReducer = combineReducers({
  cities: citiesSlice,
  itineraries: itinerariesSlice,
  activities: activitiesSlice,
  favourites: favouritesSlice,
  auth: authSlice,
  users: usersSlice,
  errors: errorReducer,
  loginForm: loginFormReducer,
  signupForm: signupFormReducer,
})

export default rootReducer
