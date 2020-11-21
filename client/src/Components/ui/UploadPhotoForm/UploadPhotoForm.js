import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core'
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'
import ImageButton from '../ImageButton/ImageButton'
import { updateUserProfile } from '../../Redux/users/userActions'
import { makeStyles } from '@material-ui/core/styles'
import { loadCurrentUser } from '../../Redux/users/userActions'

const useStyles = makeStyles(theme => ({
  coverImage: {
    width: '100%'
  },

  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center'
  },

  subtitle: {
    margin: '2.5rem 0 0 0 ',
    padding: 0,
    textAlign: 'center'
  },

  input_field: {
    margin: '.8rem 0'
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center'
  },

  formControl: {
    display: 'flex',
    justifySelf: 'space-between',
    minWidth: '30%'
  },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem'
  },

  btns: {
    paddingLeft: '1rem'
  },

  photo_icon: {
    height: '3rem',
    width: '3rem'
  },

  add_btn: {
    position: 'fixed',
    bottom: '4rem',
    right: '1.5rem',
    zIndex: '1000'
  }
}))

const UploadPhotoForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  // Global state - user info
  const { img, coverImg } = useSelector(state => state.users.currentUser)

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)

  const handleChangeFile = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('img', file)

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
      <ImageButton coverImg={coverImg} handleClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          {/* <img
            className={classes.coverImage}
            src={coverImg}
            alt='background image'
          /> */}

          <DialogTitle
            id='form-dialog-title'
            disableTypography
            className={classes.title}
          >
            <Typography variant='body2'>Update your cover image</Typography>
          </DialogTitle>
          <DialogContent>
            <Box>
              <input
                // style={{ display: 'none' }}
                type='file'
                onChange={handleChangeFile}
                // ref={fileInput => (this.fileInput = fileInput)}
              />
            </Box>
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color='secondary'>
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default connect(null, { updateUserProfile })(UploadPhotoForm)
