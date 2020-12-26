import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
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
import UploadCoverImgForm from '../UploadCoverImgForm/UploadCoverImgForm'
import UploadProfileImgForm from '../UploadProfileImgForm/UploadProfileImgForm'
import { updateUserProfile, loadCurrentUser } from '../../Redux/usersSlice'

import { useStyles } from './styles'

const UpdateProfileForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  // Global state - user info
  const { userName, firstName, lastName, details } = useSelector(
    (state) => state.users.currentUser,
  )

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    details: '',
  })

  const handleChangeProfile = (e) => {
    const { id, value } = e.target
    setProfile({ ...profile, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('userName', profile.userName)
    formData.append('firstName', profile.firstName)
    formData.append('lastName', profile.lastName)
    formData.append('details', profile.details)

    dispatch(updateUserProfile(formData))
    dispatch(loadCurrentUser())
    setOpen(false)
  }

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
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="h6" color="primary">
              Update your profile
            </Typography>
          </DialogTitle>
          <Typography
            variant="body1"
            color="inherit"
            className={classes.subtitle}>
            Change your images or edit your info
          </Typography>
          <UploadCoverImgForm />
          <UploadProfileImgForm />
          <DialogContent>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="userName"
              label="User Name"
              type="text"
              autoComplete="current-userName"
              defaultValue={userName}
              onChange={handleChangeProfile}
              className={classes.input_field}
            />
            <Grid item container className={classes.price_duration}>
              <Grid item xs={6} container>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  type="text"
                  autoComplete="current-firstName"
                  defaultValue={firstName}
                  onChange={handleChangeProfile}
                  className={classes.input_field}
                />
              </Grid>
              <Grid item xs={6} container>
                <TextField
                  required
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="lastName"
                  label="Last Name"
                  type="text"
                  autoComplete="current-lastName"
                  defaultValue={lastName}
                  onChange={handleChangeProfile}
                  className={classes.input_field}
                />
              </Grid>
            </Grid>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="details"
              label="Description"
              type="text"
              autoComplete="current-details"
              defaultValue={details}
              onChange={handleChangeProfile}
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

export default connect(null, { updateUserProfile })(UpdateProfileForm)
