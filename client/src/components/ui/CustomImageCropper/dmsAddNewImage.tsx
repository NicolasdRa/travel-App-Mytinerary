import React, { useState } from 'react'




import s from './EditImages.module.css'


export function AddNewImage({
  refetch,
  saveImage,
  position,
  disabled,
}: {
  saveImage: SaveImageType
  refetch: () => void
  position: number
  disabled?: boolean
}) {
  const [showEditImageModal, setShowEditImageModal] = useState(false)
  const [focus, setFocus] = useState(false)
  const [image, setImage] = useState<File | undefined>()

  function handleNewFile<T extends File>(dropped: T[]) {
    const file = dropped[0]
    // if larger than 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Bild datei zu groß. Max. 10MB')
      return
    }
    setImage(dropped[0])
    setShowEditImageModal(true)
  }

  function handleCloseModal() {
    setShowEditImageModal(false)
    refetch()
  }

  return (
    <div className={s.item}>
      {image && (
        <EditImageModal
          imageFile={image}
          show={showEditImageModal}
          close={handleCloseModal}
          saveImage={saveImage}
          position={position}
        />
      )}
      <Dropzone
        accept={{ 'image/*': [] }}
        onDrop={handleNewFile}
        noKeyboard
        onDragEnter={() => setFocus(true)}
        onDragLeave={() => setFocus(false)}
        maxFiles={1}
        disabled={disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <div className={cn(s.dropzone, focus && s.active)}>
              <PhotoIcon className="text-muted-foreground h-40  w-40" />
              {!disabled && (
                <div className="flex flex-col items-center space-y-2">
                  <Button variant="white" icon={<PlusIcon />} Component="div">
                    Bild hinzufügen
                  </Button>
                  <Text>Oder Bild hierherziehen</Text>
                  <Text variant="description" className="text-center">
                    Format: PNG, JPG, WEBP, GIF... <br />
                    Max. Dateigröße: 10MB
                  </Text>
                </div>
              )}
            </div>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </div>
  )
}
