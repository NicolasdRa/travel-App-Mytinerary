import { useState, useCallback } from 'react'

import { getCroppedImg } from '../Components/utils/imageUtils'

const useImageCropper = (imageSrc) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImageFile, setCroppedImageFile] = useState(null)

  // creates cropped image base64 to show, upload or download
  const createCroppedImageFile = useCallback(async () => {
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation,
    )
    // console.log("done", { croppedImage });
    setCroppedImageFile(croppedImage)
  }, [imageSrc, croppedAreaPixels, rotation])

  // handles crop complete
  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
      // console.log({ area: croppedArea }, { pixels: croppedAreaPixels });
      createCroppedImageFile()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [crop],
  )

  return {
    zoom,
    setZoom,
    crop,
    setCrop,
    rotation,
    setRotation,
    croppedImageFile,
    setCroppedImageFile,
    handleCropComplete,
  }
}

export default useImageCropper
