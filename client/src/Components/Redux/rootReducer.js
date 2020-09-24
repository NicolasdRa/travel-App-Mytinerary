import { combineReducers } from 'redux'
import citiesReducer from './cities/citiesReducer'
import itinerariesReducer from './itineraries/itinerariesReducer'
import activityReducer from './activities/activityReducer'
import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import loginFormReducer from './loginForm/loginFormReducer'
import signupFormReducer from './signupForm/signupFormReducer'

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activityReducer,
  auth: authReducer,
  errors: errorReducer,
  loginForm: loginFormReducer,
  signupForm: signupFormReducer
})

export default rootReducer
