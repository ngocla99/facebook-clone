import React from "react"
import { useProfilePictureModal } from "@/stores"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Plus } from "@/assets/svg"

import { CreateProfilePicture } from "./create-profile-picture"

export const ProfilePictureModal = () => {
  const profilePictureModal = useProfilePictureModal()
  const inputUploadRef = React.useRef(null)
  const [file, setFile] = React.useState()
  const formRef = React.useRef(null)

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
      className="max-h-screen w-auto overflow-y-auto p-0 drop-shadow sm:w-[700px]"
      showModal={profilePictureModal.isOpen}
      onClose={() => {
        if (!file) return profilePictureModal.onClose()
        formRef.current?.close()
      }}
      onInteractOutside={(e) => {
        if (formRef.current?.isSaving) e.preventDefault()
      }}
    >
      <DialogHeader className="grid h-[60px] place-content-center border-b border-border">
        <DialogTitle className="leading-none">
          Choose profile picture
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogHeader>
      <div>
        {!file ? (
          <div className="grid grid-cols-2 gap-2 p-4">
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
          <CreateProfilePicture ref={formRef} file={file} setFile={setFile} />
        )}
      </div>
    </Modal>
  )
}
