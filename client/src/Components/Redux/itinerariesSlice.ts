import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { itinerariesUrl } from '../../constants'
import { Itinerary, Comment, Activity } from '../../@types/types'
import { RootState } from './store'

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

export const deleteItinerary = createAsyncThunk(
  'itineraries/deleteOne',
  async (id, thunkAPI) => {
    const res = await axios({
      method: 'delete',
      url: `${itinerariesUrl}${id}`,
      responseType: 'json',
    })
    return res.data
  }
)

export const addItinerary = createAsyncThunk(
  'itineraries/addOne',
  async (formData: FormData, thunkAPI) => {
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

// Define a type for the slice state
interface ItinerariesSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  currentItinerary: Itinerary | null
  data: Itinerary[]
}

// Define the initial state using that type
const initialState: ItinerariesSlice = {
  loading: 'idle',
  status: '',
  results: '',
  currentItinerary: null,
  data: [],
}

// SLICE
const itinerariesSlice = createSlice({
  name: 'itineraries',
  initialState,
  reducers: {
    updateItineraryComments: {
      reducer(state, action: PayloadAction<Comment>) {
        state.currentItinerary &&
          state.currentItinerary.comments.unshift(action.payload)
      },
      prepare(data: Comment) {
        return {
          payload: data,
        }
      },
    },
    updateItineraryActivities: {
      reducer(state, action: PayloadAction<Activity>) {
        state.currentItinerary &&
          state.currentItinerary.activities.unshift(action.payload)
      },
      prepare(activity) {
        return {
          payload: activity,
        }
      },
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchItineraries.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchItineraries.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload.data
    })
    builder.addCase(fetchItineraries.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(addItinerary.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(addItinerary.fulfilled, (state, action) => {
      const newItinerary = action.payload.data.data
      state.loading = 'done'
      state.data.unshift(newItinerary)
    })
    builder.addCase(addItinerary.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(deleteItinerary.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(deleteItinerary.fulfilled, (state, action) => {
      const deletedItinerary = action.payload.data.data
      state.loading = 'done'
      state.data = state.data.filter(
        (itinerary) => itinerary._id !== deletedItinerary._id
      )
    })
    builder.addCase(deleteItinerary.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchItineraryById.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchItineraryById.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentItinerary = action.payload.data
    })
    builder.addCase(fetchItineraryById.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchItineraryByTitle.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchItineraryByTitle.fulfilled, (state, action) => {
      state.loading = 'done'
      state.currentItinerary = action.payload.data
    })
    builder.addCase(fetchItineraryByTitle.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

// SELECTORS
const selectItineraries = (state: RootState) => state.itineraries.data

export const selectCurrentItinerary = (state: RootState) =>
  state.itineraries.currentItinerary

export const selectItinerariesLoading = (state: RootState) =>
  state.itineraries.loading

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
export const { updateItineraryComments, updateItineraryActivities } =
  itinerariesSlice.actions

// // Export the reducer as a default export
export default itinerariesSlice.reducer
