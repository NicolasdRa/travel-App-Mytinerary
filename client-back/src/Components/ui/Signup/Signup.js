import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'
import PuffLoader from 'react-spinners/PuffLoader'

import { selectLoginLoading, signupUser } from '../../Redux/authSlice'

import { useStyles } from './styles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useForm } from '../../../hooks/useForm'

export const Signup = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(selectLoginLoading)
  // const loading = 'pending'

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  // useForm hook
  const [formValues, handleInputChange, reset] = useForm({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO: improve error handlig here showing a snackbar if error
    // TODO: check if loader reads pending state dispatched in thunk
    dispatch(signupUser(formValues)).catch((error) => console.log(error))
    history.replace(redirectPath)
  }

  return (
    <Paper className={classes.main}>
      <Box className={classes.container}>
        <Typography
          variant={matches ? 'h4' : 'h5'}
          color="primary"
          className={classes.title}
        >
          Welcome to Mytinerary
        </Typography>

        <Button
          className={classes.google_button}
          variant="outlined"
          href="http://localhost:5000/api/v1/auth/google"
          startIcon={<GoogleSVGIcon />}
        >
          Sign up with Google
        </Button>

        <Box disableTypography className={classes.subtitle}>
          <Typography variant="body2">
            {' '}
            or signup with email & password
          </Typography>
        </Box>

        <form className={classes.form}>
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
            className={classes.input_field}
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
            className={classes.input_field}
          />
          <TextField
            required
            autoFocus
            minLength="6"
            margin="dense"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            fullWidth
            className={classes.input_field}
          />
          <TextField
            required
            autoFocus
            minLength="6"
            margin="dense"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={handleInputChange}
            fullWidth
            className={classes.input_field}
          />
          <Box className={classes.btns}>
            {loading !== 'pending' ? (
              <Button
                className={classes.loginBtn}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Sign up
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
                  Signing up...
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
          Already have an account?{'  '}
          <Link to="/login">Log in</Link>
        </Typography>

        <Typography variant="caption">
          By proceeding you agree to Mytinerary’s Privacy Policy, User Agreement
          and T&Cs.
        </Typography>
      </Box>
    </Paper>
  )
}
