import { Link, useNavigate } from 'react-router-dom'

import { Box, Button, TextField, Typography } from '@mui/material'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import PuffLoader from 'react-spinners/PuffLoader'

import { selectLoginLoading, signupUser } from '../../../redux/authSlice'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useForm } from '../../../hooks/useForm'
import { StyledPaper } from './styles'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

export const Signup = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loading = useAppSelector(selectLoginLoading)
  // const loading = 'pending'

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  // useForm hook
  const { values: formValues, handleInputChange } = useForm({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // TODO: improve error handlig here showing a snackbar if error
    // TODO: check if loader reads pending state dispatched in thunk
    dispatch(signupUser(formValues)).catch((error) => console.log(error))
    navigate(`'${redirectPath}'`, { replace: true })
  }

  return (
    <StyledPaper>
      <Box className="container">
        <Typography
          variant={matches ? 'h4' : 'h5'}
          color="primary"
          className="title"
        >
          Welcome to Mytinerary
        </Typography>

        <Button
          className="google_button"
          variant="outlined"
          href="http://localhost:5000/api/v1/auth/google"
          startIcon={<GoogleSVGIcon />}
        >
          Sign up with Google
        </Button>

        <Box className="subtitle">
          <Typography variant="body2">
            or signup with email & password
          </Typography>
        </Box>

        <form className="form">
          <TextField
            required
            autoFocus
            margin="dense"
            name="userName"
            label="User Name"
            type="userName"
            autoComplete="current-firstName"
            onChange={handleInputChange}
            fullWidth
            className="input_field"
          />
          <TextField
            required
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="current-email"
            onChange={handleInputChange}
            fullWidth
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
          <TextField
            required
            autoFocus
            margin="dense"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={handleInputChange}
            fullWidth
            className="input_field"
          />
          <Box className="btns">
            {loading !== 'pending' ? (
              <Button
                className="loginBtn"
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Sign up
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
                  Signing up...
                </Typography>
              </Box>
            )}
          </Box>
        </form>
        <Typography variant="body2" color="primary" className="bottomLink">
          Already have an account?{'  '}
          <Link to="/login">Log in</Link>
        </Typography>

        <Typography variant="caption">
          By proceeding you agree to Mytinerary’s Privacy Policy, User Agreement
          and T&Cs.
        </Typography>
      </Box>
    </StyledPaper>
  )
}
