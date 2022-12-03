import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import PuffLoader from 'react-spinners/PuffLoader'

import {
  isLoggingIn,
  logInUser,
  selectLoginLoading,
} from '../../Redux/authSlice'

import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm'

import { useStyles } from './styles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useForm } from '../../../hooks/useForm'

export const Login = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(selectLoginLoading)
  // const loading = 'pending'

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  // useForm hook
  const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO: improve error handlig here showing a snackbar if error
    // TODO: check if loader reads pending state dispatched in thunk
    dispatch(logInUser(formValues)).catch((error) => console.log(error))

    navigate(redirectPath, { replace: true })

    reset()
  }

  return (
    <Paper className={classes.main}>
      <Box className={classes.container}>
        <Typography
          variant={matches ? 'h4' : 'h5'}
          color="primary"
          className={classes.title}
        >
          Welcome Back
        </Typography>

        <Button
          className={classes.google_button}
          variant="outlined"
          href="http://localhost:5000/api/v1/auth/google"
          startIcon={<GoogleSVGIcon />}
        >
          Log in with Google
        </Button>

        <Box className={classes.subtitle}>
          <Typography variant="body2">
            or login with email & password
          </Typography>
        </Box>

        <form className={classes.form}>
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
            className={classes.input_field}
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
            className={classes.input_field}
          />

          <ForgotPasswordForm className={classes.forgotPassword} />

          <Box className={classes.btns}>
            {loading !== 'pending' ? (
              <Button
                className={classes.loginBtn}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Log in
              </Button>
            ) : (
              <Box className={classes.loader}>
                <Box className={classes.ringLoader}>
                  <PuffLoader
                    color={theme.palette.primary.main}
                    loading={loading}
                    size={20}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="primary"
                  className={classes.loaderText}
                >
                  Logging in...
                </Typography>
              </Box>
            )}
          </Box>
        </form>
        <Typography
          variant="body2"
          color="primary"
          className={classes.bottomLink}
        >
          Don't have an account?{'  '}
          <Link to="/signup">Sign Up</Link>
        </Typography>

        <Typography variant="caption">
          By proceeding you agree to Mytinerary’s Privacy Policy, User Agreement
          and T&Cs.
        </Typography>
      </Box>
    </Paper>
  )
}
