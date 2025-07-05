// Auth feature barrel exports
// All auth-related functionality colocated in this feature folder

// Components
export { Login } from './components/Login/Login'
export { Signup } from './components/Signup/Signup'

// Hooks
export { useAuth } from './hooks/useAuth'

// Redux
export {
  logInUser,
  logOutUser,
  signupUser,
  setUser,
  forgotPassword,
  resetPassword,
  selectAuthenticated,
  selectLoginLoading,
  isLoggedOut,
  default as authReducer
} from './authSlice'

// Types
export * from './types'