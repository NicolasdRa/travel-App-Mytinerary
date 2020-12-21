import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS
export const fetchCities = createAsyncThunk('cities/fetchAll', async () => {
  const res = await axios({
    method: 'get',
    url: '/api/v1/cities',
    responseType: 'json',
  })
  return res.data
})

// SLICE
const citiesSlice = createSlice({
  name: 'cities',
  initialState: { loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addCity(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload)
    },
    deleteCity(state, action) {
      return state.filter((city, i) => i !== action.payload.index)
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCities.fulfilled]: (state, action) => {
      // Add user to the state array
      return { loading: 'done', ...action.payload }
    },
    [fetchCities.rejected]: (state, action) => {
      return {
        loading: 'fail',
        error: action.error,
      }
    },
  },
})

// Extract and export each action creator by name
export const { addCity, deleteCity } = citiesSlice.actions

// // Export the reducer as a default export
export default citiesSlice.reducer
