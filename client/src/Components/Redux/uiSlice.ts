import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// THUNKS

// INTERFACE
interface UiSlice {
  forms: {
    openLogInForm: boolean
    openSignUpForm: boolean
  }
  snackBar: {
    open: boolean
    severity: string
    msg: string
  }
}

// INITIAL STATE
const initialState: UiSlice = {
  forms: {
    openLogInForm: false,
    openSignUpForm: false,
  },
  snackBar: {
    open: false,
    severity: '',
    msg: '',
  },
}

// SLICE
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types
    openLogInForm(state) {
      state.forms.openLogInForm = true
    },
    closeLogInForm(state) {
      state.forms.openLogInForm = false
    },
    openSignUpForm(state) {
      state.forms.openSignUpForm = true
    },
    closeSignUpForm(state) {
      state.forms.openSignUpForm = false
    },
    toggleSnackBar: {
      reducer(state, action: PayloadAction<{ severity: string; msg: string }>) {
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
