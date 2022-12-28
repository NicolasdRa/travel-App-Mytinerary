import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import ImageButton from '../../ui/ImageButton/ImageButton'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import { StyledContainer, StyledDialog } from './styles'
import { useImageCropper } from '../../../hooks/useImageCropper'
import { CustomImageCropper } from '../../ui/CustomImageCropper/CustomImageCropper'

interface UploadCoverImgFormProps {
  origin: string
  loadPreviewFile: (file: string) => void
  coverImg: Blob | string
}

export const UploadCoverImgForm: React.FC<UploadCoverImgFormProps> = ({
  origin,
  loadPreviewFile,
  coverImg,
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
    <StyledContainer>
      {origin === 'editProfileForm' ? (
        <ImageButton coverImg={coverImg} handleClick={handleClickOpen} />
      ) : (
        <Box className="photoIconContainer">
          <Typography variant="body2" className="photo-title">
            Add a photo
          </Typography>
          <IconButton onClick={handleClickOpen}>
            <AddAPhotoIcon color="secondary" className="photo_icon" />
          </IconButton>
        </Box>
      )}
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="title">
          <Typography variant="body2">
            {!imageSrc ? 'Choose ' : 'Adjust '}your cover image
          </Typography>
        </DialogTitle>
        <DialogContent className="contentContainer">
          <CustomImageCropper
            imageSrc={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            setCrop={setCrop}
            setZoom={setZoom}
            setRotation={setRotation}
            onCropComplete={onCropComplete}
            onFileChange={onFileChange}
          />
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
      </StyledDialog>
    </StyledContainer>
  )
}
