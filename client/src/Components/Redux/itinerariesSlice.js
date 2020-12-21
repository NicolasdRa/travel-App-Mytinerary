import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS
export const fetchItineraries = createAsyncThunk(
  'itineraries/fetchAll',
  async (thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: '/itineraries',
      baseURL: 'http://localhost:5000/api/v1',
      responseType: 'json',
    })
    return res.data
  },
)

export const addItinerary = createAsyncThunk(
  'itineraries/addOne',
  async (thunkAPI) => {
    const res = await axios({
      method: 'post',
      url: '/itineraries/add',
      baseURL: 'http://localhost:5000/api/v1',
      responseType: 'json',
    })
    const data = await res.json()
    return data
  },
)

// SLICE
const itinerariesSlice = createSlice({
  name: 'itineraries',
  initialState: {
    loading: 'idle',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    // addItinerary(state, action) {
    //   // "mutate" the array by calling push()
    //   state.data.push(action.payload)
    // },
    deleteItinerary(state, action) {
      return state.filter((itinerary, i) => i !== action.payload.index)
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchItineraries.fulfilled]: (state, action) => {
      return {
        loading: 'done',
        ...action.payload,
      }
    },
    [fetchItineraries.rejected]: (state, action) => {
      return {
        loading: 'fail',
        error: action.error,
      }
    },
  },
})

// Extract and export each action creator by name
export const { deleteItinerary } = itinerariesSlice.actions

// // Export the reducer as a default export
export default itinerariesSlice.reducer
