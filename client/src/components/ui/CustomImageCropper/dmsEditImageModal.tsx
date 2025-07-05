import React, { MouseEventHandler, useState } from 'react'
import log from '@/logger'
import { Button, ExternalLink } from '@components/actions'
import ReloadIcon from '@components/icons/reload'
import {
  ControlledCheckboxField,
  ControlledTextField,
} from '@components/inputs'
import { Card, Divider } from '@components/layout'
import { Modal } from '@components/shared'
import { Heading, Text } from '@components/typography'
import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image as ImagePrisma } from '@prisma/client'
import { createPortal } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Crop } from 'react-image-crop'

import { SaveImageType, useUser } from '@/lib/hooks'
import { ImageUpdate, ImageUpdateType } from '@/lib/zod'

import { CropImage } from './CropImage'

// const getImageUrl = async (dataUrl: string) => {
//   const result = await fetch(dataUrl);
//   const blob = await result.blob();
//   // log.image("getImageUrl:blob", blob);
//   return { imgUrl: window.URL.createObjectURL(blob), type: blob.type };
// };

type EditImageModalProps = {
  show: boolean
  close: () => void
  /**
   * the file object with the image inside
   */
  imageFile: File
  /**
   * the image from the DB indicates if we create a new image or edit an existing one
   */
  image?: ImagePrisma
  saveImage: SaveImageType
  position: number
}

