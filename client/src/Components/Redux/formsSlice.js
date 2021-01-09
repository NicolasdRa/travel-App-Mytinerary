import { createSlice } from '@reduxjs/toolkit'

// THUNKS

// SLICE
const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    openLogInForm: false,
    openSignUpForm: false,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types
    openLogInForm(state) {
      state.openLogInForm = true
    },
    closeLogInForm(state) {
      state.openLogInForm = false
    },
    openSignUpForm(state) {
      state.openSignUpForm = true
    },
    closeSignUpForm(state) {
      state.openSignUpForm = false
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
  },
})

// Extract and export each action creator by name
export const {
  openLogInForm,
  closeLogInForm,
  openSignUpForm,
  closeSignUpForm,
} = formsSlice.actions

// // Export the reducer as a default export
export default formsSlice.reducer
