import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { authUrl, usersUrl } from '../constants'
import { RootState } from './store'
import { LoginCredentials, SignupData } from '../@types/types'

// THUNKS

// sign up
export const signupUser = createAsyncThunk(
  'auth/SignUpUser',
  async (formData: SignupData, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${authUrl}signup`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
        withCredentials: true, // Important for JWT cookies
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
  async (formData: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${authUrl}login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
        withCredentials: true, // Important for JWT cookies
      })
      return res.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      // Don't logout on login errors - only return the error
      return rejectWithValue(error.response.data)
    }
  }
)

// set user
export const setUser = createAsyncThunk(
  'auth/setUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${usersUrl}me`,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for JWT cookies
      })

      return res.data
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      error && dispatch(logOutUser())
      return rejectWithValue(error.response.data)
    }
  }
)

// log out
export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${authUrl}logout`,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for JWT cookies
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
  async (formData: {}, { rejectWithValue }) => {
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
  async (formData: FormData, { rejectWithValue }) => {
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
  loading: 'idle' | 'pending' | 'done' | 'fail'
  isAuthenticated: boolean
  userId: string | null
  error: string | null
}

// Define the initial state using that type
const initialState: AuthSlice = {
  loading: 'idle',
  isAuthenticated: false,
  userId: null,
  error: null,
}

// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    isLoggedOut(state) {
      state.loading = 'done'
      state.isAuthenticated = false
      state.userId = null
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      signupUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = 'done'
        state.isAuthenticated = true
        state.userId = action.payload._id
      }
    )
    builder.addCase(
      signupUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'fail'
        state.isAuthenticated = false
        state.error = action.payload.message
      }
    )
    builder.addCase(
      logInUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = 'done'
        state.isAuthenticated = true
        state.userId = action.payload._id
      }
    )
    builder.addCase(logInUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = 'fail'
      state.isAuthenticated = false
      state.error = action.payload.message
    })

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.loading = 'done'
      state.isAuthenticated = false
      state.userId = null
    })

    builder.addCase(
      logOutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'fail'
        state.isAuthenticated = true
        state.error = action.payload.message
      }
    )

    builder.addCase(setUser.fulfilled, (state, action) => {
      state.loading = 'done'
      state.isAuthenticated = true
      state.userId = action.payload.data._id
    })

    builder.addCase(setUser.rejected, (state, action) => {
      state.loading = 'done'
      state.isAuthenticated = false
      state.userId = null
    })

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = 'done'
    })

    builder.addCase(
      forgotPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'fail'
        state.error = action.payload.message
      }
    )

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = 'done'
    })

    builder.addCase(
      resetPassword.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = 'fail'
        state.error = action.payload.message
      }
    )
  },
})

// SELECTORS
export const selectLoginLoading = (state: RootState) => state.auth.loading

const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export const selectAuthenticated = createSelector(
  [selectIsAuthenticated],
  (isAuthenticated) => isAuthenticated
)

// Extract and export each action creator by name
export const { isLoggedOut } = authSlice.actions

// // Export the reducer as a default export
export default authSlice.reducer
