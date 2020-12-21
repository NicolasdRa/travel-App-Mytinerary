import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// THUNKS
export const fetchFavourites = createAsyncThunk(
  'favourites/fetchAll',
  async (thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: '/favourites',
      baseURL: 'http://localhost:5000/api/v1',
      responseType: 'json',
    })
    return { results: res.data.results, data: res.data.data }
  },
)

// SLICE
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    loading: 'idle',
    results: 0,
    newFavourite: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    addFavourite(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload)
    },
    deleteFavourite(state, action) {
      return state.filter((favourite, i) => i !== action.payload.index)
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchFavourites.fulfilled]: (state, action) => {
      // Add user to the state array
      return { loading: 'done', ...action.payload }
    },
  },
})

// Extract and export each action creator by name
export const { addFavourite, deleteFavourite } = favouritesSlice.actions

// // Export the reducer as a default export
export default favouritesSlice.reducer
