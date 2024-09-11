import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { useSize } from "@/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Cropper from "react-easy-crop"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { confirm } from "@/components/confirm"
import { LoadingDots } from "@/components/loading/loading-dots"

import { ProfileCoverForm } from "./profile-cover-form"
import { ProfileCoverModal } from "./profile-cover-modal"

export const UploadProfileCover = ({ user, className }) => {
  const queryClient = useQueryClient()
  const inputUploadRef = React.useRef(null)
  const coverBoxRef = React.useRef(null)
  const { width, height } = useSize(coverBoxRef)
  const [uploadFile, setUploadFile] = React.useState({})
  const [showProfileCover, setShowProfileCover] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  const removeCover = () => {
    if (updateProfileMutation.isPending) return
    confirm({
      title: "Remove Cover Photo",
      description: "Are you sure you want to remove your cover photo?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => updateProfileMutation.mutate({ cover: null }),
    })
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

    if (fileUpload.size > 1024 * 1024 * 12) {
      return toast({ title: "File size exceeds 12MB." })
    }

    const reader = new FileReader()
    reader.readAsDataURL(fileUpload)
    reader.onload = (event) => {
      setUploadFile({ type: "CREATE", file: event.target.result })
    }
  }

  return (
    <>
      <div
        ref={coverBoxRef}
        className={cn(
          "relative overflow-hidden rounded-bl-lg rounded-br-lg border-none bg-background-comment bg-cover bg-no-repeat",
          !uploadFile.file && "image-box",
          className
        )}
        // style={{
        //   backgroundImage:
        //     user.coverPhoto && !uploadFile.file
        //       ? `url(${user.coverPhoto.photo.croppedImage.url})`
        //       : "unset",
        // }}
      >
        <div className="pt-[38%]">
          {user.coverPhoto && (
            <Cropper
              image={user.coverPhoto.photo.image.url}
              crop={user.coverPhoto.focus}
              zoom={1}
              aspect={width / height}
              cropShape="rect"
              showGrid={false}
              onWheelRequest={() => false}
              onCropChange={() => {}}
              objectFit="horizontal-cover"
            />
          )}
          {uploadFile.file && (
            <ProfileCoverForm
              aspect={width / height}
              uploadFile={uploadFile}
              onDone={() => setUploadFile({})}
              setIsSaving={setIsSaving}
              className="absolute inset-0 z-0"
            />
          )}
        </div>

        {!user.isVisitor && !uploadFile.file && (
          <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-end bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)] px-5 py-[22px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="mx-3 gap-2 bg-white font-semibold hover:bg-background-comment"
                  variant="secondary"
                >
                  <i className="camera_filled_icon"></i>
                  <p className="hidden lg:block">Add cover photo</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="grid p-2 shadow-2xl drop-shadow"
              >
                <input
                  ref={inputUploadRef}
                  type="file"
                  hidden
                  onChange={handleUploadFile}
                  accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
                />
                <Button
                  variant="ghost"
                  className="justify-start px-2 leading-5"
                  onClick={() => setShowProfileCover(true)}
                >
                  <i className="photo_icon mr-3"></i>
                  Choose cover photo
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start px-2 leading-5"
                  onClick={() => inputUploadRef.current.click()}
                >
                  <i className="upload_icon_20 mr-3"></i>
                  Upload photo
                </Button>
                {user.coverPhoto && (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 leading-5"
                      onClick={() =>
                        setUploadFile({
                          type: "REPOSITION",
                          file: user.coverPhoto.photo.image.url,
                          focus: user?.coverPhoto?.focus,
                        })
                      }
                    >
                      <i className="drag_icon mr-3"></i>
                      Reposition
                    </Button>
                    <div className="mx-2">
                      <Separator className="my-1" />
                    </div>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 leading-5"
                      onClick={removeCover}
                    >
                      <i className="trash_icon_20 mr-3"></i>
                      Remove
                    </Button>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        )}

        {showProfileCover && (
          <ProfileCoverModal
            profileCoverModal={{
              isOpen: showProfileCover,
              onClose: () => setShowProfileCover(false),
            }}
            onUpload={(img) => {
              setShowProfileCover(false)
              setUploadFile({
                type: "CREATE",
                file: img,
              })
            }}
          />
        )}
      </div>
      {uploadFile.file && (
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-[rgba(0,0,0,0.4)] px-4 py-3">
          <div className="flex gap-3">
            <i className="public_icon invert"></i>
            <p className="font-medium text-white">
              Your cover photo is public.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isSaving ? (
              <LoadingDots />
            ) : (
              <Button
                variant="secondary"
                className="w-[116px] bg-[rgba(255,255,255,0.1)] text-white"
                onClick={() => setUploadFile({})}
                disabled={isSaving}
              >
                Cancel
              </Button>
            )}
            <Button
              form="profile-cover-form"
              type="submit"
              className="w-[172px]"
              disabled={isSaving}
            >
              Save Change
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
