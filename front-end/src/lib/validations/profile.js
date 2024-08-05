import * as z from "zod"

export const profilePictureSchema = z.object({
  description: z.string().trim(),
  image: z.any(),
})

export const profileCoverSchema = z.object({
  image: z.any(),
})

export const profileBioSchema = z.object({
  bio: z
    .string()
    .max(101, { message: "Must be 5 or fewer characters long" })
    .trim(),
})
