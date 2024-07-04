import * as z from "zod"

export const postSchema = z.object({
  text: z.string(),
})
