import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material'
import { forgotPassword } from '../../../redux/authSlice'

import { useForm } from '../../../hooks/useForm'
import { StyledContainer } from './styles'
import { useAppDispatch } from '../../../redux/hooks'

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { values: formValues, handleInputChange } = useForm({
    email: '',
  })

  const handleSubmit = (e: any) => {
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

  const handleCloseSnackBar:
    | ((
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
      ) => void)
    | undefined = (e, reason) => {
    reason === 'clickaway' && setOpenSnackBar(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <StyledContainer>
      <Button className="btn" color="primary" onClick={handleClickOpen}>
        Forgot Password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <DialogTitle id="form-dialog-title" className="title">
            <Typography variant="h6">Forgot your Password?</Typography>
          </DialogTitle>
          <DialogTitle id="form-dialog-subtitle" className="subtitle">
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
              className="input_field"
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
          <DialogActions className="btns">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </StyledContainer>
  )
}
