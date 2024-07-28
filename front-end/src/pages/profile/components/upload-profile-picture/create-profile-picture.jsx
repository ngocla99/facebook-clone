import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { profilePictureSchema } from "@/lib/validations/profile"

import { ProfilePictureForm } from "./profile-picture-form"

export const CreateProfilePicture = ({ file }) => {
  const form = useForm({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      description: "",
      image: file,
    },
  })

  const onSubmit = (data) => {}

  return <ProfilePictureForm form={form} onSubmit={onSubmit} />
}
