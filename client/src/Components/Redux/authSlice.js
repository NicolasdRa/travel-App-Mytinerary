import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS

// sign up
export const signupUser = createAsyncThunk(
  'auth/SignUpUser',
  async (formData) => {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    })
    return res.data
  },
)

// log in
export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (formData) => {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    })
    return res.data
  },
)

// log out
export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  const res = await axios({
    method: 'POST',
    url: '/api/v1/auth/logout',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

// send password reset link
export const forgotPassword = createAsyncThunk(
  'auth/sendPasswordResetLink',
  async (formData) => {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/forgotpassword',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    })
    return res.data
  },
)

// reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData) => {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/auth/resetpassword',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    })
    return res.data
  },
)

// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    isLoggedIn: {
      reducer(state, action) {
        state.loading = 'done'
        state.isAuthenticated = true
        state.user = action.payload
      },
      prepare(user) {
        return {
          payload: user._id,
        }
      },
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [signupUser.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: true,
        user: action.payload.data._id,
      }
    },
    [signupUser.rejected]: (state, action) => {
      return {
        loading: 'fail',
        isAuthenticated: false,
        error: action.payload,
      }
    },
    [logInUser.fulfilled]: (state, action) => {
      console.log(action.payload.data._id)
      return {
        loading: 'done',
        isAuthenticated: true,
        user: action.payload.data._id,
      }
    },
    [logInUser.rejected]: (state, action) => {
      return {
        loading: 'fail',
        isAuthenticated: false,
        error: action.payload,
      }
    },
    [logOutUser.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: false,
      }
    },
    [logOutUser.rejected]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: true,
        error: action.payload,
      }
    },
    [forgotPassword.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: false,
      }
    },
    [forgotPassword.rejected]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: true,
        error: action.payload,
      }
    },
    [resetPassword.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: false,
      }
    },
    [resetPassword.rejected]: (state, action) => {
      return {
        loading: 'done',
        isAuthenticated: true,
        error: action.payload,
      }
    },
  },
})

// Extract and export each action creator by name
export const { isLoggedIn } = authSlice.actions

// // Export the reducer as a default export
export default authSlice.reducer
