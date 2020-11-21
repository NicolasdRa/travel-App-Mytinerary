import axios from 'axios'
import { returnErrors } from '../error/errorActions'
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

// check if user IS LOGGED IN (to set auth state to true after google Auth)
export const isLoggedIn = user => dispatch => {
  try {
    dispatch({ type: IS_LOGGED_IN, payload: user._id })
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error })
    dispatch({ type: IS_LOGGED_OUT })
  }
}

// SIGN UP user
export const signupUser = formData => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    })
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error })
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
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error })
    dispatch({ type: IS_LOGGED_OUT })
  }
}

//LOG OUT user
export const logOutUser = () => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/logout',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({ type: LOGOUT_SUCCESS })
    dispatch({ type: IS_LOGGED_OUT })
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error })
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
      payload: error
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
      payload: error
    })
  }
}
