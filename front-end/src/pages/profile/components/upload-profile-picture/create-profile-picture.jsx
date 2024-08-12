import React from "react"
import { uploadImageApi } from "@/api/services/image"
import { createPostApi } from "@/api/services/post"
import { updateProfileApi } from "@/api/services/user"
import { useMe } from "@/hooks"
import { useProfilePictureModal } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import getCroppedImg from "@/lib/crop-image"
import { cn } from "@/lib/utils"
import { profilePictureSchema } from "@/lib/validations/profile"
import { confirm } from "@/components/confirm"

import { ProfilePictureForm } from "./profile-picture-form"

export const CreateProfilePicture = React.forwardRef(
  ({ file, setFile }, ref) => {
    const profilePictureModal = useProfilePictureModal()
    const queryClient = useQueryClient()
    const { data: me } = useMe()

    const form = useForm({
      resolver: zodResolver(profilePictureSchema),
      defaultValues: {
        description: "",
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
      onSuccess: (data) => {
        createPostMutation.mutate({
          type: "PROFILE_PICTURE",
          text: form.getValues("description"),
          audience: "EVERYONE",
          images: [{ url: data.profile.picture }],
        })
        setFile(null)
        queryClient.invalidateQueries({ queryKey: ["me"] })
        queryClient.invalidateQueries({ queryKey: ["user"] })
        profilePictureModal.onClose()
      },
      onError: () => {},
    })

    const uploadImageMutation = useMutation({
      mutationFn: uploadImageApi,
      onSuccess: (data) => {
        updateProfileMutation.mutate({ picture: data[0].url })
      },
    })

    const isSaving =
      uploadImageMutation.isPending || updateProfileMutation.isPending

    const uploadImage = async (image) => {
      const path = `${me.username}/profile_pictures`
      const blob = await fetch(image).then((b) => b.blob())
      const formData = new FormData()
      formData.append("path", path)
      formData.append("file", blob)
      uploadImageMutation.mutate(formData)
    }

    const onSubmit = async (data) => {
      let image = data.image
      if (!data.isCropped) {
        image = await getCroppedImg(
          form.getValues("image"),
          data.croppedAreaPixels
        )
      }

      uploadImage(image)
    }

    const onClose = () => {
      return confirm({
        title: "Discard Changes",
        description: "Are you sure you want to discard your changes?",
        confirmText: "Discard",
        cancelText: "Cancel",
        onConfirm: () => {
          setFile(null)
          profilePictureModal.onClose()
        },
      })
    }

    const onCancel = () => {
      return confirm({
        title: "Discard Changes",
        description: "Are you sure you want to discard your changes?",
        confirmText: "Discard",
        cancelText: "Cancel",
        onConfirm: () => {
          setFile(null)
        },
      })
    }

    React.useImperativeHandle(ref, () => {
      return {
        close: onClose,
        isSaving: isSaving,
      }
    })

    return (
      <ProfilePictureForm
        form={form}
        isSaving={isSaving}
        onSubmit={onSubmit}
        onClose={onCancel}
        className={cn(
          isSaving &&
            "after:absolute after:inset-0 after:bg-[rgba(244,244,244,0.3)] after:content-['']"
        )}
      />
    )
  }
)
