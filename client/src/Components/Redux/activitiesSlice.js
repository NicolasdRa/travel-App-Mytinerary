import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { activitiesUrl } from '../../constants'

// THUNKS
export const fetchActivities = createAsyncThunk(
  'activities/fetchAll',
  async () => {
    const res = await axios({
      method: 'GET',
      url: activitiesUrl,
      responseType: 'json',
    })
    return res.data
  }
)

export const fetchActivityByTitle = createAsyncThunk(
  'itineraries/fetchActivityByTitle',
  async (title, thunkAPI) => {
    const res = await axios({
      method: 'GET',
      url: `${activitiesUrl}title/${title}`,
      responseType: 'json',
    })
    return res.data
  }
)

// SLICE
const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    loading: 'idle',
    status: '',
    results: '',
    data: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addActivitiy(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload)
    },
    deleteActivity(state, action) {
      return state.filter((activity, i) => i !== action.payload.index)
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchActivities.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        ...action.payload,
      }
    },
    [fetchActivities.rejected]: (state, action) => {
      return {
        loading: 'fail',
        error: action.error,
      }
    },
    [fetchActivityByTitle.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentActivity = action.payload.data
    },
    [fetchActivityByTitle.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

// SELECTORS
const selectActivities = (state) => state.activities.data

export const selectActivitiesLoading = (state) => state.activities.loading

export const selectCurrentActivity = (state) => state.activities.currentActivity

export const selectAllActivities = createSelector(
  [selectActivities],
  (activities) => activities
)

export const selectActivitiesSortedByLikes = createSelector(
  [selectActivities],
  (activities) => activities.sort((a, b) => b.likes - a.likes)
)

export const selectActivityByTitle = createSelector(
  [selectAllActivities, (state, title) => title],
  (activities, title) => activities.find((activity) => activity.title === title)
)

export const selectActivitiesForItinerary = createSelector(
  [selectAllActivities, (state, itineraryId) => itineraryId],
  (activities, itineraryId) =>
    activities.filter((activity) => activity.itinerary === itineraryId)
)

// ACTION EXPORTS

// Extract and export each action creator by name
export const { addActivity, deleteActivity } = activitiesSlice.actions

// REDUCER EXPORT

// // Export the reducer as a default export
export default activitiesSlice.reducer
