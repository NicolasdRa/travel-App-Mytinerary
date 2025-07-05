import ImageNext from 'next/image'
import React, { useState } from 'react'
import log from '@/logger'
import { api } from '@/trpc/client'
import { getCropImageFileName } from '@/util/helper'
import { Button } from '@components/actions'
import { useConfirmModal } from '@components/shared'
import { Text } from '@components/typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Image as ImageType } from '@prisma/client'
import { MoveIcon } from 'lucide-react'
import toast from 'react-hot-toast'

import { S3FolderType } from '@/lib/constants'
import { SaveImageType } from '@/lib/hooks'
import { cn } from '@/lib/utils'

import { EditImageModal } from './EditImageModal'

type EditImageProps = {
  image: ImageType
  /**
   * reload the images in the component
   */
  refetch: () => void
  saveImage: SaveImageType
  monumentId?: string
  imageFolder: S3FolderType
  disabled?: boolean
}

export function EditableImage({
  image,
  refetch,
  saveImage,
  monumentId,
  imageFolder,
  disabled,
}: EditImageProps) {
  const imageFileName = image.crop
    ? getCropImageFileName(image.imageFileName)
    : image.imageFileName
  const imgUrlRaw = `/static/img/${imageFolder}/${image.imageFileName}`
  const imgUrlCropped = `/static/img/${imageFolder}/${imageFileName}`
  // console.log({ image, imgUrl, monumentId, imageFolder });
  const [showEditImageModal, setShowEditImageModal] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [editImageLoading, setEditImageLoading] = useState(false)
  const [previewImgLoading, setPreviewImgLoading] = useState(true)

  const { ConfirmModal, confirm } = useConfirmModal()

  const { mutate: deleteImage, isLoading: isDeletingImage } =
    api.image.deleteImage.useMutation({
      onSuccess: () => {
        toast.success('Bild gelöscht')
        return refetch() // reload images
      },
      onError: async (error) => {
        toast.error('Fehler beim löschen')
        log.error('onError', { error })
      },
    })

  async function handleDeleteImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault() // we are currently inside a form
    const confirmed = await confirm()
    if (confirmed) {
      deleteImage({ imageId: image.id, monumentId, imageFolder })
    }
  }

  /**
   * When editing an image, we need to transform the image to a File
   * @param e
   */
  async function editImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setEditImageLoading(true)
    const file = await fetch(imgUrlRaw)
      .then((res) => res.blob())
      .then(
        (blob) => new File([blob], image.imageFileName, { type: blob.type })
      )
    setImageFile(file)
    setEditImageLoading(false)
    setShowEditImageModal(true)
  }

  function handleCloseModal() {
    log.image('handleCloseModal')
    setShowEditImageModal(false)
    refetch()
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div className="hover:bg-muted rounded-md border bg-white">
        <div className="p-2">
          <ConfirmModal
            title="Bild löschen?"
            body="Wollen Sie dieses Bild wirklich löschen? Dadurch wird das Bild sofort entfernt."
            error="Diese Aktion kann nicht rückgängig gemacht werden."
            confirmText="Löschen"
          />
          {imageFile && (
            <EditImageModal
              image={image}
              imageFile={imageFile}
              show={showEditImageModal}
              close={handleCloseModal}
              saveImage={saveImage}
              position={image.position || 0}
            />
          )}
          <div className="relative h-60 w-full rounded-md" key={image.id}>
            <ImageNext
              className={cn(
                'object-contain object-center',
                previewImgLoading && 'bg-muted animate-pulse rounded-md'
              )}
              alt={image.description ?? ''}
              key={image.id}
              src={imgUrlCropped}
              sizes="25vw"
              fill
              onLoad={() => setPreviewImgLoading(false)}
            />
            {!disabled && (
              <div className="absolute right-0 top-0 z-10 flex space-x-2">
                <Button
                  round
                  variant="white"
                  icon={
                    <MoveIcon
                      className="h-5 w-5 fill-current	"
                      strokeWidth={1}
                    />
                  }
                  {...listeners}
                  {...attributes}
                />
                <Button
                  loading={editImageLoading}
                  round
                  onClick={editImage}
                  variant="white"
                  icon={<PencilSquareIcon className="h-5 w-5" />}
                />
                <Button
                  loading={isDeletingImage}
                  round
                  onClick={handleDeleteImage}
                  variant="white"
                  icon={<TrashIcon className="h-5 w-5" />}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <Text className="truncate p-2 pt-0">{image.title}</Text>
        </div>
      </div>
    </div>
  )
}
