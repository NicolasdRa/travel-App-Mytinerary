import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { ItinerariesService } from '../services'
import { itinerariesUrl } from '../constants'
import { Itinerary, Comment, Activity } from '../@types/types'
import { RootState } from './store'

// THUNKS
export const fetchItineraries = createAsyncThunk(
  'itineraries/fetchAll',
  async () => {
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
  async (id: any) => {
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
  async (title: string | undefined) => {
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
  async (id: any) => {
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
  async (formData: FormData) => {
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
      prepare(data: Activity) {
        return {
          payload: data,
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

const selectItinerary = (state: RootState) => state.itineraries.currentItinerary

export const selectItinerariesLoading = (state: RootState) =>
  state.itineraries.loading

export const selectAllItineraries = createSelector(
  [selectItineraries],
  (itineraries) => itineraries
)

export const selectCurrentItinerary = createSelector(
  [selectItinerary],
  (currentItinerary) => currentItinerary
)

export const selectRandomItinerary = createSelector(
  [selectAllItineraries],
  (items) => items[Math.floor(Math.random() * items.length)]
)

export const selectItinerariesForCity = createSelector(
  [selectAllItineraries, (state, cityName) => cityName],
  (itineraries: Itinerary[], cityName) =>
    itineraries.filter((item) => item.cityName === cityName)
)

export const selectItinerariesByUserId = createSelector(
  [selectAllItineraries, (state, id) => id],
  (itineraries: Itinerary[], id) => itineraries.filter((item: Itinerary) => item.author._id === id)
)

// This selector is working fine => DO I NEED IT? => check the correct way to call it in ItineraryPage => need to populate itineraries (get all) with comments, favourites and activities to be able to use it in full => analise if it is worth doing it
export const selectItineraryByTitle = createSelector(
  [selectAllItineraries, (state, title) => title],
  (itineraries: Itinerary[], title) =>
    itineraries.filter((itinerary: Itinerary) => itinerary.title === title)[0]
)

// Extract and export each action creator by name
export const { updateItineraryComments, updateItineraryActivities } =
  itinerariesSlice.actions

// // Export the reducer as a default export
export default itinerariesSlice.reducer
