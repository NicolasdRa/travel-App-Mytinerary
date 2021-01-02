import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS

// load current User
export const loadCurrentUser = createAsyncThunk(
  'users/loadCurrentUser',
  async () => {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/users/me`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  },
)

// update user info & picture
export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (formData) => {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return res.data
  },
)

export const updateProfileCoverImage = createAsyncThunk(
  'users/updateProfileCoverImage',
  async (formData) => {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateCover',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      onDownloadProgress: (progressEvent) => {
        console.log(
          'upload progress: ' +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            '%',
        )
      },
    })
    return res.data
  },
)

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
    [updateProfileCoverImage.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentUser = action.payload.data
    },
    [updateProfileCoverImage.rejected]: (state, action) => {
      state.loading = 'done'
      state.error = action.payload
    },
  },
})

// Extract and export each action creator by name
export const { unloadCurrentUser } = usersSlice.actions

// // Export the reducer as a default export
export default usersSlice.reducer
