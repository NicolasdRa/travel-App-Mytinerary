import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { favouritesUrl } from '../../constants'

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

// SLICE
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    loading: 'idle',
    results: 0,
    data: [],
  },
  reducers: {},
  extraReducers: {
    // fetch all
    [fetchFavourites.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.results = action.payload.results
      state.data = action.payload.data
    },
    [fetchFavourites.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

const selectFavourites = (state) => state.favourites.data

export const selectFavouritesLoading = (state) => state.favourites.loading

export const selectAllFavourites = createSelector(
  [selectFavourites],
  (favourites) => favourites
)

export const selectUserFavourites = createSelector(
  [selectFavourites, (state, userId) => userId],
  (favourites, userId) =>
    favourites && userId
      ? favourites.filter((favourite) => favourite.author.user === userId)
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
      ? favourites.filter((favourite) => favourite.itinerary === itineraryId)
      : []
)

export const selectActivityFavourites = createSelector(
  [selectFavourites, (state, activityId) => activityId],
  (favourites, activityId) =>
    favourites && activityId
      ? favourites.filter((favourite) => favourite.activity === activityId)
      : []
)

// Extract and export each action creator by name (not thunks)
// export const { } = favouritesSlice.actions

// // Export the reducer as a default export
export default favouritesSlice.reducer
