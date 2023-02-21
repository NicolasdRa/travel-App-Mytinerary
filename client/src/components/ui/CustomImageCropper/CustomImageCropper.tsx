import { IconButton, Slider, Typography } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Cropper from 'react-easy-crop'
import { Dispatch, SetStateAction, useRef } from 'react'
import { Area } from 'react-easy-crop/types'
import { StyledContainer, StyledPhotoIconContainer } from './styles'

interface CustomImageCropperProps {
  imageSrc: string | null
  crop: any
  zoom: number
  rotation: number
  setCrop: Dispatch<SetStateAction<{ x: number; y: number }>>
  setZoom: Dispatch<React.SetStateAction<number>>
  setRotation: Dispatch<React.SetStateAction<number>>
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
  onFileChange: (e: any) => Promise<void>
}

export const CustomImageCropper: React.FC<CustomImageCropperProps> = ({
  imageSrc,
  crop,
  zoom,
  rotation,
  setCrop,
  setZoom,
  setRotation,
  onCropComplete,
  onFileChange,
}) => {
  // Ref needed to hide default input and functionalise custom icon btn
  const hiddenInput = useRef<HTMLInputElement>(null)

  const handleClick = (e: any) => {
    hiddenInput && hiddenInput.current && hiddenInput.current.click()
  }

  const handleChangeZoom = (e: any, newValue: number | number[]) => {
    setZoom(newValue as number)
  }

  const handleChangeRotate = (e: any, newValue: number | number[]) => {
    setRotation(newValue as number)
  }

  return (
    <>
      {imageSrc ? (
        <StyledContainer className="previewContainer">
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
              aspect={1}
              //   showGrid={false}
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
                color="secondary"
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
                color="secondary"
              />
            </div>
          </div>
        </StyledContainer>
      ) : (
        <StyledPhotoIconContainer className="photoIconContainer">
          <input
            style={{ display: 'none' }}
            id="customFile"
            onChange={onFileChange}
            type="file"
            ref={hiddenInput}
          />
          <IconButton onClick={handleClick} className="photo_icon">
            <AddAPhotoIcon color="secondary" className="photo_icon" />
          </IconButton>
        </StyledPhotoIconContainer>
      )}
    </>
  )
}
