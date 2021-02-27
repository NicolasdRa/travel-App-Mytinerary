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

import { useImageCropper } from '../../../hooks/useImageCropper'
import { base64StringtoFile } from '../../utils/imageUtils'
import { updateUserProfile, selectCurrentUser } from '../../Redux/usersSlice'
import ImageButtonRounded from '../ImageButtonRounded/ImageButtonRounded'

import './styles.css'
import { useStyles } from './styles'

const UploadProfileImgForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  // displays profile img at start
  const { img } = useSelector(selectCurrentUser)

  // Component level - File state
  const [file, setFile] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)

  console.log('previewFile', previewFile)

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

  // // converts base64 to file for upload
  // useEffect(() => {
  //   if (previewFile) {
  //     const file = base64StringtoFile(croppedImage, 'croppedImg.png')
  //     setFile(file)
  //   }
  // }, [previewFile])

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef(null)
  const handleClick = (e) => {
    hiddenInput.current.click()
  }

  // //handles file input changes
  // const handleChangeFile = async (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0]
  //     let imageDataUrl = await readFile(file)

  //     setImageSrc(imageDataUrl)
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('img', file)

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
              Choose and adjust your Profile image
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
                    aspect={1 / 1}
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
              <Button onClick={clearImage} color="primary">
                Clear
              </Button>
            ) : null}
            <Button onClick={handleSubmit} color="secondary">
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default UploadProfileImgForm
