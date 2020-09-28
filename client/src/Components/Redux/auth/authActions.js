import axios from 'axios'
import { returnErrors } from '../error/errorActions'
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
  CLEAR_ERRORS
} from '../types'
import jwtDecode from 'jwt-decode'

// util Setup config/headers & token -- check if/when to use
export const tokenConfig = getState => {
  // 1. Get token from local storage
  const token = getState().auth.token

  // 2. Set Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // 3. If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
}

// util set authorization token -- check if/when to use
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Check token and load user
export const loadUser = token => async dispatch => {
  if (token) {
    try {
      const id = jwtDecode(token).id
      setAuthToken(token)

      const res = await axios.get(`/api/v1/users/${id}`)
      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data })
      console.log(error.response.data)
    }
  }
}

// SIGN UP user
export const signupUser = formData => async dispatch => {
  try {
    dispatch({ type: USER_LOADING })
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    })
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
    dispatch({ type: CLEAR_ERRORS })
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.response.data })
  }
}

// LOG IN user
export const loginUser = formData => async dispatch => {
  try {
    dispatch({ type: USER_LOADING })
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    })
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data })
  }
}

//LOG OUT user
export const logOutUser = user => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/logout',
      headers: {
        'Content-Type': 'application/json'
      },
      data: user
    })
    dispatch({ type: LOGOUT_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data })
  }
}
