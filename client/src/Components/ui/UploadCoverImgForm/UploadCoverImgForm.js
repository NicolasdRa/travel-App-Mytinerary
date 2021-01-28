import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useImageCropper from '../../../hooks/useImageCropper'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import { readFile } from '../../utils/imageUtils'
import './styles.css'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import ImageButton from '../ImageButton/ImageButton'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import {
  updateProfileCoverImage,
  loadCurrentUser,
} from '../../Redux/usersSlice'

import { useStyles } from './styles'

const UploadCoverImgForm = ({ origin, loadFile, loadPreviewFile }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // Global state - user info
  const { coverImg } = useSelector((state) => state.users.currentUser)

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)

  const {
    zoom,
    setZoom,
    crop,
    setCrop,
    rotation,
    setRotation,
    croppedImageFile,
    handleCropComplete,
  } = useImageCropper(imageSrc)

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef(null)
  const handleClick = (e) => {
    hiddenInput.current.click()
  }

  // handles file input changes
  const handleChangeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      setImageSrc(imageDataUrl)
    }
  }

  // submits image if in UpdateProfileForm Component
  const handleSubmit = (e) => {
    e.preventDefault()
    // createCroppedImageFile();

    const formData = new FormData()
    formData.append('coverImg', croppedImageFile)

    dispatch(updateProfileCoverImage(formData))
    dispatch(loadCurrentUser())
    setOpen(false)
    setImageSrc(null)
  }

  // loads image if in createItineraryComponent
  // const handleLoadImage = () => {
  //   loadFile(croppedImageFile)

  // }

  // const handleLoadPreviewFile = () => {
  //   loadPreviewFile(imageSrc)

  //   console.log(imageSrc)
  // }

  const handleLoadImage = () => {
    loadFile(croppedImageFile)
    loadPreviewFile(imageSrc)
    console.log(croppedImageFile)
    console.log(imageSrc)
  }

  const handleClearImage = (e) => {
    setImageSrc(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {origin === 'profileForm' ? (
        <ImageButton coverImg={coverImg} handleClick={handleClickOpen} />
      ) : (
        <Box className={classes.photoIconContainer}>
          <Typography variant="body2">Add a photo</Typography>
          <IconButton onClick={handleClickOpen}>
            <AddAPhotoIcon color="secondary" className={classes.photo_icon} />
          </IconButton>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="body2">
              Choose and adjust your cover image
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.contentContainer}>
            {imageSrc ? (
              <Box className={classes.previewContainer}>
                <div className={classes.cropContainer}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={handleCropComplete}
                  />
                </div>
                <div className={classes.controls}>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}>
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ root: classes.slider }}
                    />
                  </div>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}>
                      Rotate
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      classes={{ root: classes.slider }}
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </div>
                </div>
              </Box>
            ) : (
              <Box className={classes.photoIconContainer}>
                <input
                  style={{ display: 'none' }}
                  id="customFile"
                  onChange={handleChangeFile}
                  type="file"
                  ref={hiddenInput}
                />
                <IconButton onClick={handleClick}>
                  <AddAPhotoIcon
                    color="secondary"
                    className={classes.photo_icon}
                  />
                </IconButton>
              </Box>
            )}
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {imageSrc ? (
              <Button onClick={handleClearImage} color="default">
                Clear
              </Button>
            ) : null}
            <Button
              onClick={
                origin === 'profileForm' ? handleSubmit : handleLoadImage
              }
              color="secondary">
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default UploadCoverImgForm
