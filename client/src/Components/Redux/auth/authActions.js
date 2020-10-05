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
  CLEAR_ERRORS,
  SENT_PASSWORD_RESET_LINK_SUCCESS,
  SENT_PASSWORD_RESET_LINK_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from '../types'
import jwtDecode from 'jwt-decode'

// Check token and load user
export const loadUser = token => async dispatch => {
  if (token) {
    try {
      const id = jwtDecode(token).id
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

// SEND PASSWORD RESET LINK
export const forgotPassword = formData => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/forgotpassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    })
    dispatch({ type: SENT_PASSWORD_RESET_LINK_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: SENT_PASSWORD_RESET_LINK_FAIL,
      payload: error.response.data
    })
  }
}

// RESET PASSWORD
export const resetPassword = formData => async dispatch => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/auth/resetpassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    })
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
    })
  }
}
