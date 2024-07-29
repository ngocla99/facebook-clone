import { uploadImageApi } from "@/api/services/image"
import { updateProfileApi } from "@/api/services/user"
import { useMe } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { profilePictureSchema } from "@/lib/validations/profile"

import { ProfilePictureForm } from "./profile-picture-form"

export const CreateProfilePicture = ({ file }) => {
  const queryClient = useQueryClient()
  const { data: me } = useMe()

  const form = useForm({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      description: "",
      image: file,
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: () => {},
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      updateProfileMutation.mutate({ picture: data[0].url })
    },
  })

  const createCommentWithImage = async (image) => {
    const path = `${me.username}/profile_pictures`
    const blob = await fetch(image).then((b) => b.blob())
    const formData = new FormData()
    formData.append("path", path)
    formData.append("file", blob)
    uploadImageMutation.mutate(formData)
  }

  const onSubmit = async (data) => {
    if (uploadImageMutation.isPending || updateProfileMutation.isPending) return
    createCommentWithImage(data.image)
  }

  return <ProfilePictureForm form={form} onSubmit={onSubmit} />
}
