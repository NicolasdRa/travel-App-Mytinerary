interface PixelCrop {
  x: number
  y: number
  width: number
  height: number
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues
    image.src = url
  })

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.readAsDataURL(file)
  })
}

export const extractImageFileExtensionFromBase64 = (base64Data: string): string => {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  )
}

export const base64StringtoFile = (base64String: string, filename: string): File => {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param imageSrc - Image File url
 * @param pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param rotation - optional rotation parameter
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation: number = 0
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set dimensions to double largest dimension to allow for a safe area for the image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  )

  // As Base64 string
  return canvas.toDataURL('image/jpeg')
}

export async function getRotatedImage(
  imageSrc: string,
  rotation: number = 0
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const orientationChanged =
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
  if (orientationChanged) {
    canvas.width = image.height
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file))
      }
    }, 'image/jpeg')
  })
}