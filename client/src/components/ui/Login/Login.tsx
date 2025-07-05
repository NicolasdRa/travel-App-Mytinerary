import { Link, useNavigate } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'

import { Box, Button, TextField, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import { ForgotPasswordForm } from '../../forms/ForgotPasswordForm/ForgotPasswordForm'

import { logInUser, selectLoginLoading } from '../../../redux/authSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { useForm } from '../../../hooks/useForm'

import { StyledPaper } from './styles'

export const Login = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loading = useAppSelector(selectLoginLoading)
  // const loading = 'pending'

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

    try {
      // Wait for login to complete before navigating
      const result = await dispatch(logInUser(formValues))
      if (logInUser.fulfilled.match(result)) {
        // Login successful - navigate and reset
        navigate(redirectPath || '/', { replace: true })
        reset()
      } else {
        // Login failed - show error (TODO: implement proper error display)
        console.log('Login failed:', result.payload)
      }
    } catch (error) {
      console.log('Login error:', error)
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
          href="http://localhost:5000/api/v1/auth/google"
          startIcon={<GoogleSVGIcon />}
        >
          Log in with Google
        </Button>

        <Box className="subtitle">
          <Typography variant="body2">
            or login with email & password
          </Typography>
        </Box>

        <form className="form">
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
                onClick={handleSubmit}
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
