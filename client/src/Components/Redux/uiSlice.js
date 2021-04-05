import { createSlice } from '@reduxjs/toolkit'

// THUNKS

// SLICE
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    forms: {
      openLogInForm: false,
      openSignUpForm: false,
    },
    snackBar: { open: false, severity: '', msg: '' },
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
    toggleSnackBar: {
      reducer(state, action) {
        const open = state.snackBar.open

        state.snackBar.open = !open
        state.snackBar.severity = action.payload.severity
        state.snackBar.msg = action.payload.msg
      },
      prepare(severity, msg) {
        return {
          payload: { severity, msg },
        }
      },
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
  toggleSnackBar,
} = uiSlice.actions

// // Export the reducer as a default export
export default uiSlice.reducer
