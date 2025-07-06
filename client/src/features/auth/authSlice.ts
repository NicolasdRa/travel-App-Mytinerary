import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { authApi } from '../../services/auth.api'
import { RootState } from '../../redux/store'
import { LoginCredentials, SignupData, AuthState } from './types'

// THUNKS

// sign up
export const signupUser = createAsyncThunk(
  'auth/SignUpUser',
  async (formData: SignupData, { rejectWithValue }) => {
    try {
      const data = await authApi.signup(formData)
      return data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

// log in
export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (formData: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(formData)
      return data
    } catch (error: any) {
      // Don't logout on login errors - only return the error
      return rejectWithValue(error)
    }
  }
)

// set user
export const setUser = createAsyncThunk(
  'auth/setUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getCurrentUser()
      return data
    } catch (error: any) {
      // Don't dispatch logout here - just let the rejection handle the state
      return rejectWithValue(error)
    }
  }
)

// log out
export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout()
      return { status: 'success', message: 'Logged out successfully' }
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

// send password reset link
export const forgotPassword = createAsyncThunk(
  'auth/sendPasswordResetLink',
  async (formData: { email: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.forgotPassword(formData)
      return data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

// reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const data = await authApi.resetPassword(formData)
      return data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

// Define the initial state using that type
const initialState: AuthState = {
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
        state.userId = action.payload.data._id
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
        state.userId = action.payload.data._id
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
      
      // The API returns the user object directly
      // action.payload = userObject
      // So we need action.payload._id
      if (action.payload && action.payload._id) {
        state.userId = action.payload._id
      } else {
        console.error('❌ setUser.fulfilled - Could not extract userId from payload:', action.payload)
        // Fall back to unauthenticated state
        state.isAuthenticated = false
        state.userId = null
      }
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
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthUserId = (state: RootState) => state.auth.userId
export const selectAuthError = (state: RootState) => state.auth.error

// Extract and export each action creator by name
export const { isLoggedOut } = authSlice.actions

// // Export the reducer as a default export
export default authSlice.reducer
