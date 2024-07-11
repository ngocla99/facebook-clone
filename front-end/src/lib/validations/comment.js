import * as z from "zod"

export const commentSchema = z.object({
  text: z.string(),
  images: z.any(),
})
