import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { itinerariesUrl } from '../../constants'

// THUNKS
export const fetchItineraries = createAsyncThunk(
  'itineraries/fetchAll',
  async (thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: itinerariesUrl,
      responseType: 'json',
    })
    return res.data
  }
)

export const fetchItineraryById = createAsyncThunk(
  'itineraries/fetchItineraryById',
  async (id, thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: `${itinerariesUrl}${id}`,
      responseType: 'json',
    })
    return res.data
  }
)

export const fetchItineraryByTitle = createAsyncThunk(
  'itineraries/fetchItineraryByTitle',
  async (title, thunkAPI) => {
    const res = await axios({
      method: 'get',
      url: `${itinerariesUrl}/title/${title}`,
      responseType: 'json',
    })
    return res.data
  }
)

export const addItinerary = createAsyncThunk(
  'itineraries/addOne',
  async (formData, thunkAPI) => {
    const res = await axios({
      method: 'POST',
      url: itinerariesUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
    return res.data
  }
)

// SLICE
const itinerariesSlice = createSlice({
  name: 'itineraries',
  initialState: {
    loading: 'idle',
    status: '',
    results: '',
    data: [],
  },
  reducers: {
    updateItineraryComments: {
      reducer(state, action) {
        state.currentItinerary.comments.unshift(action.payload)
      },
      prepare(comment) {
        return {
          payload: comment,
        }
      },
    },
    updateItineraryActivities: {
      reducer(state, action) {
        state.currentItinerary.activities.unshift(action.payload)
      },
      prepare(activity) {
        return {
          payload: activity,
        }
      },
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchItineraries.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.data = action.payload.data
    },
    [fetchItineraries.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
    [addItinerary.fulfilled]: (state, action) => {
      const newItinerary = action.payload.data.data
      state.loading = 'done'
      state.data.unshift(newItinerary)
    },
    [addItinerary.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },

    [fetchItineraryByTitle.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentItinerary = action.payload.data
    },
    [fetchItineraryByTitle.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },

    [fetchItineraryById.fulfilled]: (state, action) => {
      state.loading = 'done'
      state.currentItinerary = action.payload.data
    },
    [fetchItineraryById.rejected]: (state, action) => {
      state.loading = 'fail'
      state.error = action.payload
    },
  },
})

// SELECTORS
const selectItineraries = (state) => state.itineraries.data

export const selectCurrentItinerary = (state) =>
  state.itineraries.currentItinerary

export const selectItinerariesLoading = (state) => state.itineraries.loading

export const selectAllItineraries = createSelector(
  [selectItineraries],
  (itineraries) => itineraries
)

// FIXME: fix this selector or leave the one above without createSelector
// export const selectCurrentItinerary = createSelector(
//   [selectItineraries],
//   (itineraries) => itineraries.currentItinerary,
// );

export const selectAllItinerariesForCity = createSelector(
  [selectAllItineraries, (state, city) => city],
  (itineraries, city) =>
    itineraries && city
      ? itineraries.filter((itinerary) => itinerary.city === city)
      : []
)

export const selectItineraryByTitle = createSelector(
  [selectAllItineraries, (state, title) => title],
  (itineraries, title) =>
    itineraries && title
      ? itineraries.filter((itinerary) => itinerary.title === title)
      : []
)

export const selectItinerariesByUser = createSelector(
  [selectAllItineraries, (state, userName) => userName],
  (itineraries, userName) =>
    itineraries && userName
      ? itineraries.filter(
          (itinerary) => itinerary.author.userName === userName
        )
      : []
)

export const selectItinerariesByUserId = createSelector(
  [selectAllItineraries, (state, id) => id],
  (itineraries, id) =>
    itineraries && id
      ? itineraries.filter((itinerary) => itinerary.author._id === id)
      : []
)

// Extract and export each action creator by name
export const {
  deleteItinerary,
  updateItineraryComments,
  updateItineraryActivities,
} = itinerariesSlice.actions

// // Export the reducer as a default export
export default itinerariesSlice.reducer
