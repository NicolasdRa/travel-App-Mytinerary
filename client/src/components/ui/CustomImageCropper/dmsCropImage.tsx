import React, { DependencyList, useEffect, useRef, useState } from 'react'
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'
import { Heading } from '@components/typography'
import { Image } from '@prisma/client'

const TO_RADIANS = Math.PI / 180

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  ctx.restore()
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-ignore
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

type CropImageProps = {
  image?: Image
  file: File
  scale: number
  rotate: number
  crop: Crop | undefined
  setCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>
}

export function CropImage({
  file,
  scale,
  rotate,
  crop,
  setCrop,
  image,
}: CropImageProps) {
  // console.log("CropImage", { file, crop, scale, rotate });
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = useState('')
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspect] = [4 / 3]

  useEffect(() => {
    setCrop(undefined) // Makes crop preview update between images.
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const src = reader.result?.toString() || ''
      // log.info("CropImage:src", !!src);
      setImgSrc(reader.result?.toString() || '')
    })
    reader.readAsDataURL(file)
  }, [file])

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      console.log('onImageLoad', width, height, aspect)
      const savedCrop = image?.crop as unknown as Crop
      setCrop(savedCrop || centerAspectCrop(width, height, aspect))
    }
  }

  //
  // function onDownloadCropClick() {
  //   if (!previewCanvasRef.current) {
  //     throw new Error("Crop canvas does not exist");
  //   }
  //
  //   previewCanvasRef.current.toBlob((blob) => {
  //     if (!blob) {
  //       throw new Error("Failed to create blob");
  //     }
  //     if (blobUrlRef.current) {
  //       URL.revokeObjectURL(blobUrlRef.current);
  //     }
  //     blobUrlRef.current = URL.createObjectURL(blob);
  //     hiddenAnchorRef.current!.href = blobUrlRef.current;
  //     hiddenAnchorRef.current!.click();
  //   });
  // }

  useDebounceEffect(
    async () => {
      // console.log("useDebounceEffect", { completedCrop });
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
      }
    },
    100,
    [completedCrop, rotate]
  )

  return (
    <div className="">
      <div className="flex flex-wrap justify-between gap-y-4">
        <div className="basis-1/2 space-y-2">
          <Heading>Original</Heading>
          {!!imgSrc && (
            <div className="bg-card rounded border p-0.5">
              <ReactCrop
                className="w-full"
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => c && setCompletedCrop(c)}
                aspect={aspect}
                keepSelection={true}
              >
                <img
                  className="rounded border"
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    objectFit: 'contain',
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
          )}
        </div>
        {!!completedCrop && (
          <div className="flex w-full basis-1/2 flex-col items-center">
            <div className="space-y-2">
              <Heading className="place-items-start">Vorschau</Heading>
              <canvas
                className="bg-card w-full rounded border p-0.5"
                ref={previewCanvasRef}
                style={{
                  objectFit: 'contain',
                  width: 512,
                  height: 384,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
