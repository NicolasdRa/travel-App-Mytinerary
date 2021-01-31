import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS
export const fetchItineraries = createAsyncThunk(
  'itineraries/fetchAll',
  async (thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/itineraries',
      responseType: 'json',
    })
    return res.data
  },
)

export const addItinerary = createAsyncThunk(
  'itineraries/addOne',
  async (formData, thunkAPI) => {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/itineraries',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return res.data
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
        error: action.payload,
      }
    },
    [addItinerary.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.data.push(action.payload)
      state.loading = 'done'
    },
    [addItinerary.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

// SELECTORS
const selectItineraries = (state) => state.itineraries.data

export const selectAllItineraries = createSelector(
  [selectItineraries],
  (itineraries) => itineraries,
)

export const selectAllItinerariesForCity = createSelector(
  [selectAllItineraries, (state, city) => city],
  (itineraries, city) =>
    itineraries.filter((itinerary) => itinerary.city === city),
)

export const selectItineraryByTitle = createSelector(
  [selectAllItineraries, (state, title) => title],
  (itineraries, title) =>
    itineraries.filter((itinerary) => itinerary.title === title),
)

// Extract and export each action creator by name
export const { deleteItinerary } = itinerariesSlice.actions

// // Export the reducer as a default export
export default itinerariesSlice.reducer
