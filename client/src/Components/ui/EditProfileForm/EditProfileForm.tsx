import { useState, useEffect } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { UploadCoverImgForm } from '../UploadCoverImgForm/UploadCoverImgForm'
import { UploadProfileImgForm } from '../UploadProfileImgForm/UploadProfileImgForm'
import ImageButton from '../ImageButton/ImageButton'
import ImageButtonRounded from '../ImageButtonRounded/ImageButtonRounded'

import { updateUserProfile } from '../../Redux/usersSlice'

import { base64StringtoFile } from '../../utils/imageUtils'

import { useForm } from '../../../hooks/useForm'
import { StyledContainer, StyledDialog } from './styles'
import { useAppDispatch } from '../../Redux/hooks'
import { User } from '../../../@types/types'

interface EditProfileFormProps {
  currentUser: User
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  currentUser: { userName, firstName, lastName, details, img, coverImg },
}) => {
  const dispatch = useAppDispatch()

  // Component level state
  const [open, setOpen] = useState(false)
  const [userFile, setUserFile] = useState<string | Blob>(img)
  const [userPreviewFile, setUserPreviewFile] = useState(null)
  const [coverFile, setCoverFile] = useState<string | Blob>(coverImg)
  const [coverPreviewFile, setCoverPreviewFile] = useState(null)

  // useForm hook
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    details: details,
    img: img,
    coverImg: coverImg,
  })

  useEffect(() => {
    if (userPreviewFile) {
      const file = base64StringtoFile(userPreviewFile, 'croppedImg.png')
      setUserFile(file)
    }
  }, [userPreviewFile])

  useEffect(() => {
    if (coverPreviewFile) {
      const file = base64StringtoFile(coverPreviewFile, 'croppedImg.png')
      setCoverFile(file)
    }
  }, [coverPreviewFile])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const { userName, firstName, lastName, details } = formValues

    const formData = new FormData()
    userFile && formData.append('img', userFile)
    coverFile && formData.append('coverImg', coverFile)
    formData.append('upload_preset', 'travel-app')
    formData.append('userName', userName)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('details', details)

    dispatch(updateUserProfile(formData))
    reset()
    setOpen(false)
  }

  const loadUserPreviewFile = (croppedImage: any) =>
    setUserPreviewFile(croppedImage)
  const loadCoverPreviewFile = (croppedImage: any) =>
    setCoverPreviewFile(croppedImage)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setUserPreviewFile(null)
    setCoverPreviewFile(null)
    setOpen(false)
  }

  return (
    <StyledContainer>
      <Stack direction="row" spacing={2}>
        <Button
          endIcon={<EditIcon className="edit-icon" />}
          color="secondary"
          onClick={handleClickOpen}
          className="trigger-btn"
        >
          Edit Profile
        </Button>
      </Stack>

      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form"
        >
          <DialogTitle id="form-dialog-title" className="title">
            Edit your profile info
          </DialogTitle>

          <Typography variant="body1" color="inherit" className="subtitle">
            Change your image or edit your info
          </Typography>

          {coverPreviewFile ? (
            <ImageButton
              coverImg={coverPreviewFile}
              handleClick={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          ) : (
            <UploadCoverImgForm
              origin="editProfileForm"
              loadPreviewFile={loadCoverPreviewFile}
              coverImg={coverImg}
            />
          )}
          {userPreviewFile ? (
            <ImageButtonRounded
              img={userPreviewFile}
              handleClick={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          ) : (
            <UploadProfileImgForm
              origin="editProfileForm"
              loadPreviewFile={loadUserPreviewFile}
              img={img}
            />
          )}
          <DialogContent>
            <TextField
              size="small"
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
              className="input_field"
            />
            <Grid item container className="price_duration">
              <Grid item xs={6} container>
                <TextField
                  size="small"
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
                  className="input_field"
                />
              </Grid>
              <Grid item xs={6} container>
                <TextField
                  size="small"
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
                  className="input_field"
                />
              </Grid>
            </Grid>
            <TextField
              size="small"
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
              className="input_field"
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
      </StyledDialog>
    </StyledContainer>
  )
}

export default EditProfileForm
