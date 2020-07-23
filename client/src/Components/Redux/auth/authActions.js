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
import setAuthToken from '../../../AuthHandler/SetAuthToken'

// Setup config/headers & token
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

// Check token and load user
export const loadUser = token => async dispatch => {
  if (token) {
    setAuthToken(token)
    // console.log('set auth header token from cookies', token)
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users/profile')

    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (err) {
    // GET request to api route
    dispatch(returnErrors(err.response.data, err.response.satus, 'LOGIN_FAIL'))
    dispatch({ type: AUTH_ERROR })
    dispatch({ type: LOGIN_FAIL })
  }
}

// SIGN UP new USER in DB
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
    .post('http://localhost:5000/api/users/signup', body, config)
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

// LOG IN USER
export const loginUser = user => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify(user)

  // User Loading
  dispatch({ type: USER_LOADING })

  axios
    .post('http://localhost:5000/api/users/login', body, tokenConfig(getState))
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
export const logOutUser = user => dispatch => {
  const token = localStorage.getItem('token')

  if (token) {
    const body = JSON.stringify(user)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }

    axios
      .post('http://localhost:5000/api/users/logout', body, config)
      .then(res => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data
        })
        dispatch({
          type: CLEAR_ERRORS
        })
      })
      .catch(
        err =>
          dispatch(
            returnErrors(err.response.data, err.response.satus, 'LOGOUT_FAIL')
          ),
        dispatch({ type: LOGOUT_FAIL })
      )
  } else {
    dispatch({ type: LOGOUT_FAIL })
  }
}

//Logs out user from all devices
export const logOutAll = user => dispatch => {
  const token = localStorage.getItem('token')

  console.log(token)
  console.log('logout action user', user)

  if (token) {
    const body = JSON.stringify(user)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }

    axios
      .post('http://localhost:5000/api/users/logoutall', body, config)
      .then(res => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data
        })
        dispatch({
          type: CLEAR_ERRORS
        })
      })
      .catch(
        err =>
          dispatch(
            returnErrors(err.response.data, err.response.satus, 'LOGOUT_FAIL')
          ),
        dispatch({ type: LOGOUT_FAIL })
      )
  } else {
    dispatch({ type: LOGOUT_FAIL })
  }
}
