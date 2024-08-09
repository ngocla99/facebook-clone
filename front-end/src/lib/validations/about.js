import * as z from "zod"

export const workPlaceSchema = z.object({
  company: z.string().trim().min(1, { message: "Required" }),
  position: z.string().trim(),
  city: z.string().trim(),
  startDate: z
    .object({
      year: z.string().nullable(),
      month: z.string().nullable(),
      day: z.string().nullable(),
    })
    .nullable(),
  endDate: z
    .object({
      year: z.string().nullable(),
      month: z.string().nullable(),
      day: z.string().nullable(),
    })
    .nullable(),
  description: z.string().trim(),
  isCurrent: z.boolean(),
  privacy: z.enum(["SELF", "EVERYONE", "FRIENDS"]),
})
