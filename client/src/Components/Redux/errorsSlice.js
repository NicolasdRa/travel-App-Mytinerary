import { createSlice } from '@reduxjs/toolkit'

// THUNKS

// SLICE
const errorsSlice = createSlice({
  name: 'errors',
  initialState: { error: null },
  reducers: {
    // standard reducer logic, with auto-generated action types
    returnErrors(state, action) {
      // "mutate" the array by calling push()
      state.push(action.payload)
    },
    clearErrors(state) {
      state.error = null
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
})

// Extract and export each action creator by name
export const { returnErrors, clearErrors } = errorsSlice.actions

// // Export the reducer as a default export
export default errorsSlice.reducer
