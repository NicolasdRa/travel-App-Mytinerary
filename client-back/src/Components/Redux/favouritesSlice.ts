import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { favouritesUrl } from '../../constants'
import { RootState } from './store'
import { Favourite } from './types'

// THUNKS
export const fetchFavourites = createAsyncThunk(
  'favourites/fetchAll',
  async (thunkAPI) => {
    const res = await axios({
      method: 'GET',
      url: favouritesUrl,
      responseType: 'json',
    })
    return res.data
  }
)

// Define a type for the slice state
interface FavouritesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  data: Favourite[]
}

// Define the initial state using that type
const initialState: FavouritesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  data: [],
}

// SLICE
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all
    builder.addCase(fetchFavourites.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      state.loading = 'done'
      state.results = action.payload.results
      state.data = action.payload.data
    })
    builder.addCase(fetchFavourites.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

const selectFavourites = (state: RootState) => state.favourites.data

export const selectFavouritesLoading = (state: RootState) =>
  state.favourites.loading

export const selectAllFavourites = createSelector(
  [selectFavourites],
  (favourites) => favourites
)

export const selectUserFavourites = createSelector(
  [selectFavourites, (state, userId) => userId],
  (favourites, userId) =>
    favourites && userId
      ? favourites.filter((favourite) => favourite.author._id === userId)
      : []
)

export const selectCityFavourites = createSelector(
  [selectFavourites, (state, cityId) => cityId],
  (favourites, cityId) =>
    favourites && cityId
      ? favourites.filter((favourite) => favourite.city === cityId)
      : []
)

export const selectItineraryFavourites = createSelector(
  [selectFavourites, (state, itineraryId) => itineraryId],
  (favourites, itineraryId) =>
    favourites && itineraryId
      ? favourites.filter(
          (favourite) => favourite.itinerary._id === itineraryId
        )
      : []
)

export const selectActivityFavourites = createSelector(
  [selectFavourites, (state, activityId) => activityId],
  (favourites, activityId) =>
    favourites && activityId
      ? favourites.filter((favourite) => favourite.activity._id === activityId)
      : []
)

// Extract and export each action creator by name (not thunks)
// export const { } = favouritesSlice.actions

// // Export the reducer as a default export
export default favouritesSlice.reducer
