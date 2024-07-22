import * as z from "zod"

export const commentSchema = z.object({
  text: z.string().trim().min(1, { message: "Required" }),
  images: z.any(),
})
