import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS

// sign up
export const signupUser = createAsyncThunk(
  'auth/SignUpUser',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/auth/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// log in
export const logInUser = createAsyncThunk(
  'auth/logInUser',

  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// log out
export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (rejectWithValue) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/auth/logout',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res.data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// send password reset link
export const forgotPassword = createAsyncThunk(
  'auth/sendPasswordResetLink',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/auth/forgotpassword',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/api/v1/auth/resetpassword',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    isLoggedIn: {
      reducer(state, action) {
        state.loading = 'done'
        state.isAuthenticated = true
        state.user = action.payload._id
      },
      prepare(user) {
        return {
          payload: user,
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
        loading: 'idle',
        isAuthenticated: false,
      }
    },
    [logOutUser.rejected]: (state, action) => {
      return {
        loading: 'idle',
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