/**
 * Modulo operator that always returns only a positive number
 * @param n
 * @param m
 */
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export const EditImageModal = ({
  show,
  close,
  imageFile,
  image,
  saveImage,
  position,
}: EditImageModalProps) => {
  const { email } = useUser()
  // @ts-ignore
  const defaultRotate = (image?.crop?.rotate as unknown as number) || 0
  // @ts-ignore
  const defaultScale = (image?.crop?.scale as unknown as number) || 1
  const [rotate, setRotate] = useState<number>(defaultRotate)
  const [scale, setScale] = useState<number>(defaultScale)
  const [loading, setLoading] = useState(false)
  const [crop, setCrop] = useState<Crop | undefined>()

  const methods = useForm<ImagePrisma>({
    resolver: zodResolver(ImageUpdate),
    values: image ?? undefined,
    defaultValues: {
      email,
    },
  })

  const { control } = methods

  const onSubmitHandler: SubmitHandler<ImagePrisma> = async (values, event) => {
    event?.preventDefault()
    setLoading(true)
    const payload = values as unknown as ImageUpdateType
    log.form('onSubmitHandler:payload', values, crop)

    const cropData = {
      ...(crop as Crop), // we know this is not undefined any more and it get parsed anyways
      rotate,
      scale,
    }

    await saveImage(
      imageFile.type,
      imageFile,
      payload,
      cropData,
      position,
      image?.imageFileName
    )
    setLoading(false)
    await close()
  }

  // wrapper to log submit error
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    return methods.handleSubmit(onSubmitHandler, (e) =>
      log.error('handleSubmit:invalid', { e, values: methods.getValues() })
    )()
  }

  const rotateLeft: MouseEventHandler<HTMLButtonElement> = (e) => {
    setRotate(mod(rotate - 90, 360))
  }

  const rotateRight: MouseEventHandler<HTMLButtonElement> = (e) => {
    setRotate((rotate + 90) % 360)
  }

  function handleReset() {
    setRotate(0)
    setScale(1)
  }

  function handleAbortEdit(e: React.MouseEvent) {
    e.preventDefault()
    close()
  }

  return createPortal(
    <Modal showModal={show} close={close}>
      <div className="scrollbar md:border-border relative max-h-[calc(100vh-10rem)] w-full max-w-7xl overflow-y-scroll bg-white md:mx-10 md:w-auto md:rounded-2xl md:border md:shadow-xl">
        <Card>
          <Card.Header title="Bild hinzufügen" className="relative">
            <div className="absolute right-3 top-1 cursor-pointer">
              <Button
                type="button"
                round
                variant="white"
                icon={<XMarkIcon className="h-5 w-5 " />}
                onClick={handleAbortEdit}
              />
            </div>
          </Card.Header>
          <Card.Section>
            <CropImage
              file={imageFile}
              scale={scale}
              rotate={rotate}
              crop={crop}
              setCrop={setCrop}
              image={image}
            />
            <Text variant="description" component="div">
              Wählen Sie hier den Bild-Ausschnitt, der später im Programm in der
              Vorschau angezeigt werden soll. Das Bild kann dabei weiterhin auch
              komplett angesehen werden (auch im Hochformat).
            </Text>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="mt-1 flex space-x-8">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={rotateLeft}
                    icon={<ArrowUturnLeftIcon />}
                  >
                    -90°
                  </Button>
                  <Button
                    type="button"
                    onClick={rotateRight}
                    icon={<ArrowUturnRightIcon />}
                  >
                    90°
                  </Button>
                </div>
                <div className="flex  gap-2">
                  <Button
                    type="button"
                    onClick={handleReset}
                    icon={<ReloadIcon className="h-6 w-6 text-white" />}
                  >
                    Zurücksetzen
                  </Button>
                </div>
              </div>
            </div>
          </Card.Section>
          <form key={2}>
            <Card.Section>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
                <div className="flex flex-col gap-4">
                  <ControlledTextField
                    name="title"
                    label="Titel des Bildes*"
                    control={control}
                  />
                  <ControlledTextField
                    name="imageOwner"
                    label="Bildrechte-Inhaber/-in bzw. Fotograf/-in *"
                    control={control}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <ControlledTextField
                    name="uploader"
                    label="Hochladende Person *"
                    control={control}
                  />
                  <ControlledTextField
                    name="email"
                    label="E-Mail-Kontakt *"
                    control={control}
                  />
                </div>
                <div className="col-span-1 space-y-2 md:col-span-2">
                  <Heading variant="cardHeading">
                    Nutzungbedingungen & Bildfreigabe
                  </Heading>
                  <ControlledCheckboxField
                    name="agreementUse"
                    label="Nutzungsbedingungen *"
                    description={
                      <>
                        Ich habe die{' '}
                        <ExternalLink
                          href="https://assets.ctfassets.net/u3ad0czmtthk/7Dw1685lQnlVbneRSArSm1/071853b617bbd0453a707f5b3f144b9a/Nutzungsbedingungen-Bildupload.pdf"
                          text="Nutzungsbedingungen"
                        />{' '}
                        gelesen und bin damit einverstanden. *
                      </>
                    }
                    control={control}
                  />
                  <ControlledCheckboxField
                    name="agreementShare"
                    label="Freigabe zur weiteren Nutzung für Medienarbeit"
                    description="Das Bild darf zusätzlich von der Deutschen Stiftung Denkmalschutz zeitlich unbegrenzt für die Medienarbeit (Print, Online, Social Media, Apps) genutzt und unter Nennung des/der Bildrechteinhabers/-in an externe Medienvertreter/-innen (Presse, Online-Magazine usw.) weitergegeben werden. Die Freigabe kann jederzeit durch Löschen des Häkchens oder per E-Mail an info@tag-des-offenen-denkmals.de widerrufen werden."
                    control={control}
                  />
                </div>
              </div>
            </Card.Section>
          </form>
          <div className="sticky bottom-0 w-full bg-white">
            <Divider />
            <div className="flex justify-between px-6 py-2">
              <Text>Die mit * gekennzeichneten Felder sind erforderlich.</Text>
              <Button
                // todo button is not inside form so enter->submit can be difficult. => button form around everything and check all button types
                type="submit"
                onClick={handleSubmit}
                icon={<CheckIcon />}
                loading={loading}
              >
                Speichern
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>,
    /*Note: This way it is possible to have a second form in the form*/
    /*@ts-ignore*/
    document.getElementById('__next').children[0]
  )
}
