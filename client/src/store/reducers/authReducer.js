import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isloading: false,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isloading: true
      }

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isloading: false,
        user: action.payload,
        token: action.payload.token
      }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isloading: false
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isloading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isloading: false,
        errors: action.payload
      }
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isloading: false
      }
    default:
      return state
  }
}
