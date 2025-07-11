import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { UsersService } from '../services'
import { usersUrl } from '../constants'
import { User, Itinerary } from '../@types/types'
import { RootState } from './store'
import { logOutUser } from '../features/auth/authSlice'

// THUNKS

// load current User
export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrentUser',
  async () => {
    const data = await UsersService.getCurrentUser()

    // autheticates state when user is already logged in (google or cookie still valid) and his data is available
    // if (data) {
    //   store.dispatch(isLoggedIn(data))
    // }

    return data
  }
)

// update user info & picture
export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (formData: FormData) => {
    const data = await UsersService.updateUserProfile(formData)
    return data
  }
)

// get user By Id
export const getUserById = createAsyncThunk('users/getUserById', async (id: string) => {
  const data = await UsersService.getUserById(id)
  return data
})

// Define a type for the slice state
interface UsersSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  currentUser: User | null
  error: string | undefined
}

// Define the initial state using that type
const initialState: UsersSlice = {
  loading: 'idle',
  currentUser: null,
  error: undefined,
}

// SLICE
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unloadCurrentUser(state, action) {
      state.loading = 'idle'
      state.currentUser = null
    },
    updateUserItineraries: {
      reducer(state, action: PayloadAction<Itinerary>) {
        state.loading = 'done'
        state.currentUser &&
          state.currentUser.itineraries.unshift(action.payload)
      },
      prepare(itinerary: Itinerary) {
        return {
          payload: itinerary,
        }
      },
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCurrentUser.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentUser = action.payload.data
    })
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message
    })
    builder.addCase(updateUserProfile.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentUser = action.payload.data
    })
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message
    })
    // Clear user data when logging out
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.loading = 'idle'
      state.currentUser = null
      state.error = undefined
    })
    // Also clear user data if logout fails (client-side cleanup)
    builder.addCase(logOutUser.rejected, (state) => {
      state.loading = 'idle'
      state.currentUser = null
      state.error = undefined
    })
  },
})

// SELECTORS

export const selectCurrentUser = (state: RootState) => state.users.currentUser

export const selectUserLoading = (state: RootState) => state.users.loading
// Extract and export each action creator by name
export const { unloadCurrentUser, updateUserItineraries } = usersSlice.actions

// // Export the reducer as a default export
export default usersSlice.reducer
