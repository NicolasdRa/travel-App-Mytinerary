import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { authUrl } from '../../constants'
import { RootState } from './store'
import { User } from './types'

// THUNKS

// sign up
export const signupUser = createAsyncThunk(
  'auth/SignUpUser',
  async (formData, { dispatch, rejectWithValue }) => {
    dispatch(isLoggingIn())

    try {
      const res = await axios({
        method: 'POST',
        url: `${authUrl}signup`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error: any) {
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
        url: `${authUrl}login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error: any) {
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
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${authUrl}logout`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res.data
    } catch (error: any) {
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
        url: `${authUrl}forgotpassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res
    } catch (error: any) {
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
        url: `${authUrl}resetpassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      })
      return res.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

// Define a type for the slice state
interface AuthSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  isAuthenticated: boolean
  user: string | null
  error: string | null
}

// Define the initial state using that type
const initialState: AuthSlice = {
  loading: 'idle',
  isAuthenticated: false,
  user: null,
  error: null,
}

// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    isLoggingIn(state, action: PayloadAction<User | undefined>) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    isLoggedIn: {
      reducer(state, action: PayloadAction<User>) {
        state.loading = 'done'
        state.isAuthenticated = true
        state.user = action.payload._id
      },
      prepare(user: User) {
        return {
          payload: user,
        }
      },
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      signupUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = 'done'
        state.isAuthenticated = true
        state.user = action.payload._id
      }
    )
    builder.addCase(
      signupUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed'
        state.isAuthenticated = false
        state.error = action.payload.message
      }
    )
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.loading = 'done'
      state.isAuthenticated = true
      state.user = action.payload.user._id
    })
    builder.addCase(logInUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'failed'
      state.isAuthenticated = false
      state.error = action.payload.message
    })

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.loading = 'done'
      state.isAuthenticated = false
      state.user = null
    })

    builder.addCase(
      logOutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed'
        state.isAuthenticated = true
        state.error = action.payload.message
      }
    )

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = 'done'
    })

    builder.addCase(
      forgotPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed'
        state.error = action.payload.message
      }
    )

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = 'done'
    })

    builder.addCase(
      resetPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'failed'
        state.error = action.payload.message
      }
    )
  },
})

// SELECTORS
export const selectLoginLoading = (state: RootState) => state.auth.loading

// Extract and export each action creator by name
export const { isLoggingIn, isLoggedIn } = authSlice.actions

// // Export the reducer as a default export
export default authSlice.reducer
