import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS
export const fetchActivities = createAsyncThunk(
  'activities/fetchAll',
  async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/activities',
      responseType: 'json',
    })
    return res.data
  },
)

// SLICE
const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    loading: 'idle',
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
  },
})

// Extract and export each action creator by name
export const { addActivity, deleteActivity } = activitiesSlice.actions

// // Export the reducer as a default export
export default activitiesSlice.reducer
