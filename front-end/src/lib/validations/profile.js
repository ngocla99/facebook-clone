import * as z from "zod"

export const profilePictureSchema = z.object({
  description: z.string().trim(),
  image: z.any(),
})

export const profileCoverSchema = z.object({
  image: z.any(),
})
