import {
  USER_LOADING,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
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
    case IS_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        isloading: false,
        user: action.payload
      }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isloading: false,
        user: action.payload.data._id
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        isloading: false
      }
    case LOGOUT_SUCCESS:
    case IS_LOGGED_OUT:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case SENT_PASSWORD_RESET_LINK_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isloading: false
      }
    case SENT_PASSWORD_RESET_LINK_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isloading: false
      }
    default:
      return state
  }
}
