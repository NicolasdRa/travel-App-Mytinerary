import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core'
import GoogleSVGIcon from '../Icons/GoogleSVGIcon'

import { signupUser } from '../../Redux/authSlice'
import { openSignUpForm, closeSignUpForm } from '../../Redux/formsSlice'

import { useStyles } from './styles'

const Signup = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // Form state
  const [signupData, setSignupData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  // Open form state
  const open = useSelector((state) => state.forms.openSignUpForm)

  const handleOpenForm = () => dispatch(openSignUpForm())
  const handleCloseForm = () => dispatch(closeSignUpForm())

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { userName, email, password, passwordConfirm } = signupData
    const user = {
      userName,
      email,
      password,
      passwordConfirm,
    }

    dispatch(signupUser(user))
    setSignupData({
      [e.target.id]: '',
    })
    handleCloseForm()
  }

  return (
    <div>
      <Button color="secondary" onClick={handleOpenForm}>
        Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="body2">Easy Signup</Typography>
          </DialogTitle>
          <DialogContent>
            <Button
              className={classes.google_button}
              variant="outlined"
              //   color='secondary'
              // component={Link}
              // to='api/auth/google'
              href="http://localhost:5000/api/v1/auth/google"
              startIcon={<GoogleSVGIcon />}>
              Sign up with Google
            </Button>

            <DialogTitle
              id="form-dialog-title"
              disableTypography
              className={classes.subtitle}>
              <Typography variant="body2">Sign up with your info</Typography>
            </DialogTitle>

            <TextField
              required
              autoFocus
              margin="dense"
              name="userName"
              label="User Name"
              type="userName"
              autoComplete="current-firstName"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              fullWidth
              className={classes.input_field}
            />
            <Typography variant="body2" className={classes.text}>
              By proceeding you agree to Mytinerary’s Privacy Policy, User
              Agreement and T&Cs.
            </Typography>
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleCloseForm} color="primary">
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

export default Signup
