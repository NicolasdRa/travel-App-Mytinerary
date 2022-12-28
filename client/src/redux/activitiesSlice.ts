import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { activitiesUrl } from '../constants'
import { RootState } from './store'

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
  async (title: string | undefined) => {
    const res = await axios({
      method: 'GET',
      url: `${activitiesUrl}title/${title}`,
      responseType: 'json',
    })
    return res.data
  }
)

// Define a type for the slice state
interface ActivitiesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  currentActivity: any
  data: any[]
}

// Define the initial state using that type
const initialState: ActivitiesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  currentActivity: {},
  data: [],
}

// SLICE
const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    // TODO: replace these two below with builder cases
    addActivity(state, action) {
      // "mutate" the array by calling push()
      state.data.push(action.payload)
    },
    deleteActivity(state, action) {
      state.data.filter((activity, i) => i !== action.payload.index)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchActivities.pending, (state, action) => {
      state.loading = 'pending'
    })

    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload
    })

    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })

    builder.addCase(fetchActivityByTitle.pending, (state, action) => {
      state.loading = 'pending'
    })

    builder.addCase(fetchActivityByTitle.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentActivity = action.payload.data
    })

    builder.addCase(fetchActivityByTitle.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

// SELECTORS
const selectActivities = (state: RootState) => state.activities.data

const selectActivity = (state: RootState) => state.activities.currentActivity

export const selectActivitiesLoading = (state: RootState) =>
  state.activities.loading

export const selectAllActivities = createSelector(
  [selectActivities],
  (activities) => activities
)

export const selectCurrentActivity = createSelector(
  [selectActivity],
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

export const selectRandomActivity = createSelector(
  [selectAllActivities],
  (items) => {
    const randomItem = items[Math.floor(Math.random() * items.length)]
    return randomItem
  }
)

// ACTION EXPORTS

// Extract and export each action creator by name
export const { addActivity, deleteActivity } = activitiesSlice.actions

// REDUCER EXPORT

// // Export the reducer as a default export
export default activitiesSlice.reducer
