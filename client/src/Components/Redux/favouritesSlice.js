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

export const addFavourite = createAsyncThunk(
  'favourites/addOne',
  async (formData, thunkAPI) => {
    const res = await axios({
      method: 'POST',
      url: favouritesUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return res.data
  }
)

export const deleteFavourite = createAsyncThunk(
  'favourites/deleteOne',
  async (formData, thunkAPI) => {
    const id = formData.id
    const res = await axios({
      method: 'DELETE',
      url: `${favouritesUrl}/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
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
    data: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
  },
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
    // add one
    [addFavourite.fulfilled]: (state, action) => {
      const newFavourite = action.payload.data.data
      state.loading = 'done'
      state.data.unshift(newFavourite)
    },
    [addFavourite.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
    // delete one
    [deleteFavourite.fulfilled]: (state, action) => {
      const favourite = action.payload.data.data
      state.loading = 'done'
      state.data.filter((stateFavourite) => stateFavourite.id !== favourite.id)
    },
    [deleteFavourite.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

const selectFavourites = (state) => state.itineraries.data

export const selectItinerariesLoading = (state) => state.itineraries.loading

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

// Extract and export each action creator by name (not thunks)
// export const { } = favouritesSlice.actions

// // Export the reducer as a default export
export default favouritesSlice.reducer
