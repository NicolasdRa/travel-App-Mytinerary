import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { FavouritesService } from '../services'
import { RootState } from './store'
import { Favourite } from '../@types/types'

// THUNKS
export const fetchFavourites = createAsyncThunk(
  'favourites/fetchAll',
  async (thunkAPI) => {
    const data = await FavouritesService.getAllFavourites()
    return data
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

export const selectAllFavourites = (state: RootState) => state.favourites.data

export const selectFavouritesLoading = (state: RootState) =>
  state.favourites.loading

export const selectUserFavourites = createSelector(
  [selectAllFavourites, (state, userId) => userId],
  (favourites: Favourite[], userId) =>
    favourites && userId
      ? favourites.filter((favourite: Favourite) => favourite.author._id === userId)
      : []
)

export const selectCityFavourites = createSelector(
  [selectAllFavourites, (state, cityId) => cityId],
  (favourites: Favourite[], cityId) =>
    favourites && cityId
      ? favourites.filter((favourite: Favourite) => favourite.city === cityId)
      : []
)

export const selectItineraryFavourites = createSelector(
  [selectAllFavourites, (state, itineraryId) => itineraryId],
  (favourites: Favourite[], itineraryId) =>
    favourites && itineraryId
      ? favourites.filter(
          (favourite: Favourite) => favourite.itinerary._id === itineraryId
        )
      : []
)

export const selectActivityFavourites = createSelector(
  [selectAllFavourites, (state, activityId) => activityId],
  (favourites: Favourite[], activityId) =>
    favourites && activityId
      ? favourites.filter((favourite: Favourite) => favourite.activity._id === activityId)
      : []
)

// Extract and export each action creator by name (not thunks)
// export const { } = favouritesSlice.actions

// // Export the reducer as a default export
export default favouritesSlice.reducer
