import { combineReducers } from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  auth: authReducer,
  errors: errorReducer
})

export default rootReducer
