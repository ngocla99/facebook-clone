import * as z from "zod"

export const postSchema = z.object({
  text: z.string(),
  audience: z.enum(["SELF", "EVERYONE", "FRIENDS"]),
  background: z.string().nullable(),
  images: z.any(),
})

export const audiencePostSchema = z.object({
  audience: z.enum(["SELF", "EVERYONE", "FRIENDS"]),
})
