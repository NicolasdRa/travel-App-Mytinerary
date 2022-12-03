import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'

import { resetPassword } from '../../Redux/authSlice'
import { useForm } from '../../../hooks/useForm'

import { useStyles } from './styles'

export const PasswordResetForm = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // must be outside handleSubmit
  const redirectPath = localStorage.getItem('lastPath')

  const [openSnackBar, setOpenSnackBar] = useState(false)

  const [formValues, handleInputChange] = useForm({
    password: '',
    passwordConfirm: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { ...formValues, resetToken: match.params.resetToken }

    dispatch(resetPassword(data))
    setOpenSnackBar(true)
    setTimeout(() => {
      setOpenSnackBar(false)
      history.push(`/`)
    }, 3000)
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  return (
    <Paper className={classes.main}>
      <Box className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Reset your password
        </Typography>

        <Typography variant="body2" className={classes.subtitle}>
          Enter a new password, confirm and submit.
        </Typography>

        <Typography variant="body2" className={classes.paragraph}>
          You will be re-directed to the log in page shortly afterwards.
        </Typography>

        <form className={classes.form}>
          <TextField
            required
            autoFocus
            margin="dense"
            name="password"
            label="New Password"
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
            label="Confirm New Password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={handleInputChange}
            fullWidth
            className={classes.input_field}
          />
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={openSnackBar}
            autoHideDuration={4000}
            onClose={handleCloseSnackBar}
            message="Your password has been reset, please log in with your new password"
          />
          <Typography variant="body2" className={classes.text}>
            By proceeding you agree to Mytinerary’s Privacy Policy, User
            Agreement and T&Cs.
          </Typography>

          <Box className={classes.btns}>
            <Button
              component={Link}
              to={redirectPath}
              color="primary"
              className={classes.btn}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="secondary"
              className={classes.btn}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  )
}
