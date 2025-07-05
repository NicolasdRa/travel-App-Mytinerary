import { useState, useCallback, ChangeEvent } from 'react'
import { getCroppedImg, getRotatedImage, readFile } from '../utils/imageUtils'
import { getOrientation } from 'get-orientation/browser'

interface Crop {
  x: number
  y: number
}

interface CroppedAreaPixels {
  x: number
  y: number
  width: number
  height: number
}

const ORIENTATION_TO_ANGLE: Record<number, number> = {
  3: 180,
  6: 90,
  8: -90,
}

interface UseImageCropperReturn {
  imageSrc: string | null
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  crop: Crop
  setCrop: React.Dispatch<React.SetStateAction<Crop>>
  rotation: number
  setRotation: React.Dispatch<React.SetStateAction<number>>
  croppedImage: string | null
  showCroppedImage: () => Promise<void>
  onCropComplete: (croppedArea: any, croppedAreaPixels: CroppedAreaPixels) => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  onClose: () => void
  clearImage: () => void
}

export const useImageCropper = (): UseImageCropperReturn => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) {
      return
    }

    try {
      const croppedImageResult = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImageResult)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file) as string

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotationAngle = ORIENTATION_TO_ANGLE[orientation]

      if (rotationAngle) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotationAngle)
      }

      setImageSrc(imageDataUrl)
    }
  }

  const clearImage = () => {
    setImageSrc(null)
  }

  return {
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
    onClose,
    clearImage,
  }
}