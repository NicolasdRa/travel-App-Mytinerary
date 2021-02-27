import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
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

import { useStyles } from './styles'
import { useImageCropper } from '../../../hooks/useImageCropper'
import { selectCurrentUser } from '../../Redux/usersSlice'

const UploadCoverImgForm = ({ origin, loadPreviewFile }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { coverImg } = useSelector(selectCurrentUser)

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

  // loads image
  useEffect(
    () => {
      loadPreviewFile(croppedImage)
      return () => {}
    },
    [croppedImage]
    // loadPreviewFile
  )

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef(null)
  const handleClick = (e) => {
    hiddenInput.current.click()
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          className={classes.title}
        >
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
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  showGrid={false}
                  aspect={16 / 9}
                  // aspect={1}
                  // cropShape="round"
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
          {imageSrc && (
            <>
              <Button onClick={() => clearImage()} color="default">
                Clear
              </Button>
              <Button
                //   onClick={
                //     origin === 'profileForm' ? handleSubmit : handleLoadImage
                //   }
                onClick={() => {
                  handleLoadPreviewFile()
                  handleClose()
                }}
                color="secondary"
              >
                Confirm
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

UploadCoverImgForm.propTypes = {
  loadPreviewFile: PropTypes.func.isRequired,
  origin: PropTypes.string.isRequired,
}

export default UploadCoverImgForm
