import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slider from '@mui/material/Slider'
import Cropper from 'react-easy-crop'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import ImageButtonRounded from '../ImageButtonRounded/ImageButtonRounded'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import { useImageCropper } from '../../../hooks/useImageCropper'
import { StyledContainer } from './styles'

interface UploadProfileImgFormProps {
  origin: string
  loadPreviewFile: (file: string) => void
  img: Blob | string
}

const UploadProfileImgForm: React.FC<UploadProfileImgFormProps> = ({
  origin,
  loadPreviewFile,
  img,
}) => {
  const [open, setOpen] = useState(false)

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
  useEffect(
    () => {
      croppedImage && loadPreviewFile(croppedImage)
      return () => {}
    },
    [croppedImage, loadPreviewFile]
    // loadPreviewFile
  )

  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef<HTMLInputElement>(null)
  const handleClick = (e: any) => {
    hiddenInput && hiddenInput.current && hiddenInput.current.click()
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

  const handleChangeZoom = (e: any, newValue: number | number[]) => {
    setZoom(newValue as number)
  }

  const handleChangeRotate = (e: any, newValue: number | number[]) => {
    setRotation(newValue as number)
  }

  return (
    <StyledContainer>
      {origin === 'editProfileForm' ? (
        <ImageButtonRounded img={img} handleClick={handleClickOpen} />
      ) : (
        <Box className="photoIconContainer">
          <Typography variant="body2">Add a photo</Typography>
          <IconButton onClick={handleClickOpen}>
            <AddAPhotoIcon color="secondary" className="photo_icon" />
          </IconButton>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="title">
          <Typography variant="body2">
            {!imageSrc ? 'Choose ' : 'Adjust '}your profile image
          </Typography>
        </DialogTitle>
        <DialogContent className="contentContainer">
          {imageSrc ? (
            <Box className="previewContainer">
              <div className="cropContainer">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  //   showGrid={false}
                  aspect={1}
                  // aspect={1}
                  // cropShape="round"
                />
              </div>
              <div className="controls">
                <div className="sliderContainer">
                  <Typography variant="overline" className="sliderLabel">
                    Zoom
                  </Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={handleChangeZoom}
                    className="slider"
                  />
                </div>
                <div className="sliderContainer">
                  <Typography variant="overline" className="sliderLabel">
                    Rotate
                  </Typography>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    className="slider"
                    onChange={handleChangeRotate}
                  />
                </div>
              </div>
            </Box>
          ) : (
            <Box className="photoIconContainer">
              <input
                style={{ display: 'none' }}
                id="customFile"
                onChange={onFileChange}
                type="file"
                ref={hiddenInput}
              />
              <IconButton onClick={handleClick}>
                <AddAPhotoIcon color="secondary" className="photo_icon" />
              </IconButton>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="btns">
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {imageSrc && (
            <>
              <Button onClick={() => clearImage()} color="inherit">
                Clear
              </Button>
              <Button
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
    </StyledContainer>
  )
}

export default UploadProfileImgForm
