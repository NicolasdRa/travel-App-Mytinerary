import axios from 'axios'
import { returnErrors } from './errorActions'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS
} from './types'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING })

  // GET request to api route
  axios
    .get('http://localhost:5000/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.satus, 'LOGIN_FAIL')
      )
      dispatch({ type: AUTH_ERROR })
      dispatch({ type: LOGIN_FAIL })
    })
}

// Setup config/headers & token // Helper function for get request
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token

  // Set Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
}

// Signs up new User on DB
export const signupUser = user => async dispatch => {
  // Set Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request Body
  const body = JSON.stringify(user)

  axios
    .post('http://localhost:5000/api/users', body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(
      err =>
        dispatch(
          returnErrors(err.response.data, err.response.satus, 'SIGNUP_FAIL')
        ),
      dispatch({ type: SIGNUP_FAIL })
    )
}

// Logs in User
export const loginUser = user => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify(user)

  // User Loading
  dispatch({ type: USER_LOADING })

  axios
    .post('http://localhost:5000/api/auth/login', body, tokenConfig(getState))
    // .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.satus, 'LOGIN_FAIL')
      )
      dispatch({ type: AUTH_ERROR })
      dispatch({ type: LOGIN_FAIL })
    })
}

//Logs out user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
