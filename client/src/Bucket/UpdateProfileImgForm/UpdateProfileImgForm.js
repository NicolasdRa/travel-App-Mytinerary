import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cropper from 'react-easy-crop'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Typography,
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import { useImageCropper } from '../../hooks/useImageCropper'
import { base64StringtoFile } from '../../Components/utils/imageUtils'
import {
  updateUserProfile,
  selectCurrentUser,
} from '../../Components/Redux/usersSlice'
import ImageButtonRounded from '../../Components/ui/ImageButtonRounded/ImageButtonRounded'

import { useStyles } from './styles'

const UpdateProfileImgForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  // displays profile img at start
  const { img } = useSelector(selectCurrentUser)

  // Component level - File state
  const [previewFile, setPreviewFile] = useState(null)
  const [file, setFile] = useState(null)

  // cropper
  const {
    imageSrc,
    zoom,
    setZoom,
    crop,
    setCrop,
    rotation,
    setRotation,
    croppedImage,
    showCroppedImage,
    onCropComplete,
    onFileChange,
    clearImage,
  } = useImageCropper()

  // loads image to show
  useEffect(() => {
    setPreviewFile(croppedImage)
  }, [croppedImage])

  // converts base64 to file for upload
  useEffect(() => {
    if (previewFile) {
      const file = base64StringtoFile(croppedImage, 'croppedImg.png')
      setFile(file)
    }
  }, [previewFile])

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef(null)
  const handleClick = (e) => {
    hiddenInput.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('img', file)
      formData.append('upload_preset', 'travel-app')

      dispatch(updateUserProfile(formData))
      // updateProfileImg(formData)
      setOpen(false)
      setPreviewFile(null)
    } else console.log('no file')
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    clearImage()
  }

  const handleLoadPreviewFile = () => {
    showCroppedImage()
    clearImage()
  }

  const handleClearImage = (e) => {
    setPreviewFile(null)
  }

  return (
    <div>
      <ImageButtonRounded img={img} handleClick={handleClickOpen} />
      <Dialog
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}
          >
            <Typography variant="body2">
              {!imageSrc && !previewFile && 'Choose '}
              {imageSrc && 'Adjust '}
              {file && previewFile && 'Upload '}
              your profile image
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
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className={classes.controls}>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
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
                      classes={{ root: classes.sliderLabel }}
                    >
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
                  onChange={onFileChange}
                  type="file"
                  ref={hiddenInput}
                />
                {!previewFile && (
                  <IconButton onClick={handleClick}>
                    <AddAPhotoIcon
                      color="secondary"
                      className={classes.photo_icon}
                    />
                  </IconButton>
                )}
              </Box>
            )}

            {previewFile && (
              <Box className={classes.previewContainer}>
                <Box className={classes.previewImgContainer}>
                  <img
                    src={previewFile}
                    alt="preview file"
                    className={classes.previewImg}
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            {(previewFile || imageSrc) && (
              <>
                <Button
                  onClick={() => clearImage()}
                  onClick={handleClearImage}
                  className={classes.clearButton}
                  color="default"
                >
                  Clear
                </Button>
                {imageSrc ? (
                  <Button
                    onClick={() => {
                      handleLoadPreviewFile()
                      // handleClose()
                    }}
                    color="secondary"
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} color="secondary">
                    Upload
                  </Button>
                )}
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default UpdateProfileImgForm
