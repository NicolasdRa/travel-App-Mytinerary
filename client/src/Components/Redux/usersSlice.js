import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { usersUrl } from '../../constants'

// THUNKS

// load current User
export const loadCurrentUser = createAsyncThunk(
  'users/loadCurrentUser',
  async () => {
    const res = await axios({
      method: 'GET',
      url: `${usersUrl}me`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  }
)

// update user info & picture
export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (formData) => {
    const res = await axios({
      method: 'PATCH',
      url: `${usersUrl}updateMe`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return res.data
  }
)

// get user By Id
export const getUserById = createAsyncThunk('users/getUserById', async () => {
  const res = await axios({
    method: 'GET',
    url: `${usersUrl}:id`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

// SLICE
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    currentUser: null,
    error: null,
  },
  reducers: {
    unloadCurrentUser(state, action) {
      state.loading = 'idle'
      state.currentUser = null
    },
    updateUserItineraries: {
      reducer(state, action) {
        state.loading = 'done'
        state.currentUser.itineraries.unshift(action.payload)
      },
      prepare(itinerary) {
        return {
          payload: itinerary,
        }
      },
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [loadCurrentUser.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentUser = action.payload.data
    },
    [loadCurrentUser.rejected]: (state, action) => {
      state.loading = 'fail'
      state.currentUser = null
      state.error = action.error
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentUser = action.payload.data
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

// SELECTORS

const selectUser = (state) => state.users.currentUser

export const selectUserLoading = (state) => state.users.loading

export const selectCurrentUser = createSelector(
  [selectUser],
  (currentUser) => currentUser
)

// Extract and export each action creator by name
export const { unloadCurrentUser, updateUserItineraries } = usersSlice.actions

// // Export the reducer as a default export
export default usersSlice.reducer
