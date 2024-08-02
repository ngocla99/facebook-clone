import React from "react"
import { uploadImageApi } from "@/api/services/image"
import { createPostApi } from "@/api/services/post"
import { updateProfileApi } from "@/api/services/user"
import { useMe } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Cropper from "react-easy-crop"
import { useForm } from "react-hook-form"

import getCroppedImg from "@/lib/crop-image"
import { cn } from "@/lib/utils"
import { profileCoverSchema } from "@/lib/validations/profile"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

export const ProfileCoverForm = ({
  aspect,
  file,
  setFile,
  setIsSaving,
  showUploadFile,
  className,
}) => {
  if (!file) return null
  const queryClient = useQueryClient()
  const { data: me } = queryClient.getQueryData(["me"])
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null)
  const [showDragHint, setShowDragHint] = React.useState(!!showUploadFile)

  const form = useForm({
    resolver: zodResolver(profileCoverSchema),
    defaultValues: {
      image: file,
    },
  })

  const createPostMutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: ({ data }) => {
      createPostMutation.mutate({
        type: "COVER_PHOTO",
        audience: "EVERYONE",
        images: [{ url: data.profile.cover }],
      })
      setFile(null)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onSettled: () => setIsSaving(false),
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      console.log("🚀 ~ data:", data)
      updateProfileMutation.mutate({
        coverPhoto: {
          focus: { x: croppedAreaPixels.x, y: croppedAreaPixels.y },
          photo: {
            image: { ...data[0] },
            croppedImage: { ...data[1] },
          },
        },
      })
    },
  })

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const uploadImage = async (image) => {
    const path = `${me.username}/profile_pictures`
    const blob = await fetch(file).then((b) => b.blob())
    const croppedBlob = await fetch(image).then((b) => b.blob())
    const formData = new FormData()

    formData.append("path", path)
    formData.append("files", blob)
    formData.append("files", croppedBlob)
    uploadImageMutation.mutate(formData)
  }

  const onSubmit = async () => {
    setIsSaving(true)
    const image = await getCroppedImg(
      form.getValues("image"),
      croppedAreaPixels
    )
    uploadImage(image)
  }

  return (
    <Form {...form}>
      <form
        id="profile-cover-form"
        className={cn("grid", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem onClick={() => setShowDragHint(false)}>
              <FormControl>
                <Cropper
                  image={field.value}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  cropShape="rect"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  onWheelRequest={() => false}
                  objectFit="horizontal-cover"
                />
              </FormControl>
              {showDragHint && (
                <div className="absolute left-1/2 top-1/2 flex max-w-[244px] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-[rgba(0,0,0,0.5)] px-3 py-2 text-center font-semibold text-white">
                  <i className="drag_icon invert"></i>
                  <p>Drag to Reposition</p>
                </div>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
