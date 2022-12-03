import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { forgotPassword } from '../../Redux/authSlice'

import { useStyles } from './styles'
import { useForm } from '../../../hooks/useForm'

const ForgotPasswordForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const [formValues, handleInputChange] = useForm({
    email: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(forgotPassword(formValues))

    setOpenSnackBar(true)
    setTimeout(() => {
      setOpenSnackBar(false)
      handleClose()
    }, 2500)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <div className={classes.btnContainer}>
      <Button className={classes.btn} color="primary" onClick={handleClickOpen}>
        Forgot Password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}
          >
            <Typography variant="h6">Forgot your Password?</Typography>
          </DialogTitle>
          <DialogTitle
            id="form-dialog-subtitle"
            disableTypography
            className={classes.subtitle}
          >
            <Typography variant="body2">
              Enter your email address and submit. You will be sent an email to
              the address provided with a password reset link.
            </Typography>
          </DialogTitle>
          <DialogContent>
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
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={openSnackBar}
              autoHideDuration={4000}
              onClose={handleCloseSnackBar}
              message="A message with a password reset link has been sent to your email account."
            />
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default ForgotPasswordForm
