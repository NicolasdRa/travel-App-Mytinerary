import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import {
  Box,
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
import { updateUserProfile } from '../../Redux/users/userActions'
import { makeStyles } from '@material-ui/core/styles'
import { loadCurrentUser } from '../../Redux/users/userActions'

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: '100%',
    // backgroundSize: 'cover'
  },

  title: {
    margin: '2rem 0 1rem 0',
    padding: 0,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'primary',
    fontWeight: 600,
  },

  subtitle: {
    fontSize: '.8rem',
    margin: '1rem 0 1.5rem 0 ',
    padding: 0,
    textAlign: 'center',
  },

  input_field: {
    margin: '.8rem 0',
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },

  formControl: {
    display: 'flex',
    justifySelf: 'space-between',
    minWidth: '30%',
  },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem',
  },

  btns: {
    paddingLeft: '1rem',
  },

  photo_icon: {
    height: '3rem',
    width: '3rem',
  },

  add_btn: {
    position: 'fixed',
    bottom: '4rem',
    right: '1.5rem',
    zIndex: '1000',
  },
}))

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

  // const [file, setFile] = useState(null)

  // const handleChangeFile = (e) => {
  //   setFile(e.target.files[0])
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('userName', profile.userName)
    formData.append('firstName', profile.firstName)
    formData.append('lastName', profile.lastName)
    formData.append('details', profile.details)
    // formData.append('img', file)

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
      <Button color='secondary' onClick={handleClickOpen}>
        EDIT PROFILE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          {/* <img
            className={classes.coverImage}
            src={coverImg}
            alt='background image'
          /> */}

          <DialogTitle
            id='form-dialog-title'
            disableTypography
            className={classes.title}>
            <Typography variant='h6' color={'primary'}>
              Update your profile
            </Typography>
          </DialogTitle>
          <Typography
            variant='body1'
            color={'primary'}
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
              margin='dense'
              id='userName'
              label='User Name'
              type='text'
              autoComplete='current-userName'
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
                  margin='dense'
                  id='firstName'
                  label='First Name'
                  type='text'
                  autoComplete='current-firstName'
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
                  margin='dense'
                  id='lastName'
                  label='Last Name'
                  type='text'
                  autoComplete='current-lastName'
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
              margin='dense'
              id='details'
              label='Description'
              type='text'
              autoComplete='current-details'
              defaultValue={details}
              onChange={handleChangeProfile}
              className={classes.input_field}
            />
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color='secondary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default connect(null, { updateUserProfile })(UpdateProfileForm)
