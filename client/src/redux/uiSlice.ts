import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// THUNKS

// INTERFACE
interface UiSlice {
  forms: {
    logInForm: {
      open: boolean
    }
    signUpForm: {
      open: boolean
    }
    addItemForm: {
      open: boolean
      type: string | undefined
    }
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
    logInForm: { open: false },
    signUpForm: { open: false },
    addItemForm: {
      open: false,
      type: undefined,
    },
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
    toggleLogInForm(state) {
      const open = state.forms.logInForm.open

      state.forms.logInForm.open = !open
    },

    toggleSignUpForm(state) {
      const open = state.forms.logInForm.open

      state.forms.signUpForm.open = !open
    },
    toggleAddItemForm: {
      reducer(state, action: PayloadAction<{ type: string }>) {
        const open = state.forms.addItemForm.open

        state.forms.addItemForm.open = !open
        state.forms.addItemForm.type = action.payload.type
      },
      prepare(type) {
        return {
          payload: { type },
        }
      },
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
  toggleLogInForm,
  toggleSignUpForm,
  toggleSnackBar,
  toggleAddItemForm,
} = uiSlice.actions

// // Export the reducer as a default export
export default uiSlice.reducer
