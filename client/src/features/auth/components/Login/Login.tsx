import { Link, useNavigate } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import { useState } from 'react'

import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import GoogleSVGIcon from '../../../../components/ui/Icons/GoogleSVGIcon'
import { ForgotPasswordForm } from '../../../../components/forms/ForgotPasswordForm/ForgotPasswordForm'

import { logInUser, selectAuthLoading } from '../../authSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import { useForm } from '../../../../hooks/useForm'

import { StyledPaper } from './styles'
import { buildApiUrl, API_ENDPOINTS } from 'config'

const getGoogleAuthUrl = () => {
  return buildApiUrl(API_ENDPOINTS.auth.google)
}

export const Login = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loading = useAppSelector(selectAuthLoading)
  const [error, setError] = useState<string | null>(null)

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  // useForm hook
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError(null) // Clear previous errors


    try {
      // Wait for login to complete before navigating
      const result = await dispatch(logInUser(formValues))
      if (logInUser.fulfilled.match(result)) {
        // Login successful - navigate and reset
        navigate(redirectPath || '/', { replace: true })
        reset()
      } else {
        // Login failed - show error message
        const errorMessage = (result.payload as any)?.message || 'Login failed. Please check your credentials.'
        setError(errorMessage)
      }
    } catch (error) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.')
    }
  }



  return (
    <StyledPaper className="main">
      <Box className="container">
        <Typography
          variant={matches ? 'h4' : 'h5'}
          color="primary"
          className="title"
        >
          Welcome Back
        </Typography>

        <Button
          className="google_button"
          variant="outlined"
          href={getGoogleAuthUrl()}
          startIcon={<GoogleSVGIcon />}
        >
          Log in with Google
        </Button>

        <Box className="subtitle">
          <Typography variant="body2">
            or login with email & password
          </Typography>
        </Box>

        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="current-email"
            onChange={handleInputChange}
            className="input_field"
          />
          <TextField
            required
            autoFocus
            margin="dense"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            fullWidth
            className="input_field"
          />

          <ForgotPasswordForm />

          <Box className="btns">
            {loading !== 'pending' ? (
              <Button
                className="loginBtn"
                variant="contained"
                color="secondary"
                type="submit"
              >
                Log in
              </Button>
            ) : (
              <Box className="loader">
                <Box className="ringLoader">
                  <PuffLoader
                    color={theme.palette.primary.main}
                    loading={loading && false}
                    size={20}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="primary"
                  className="loaderText"
                >
                  Logging in...
                </Typography>
              </Box>
            )}
          </Box>
        </form>
        <Typography variant="body2" color="primary" className="bottomLink">
          Don't have an account?{'  '}
          <Link to="/signup">Sign Up</Link>
        </Typography>

        <Typography variant="caption">
          By proceeding you agree to Mytinerary’s Privacy Policy, User Agreement
          and T&Cs.
        </Typography>
      </Box>
    </StyledPaper>
  )
}
