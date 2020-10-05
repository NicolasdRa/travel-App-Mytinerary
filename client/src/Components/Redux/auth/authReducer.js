import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SENT_PASSWORD_RESET_LINK_SUCCESS,
  SENT_PASSWORD_RESET_LINK_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from '../types'

const initialState = {
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
        user: action.payload.data,
        token: action.payload.data.token
      }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
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
    case SENT_PASSWORD_RESET_LINK_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isloading: false,
        errors: action.payload
      }
    case LOGOUT_SUCCESS:
    case SENT_PASSWORD_RESET_LINK_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
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
