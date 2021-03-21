import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import UpdateProfileCoverImgForm from '../UpdateProfileCoverImgForm/UpdateProfileCoverImgForm'
import UpdateProfileImgForm from '../UpdateProfileImgForm/UpdateProfileImgForm'
import { updateUserProfile } from '../../Redux/usersSlice'

import { useForm } from '../../../hooks/useForm'
import { useStyles } from './styles'

const EditProfileForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // Global state - user info
  const { userName, firstName, lastName, details } = useSelector(
    (state) => state.users.currentUser
  )

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)

  // useForm hook
  const [formValues, handleInputChange, reset] = useForm({
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    details: details,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const { userName, firstName, lastName, details } = formValues

    const formData = new FormData()
    formData.append('userName', userName)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('details', details)

    dispatch(updateUserProfile(formData))
    reset()
    setOpen(false)
  }

  const loadPreviewFile = () => console.log('from update profile form')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        EDIT PROFILE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}
          >
            <Typography variant="h6" color="primary">
              Edit your profile info
            </Typography>
          </DialogTitle>
          <Typography
            variant="body1"
            color="inherit"
            className={classes.subtitle}
          >
            Change your images or edit your info
          </Typography>
          <UpdateProfileCoverImgForm
            origin="profileForm"
            loadPreviewFile={loadPreviewFile}
          />
          <UpdateProfileImgForm />
          <DialogContent>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="userName"
              label="User Name"
              type="text"
              autoComplete="current-userName"
              defaultValue={userName}
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <Grid item container className={classes.price_duration}>
              <Grid item xs={6} container>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  margin="dense"
                  name="firstName"
                  label="First Name"
                  type="text"
                  autoComplete="current-firstName"
                  defaultValue={firstName}
                  onChange={handleInputChange}
                  className={classes.input_field}
                />
              </Grid>
              <Grid item xs={6} container>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  margin="dense"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  autoComplete="current-lastName"
                  defaultValue={lastName}
                  onChange={handleInputChange}
                  className={classes.input_field}
                />
              </Grid>
            </Grid>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="details"
              label="Description"
              type="text"
              autoComplete="current-details"
              defaultValue={details}
              onChange={handleInputChange}
              className={classes.input_field}
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

export default EditProfileForm
