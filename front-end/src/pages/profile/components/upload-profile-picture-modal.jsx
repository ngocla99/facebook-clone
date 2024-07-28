import React from "react"
import { useProfileUploadPictureModal } from "@/stores"
import Cropper from "react-easy-crop"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Plus } from "@/assets/svg"

export const UploadProfilePictureModal = () => {
  const profileUploadPictureModal = useProfileUploadPictureModal()
  const inputUploadRef = React.useRef(null)
  const [file, setFile] = React.useState()

  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const handleUploadFile = (e) => {
    const fileUpload = e.target.files[0]
    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        fileUpload.type
      )
    ) {
      return
    }

    if (fileUpload.size > 1024 * 1024 * 5) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(fileUpload)
    reader.onload = (event) => {
      setFile(event.target.result)
    }
  }

  return (
    <Modal
      className="w-auto p-0 drop-shadow sm:w-[700px]"
      showModal={profileUploadPictureModal.isOpen}
      onClose={() => profileUploadPictureModal.onClose()}
      //   enableCloseBtn={false}
      //   onInteractOutside={(e) => {
      //     if (createPostMutation.isPending || uploadImageMutation.isPending)
      //       e.preventDefault()
      //   }}
    >
      <DialogHeader className="grid h-[60px] place-content-center border-b border-border">
        <DialogTitle className="leading-none">
          Choose profile picture
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogHeader>
      <div className="p-4">
        {!file ? (
          <div className="grid grid-cols-2 gap-2">
            <input
              ref={inputUploadRef}
              type="file"
              hidden
              onChange={handleUploadFile}
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <Button
              variant="deemphasized"
              onClick={() => inputUploadRef.current.click()}
            >
              <Plus className="mr-1.5 size-4" />
              Upload photo
            </Button>
            <Button variant="secondary">
              <i className="frame_icon mr-1.5"></i>Add Frame
            </Button>
          </div>
        ) : (
          <div className="">
            <div className="relative h-[400px] w-full">
              <Cropper
                image={file}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
