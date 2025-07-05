import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { 
  logInUser, 
  logOutUser, 
  signupUser, 
  selectAuthenticated
} from '../authSlice'
import { LoginCredentials, SignupData } from '../types'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectAuthenticated)
  const currentUser = useAppSelector(selectCurrentUser)
  const loading = useAppSelector((state) => state.auth.loading)

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(logInUser(credentials))
      if (logInUser.fulfilled.match(result)) {
        const redirectPath = localStorage.getItem('lastPath')
        navigate(redirectPath || '/', { replace: true })
        return { success: true }
      } else {
        return { 
          success: false, 
          error: (result.payload as any)?.message || 'Login failed' 
        }
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }, [dispatch, navigate])

  const signup = useCallback(async (data: SignupData) => {
    try {
      const result = await dispatch(signupUser(data))
      if (signupUser.fulfilled.match(result)) {
        const redirectPath = localStorage.getItem('lastPath')
        navigate(redirectPath || '/', { replace: true })
        return { success: true }
      } else {
        return { 
          success: false, 
          error: (result.payload as any)?.message || 'Signup failed' 
        }
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }, [dispatch, navigate])

  const logout = useCallback(async () => {
    try {
      await dispatch(logOutUser())
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [dispatch, navigate])

  return {
    isAuthenticated,
    currentUser,
    loading,
    login,
    signup,
    logout
  }
}