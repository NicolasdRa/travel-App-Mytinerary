import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { ActivitiesService } from '../services'
import { activitiesUrl } from '../constants'
import { RootState } from './store'
import { Activity } from '../@types/types'

// THUNKS
export const fetchActivities = createAsyncThunk(
  'activities/fetchAll',
  async () => {
    const data = await ActivitiesService.getAllActivities()
    return data
  }
)

export const fetchActivityByTitle = createAsyncThunk(
  'itineraries/fetchActivityByTitle',
  async (title: string | undefined) => {
    const data = await ActivitiesService.getActivityByTitle(title!)
    return data
  }
)

export const addActivity = createAsyncThunk(
  'activities/addOne',
  async (formData: FormData) => {
    const data = await ActivitiesService.createActivity(formData)
    return data
  }
)

// Define a type for the slice state
interface ActivitiesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  currentActivity: any
  data: Activity[]
}

// Define the initial state using that type
const initialState: ActivitiesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  currentActivity: null,
  data: [],
}

// SLICE
const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    // TODO: replace these two below with builder cases
    // addActivity(state, action) {
    //   // "mutate" the array by calling push()
    //   state.data.push(action.payload)
    // },
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
      state.data = action.payload.data
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
    builder.addCase(addActivity.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(addActivity.fulfilled, (state, action) => {
      const newActivity = action.payload.data.data
      state.loading = 'done'
      state.data.unshift(newActivity)
    })
    builder.addCase(addActivity.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

// SELECTORS
export const selectAllActivities = (state: RootState) => state.activities.data

export const selectCurrentActivity = (state: RootState) => state.activities.currentActivity

export const selectActivitiesLoading = (state: RootState) =>
  state.activities.loading

export const selectActivitiesForCity = createSelector(
  [selectAllActivities, (state, cityName) => cityName],
  (activities: Activity[], cityName) =>
    activities.filter((activity) => activity.cityName === cityName)
)

export const selectActivitiesByUserId = createSelector(
  [selectAllActivities, (state, id) => id],
  (activities: Activity[], id) =>
    activities.filter((item) => item.author.id === id)
)

export const selectActivitiesSortedByLikes = createSelector(
  [selectAllActivities],
  (activities: Activity[]) => activities.sort((a, b) => b.likes - a.likes)
)

export const selectActivityByTitle = createSelector(
  [selectAllActivities, (state, title) => title],
  (activities: Activity[], title) => activities.find((activity: Activity) => activity.title === title)
)

export const selectActivitiesForItinerary = createSelector(
  [selectAllActivities, (state, title) => title],
  (activities, title) =>
    activities.filter((activity: Activity) => activity.itinerary.title === title)
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
export const { deleteActivity } = activitiesSlice.actions

// REDUCER EXPORT

// // Export the reducer as a default export
export default activitiesSlice.reducer
