import * as z from "zod"

export const workPlaceSchema = z
  .object({
    company: z
      .string()
      .trim()
      .min(1, { message: "The employer you entered is not valid." }),
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
  .refine(
    (data) => {
      if (!data.isCurrent && data.endDate?.year) {
        function toDateObject(dateObj) {
          const year = +dateObj.year
          const month = dateObj.month ? +dateObj.month - 1 : 0
          const day = dateObj.day ? +dateObj.day : 1
          return new Date(year, month, day)
        }

        const start = toDateObject(data.startDate)
        const end = toDateObject(data.endDate)
        return end > start
      }
      return true
    },
    {
      message:
        "Your end date can't be earlier than your start date. Please try again.",
      path: ["timeRange"],
    }
  )

export const currentCitySchema = z.object({
  name: z.string().trim().min(1, { message: "Required." }),
  privacy: z.enum(["SELF", "EVERYONE", "FRIENDS"]),
})

export const hometownSchema = z.object({
  name: z.string().trim().min(1, { message: "Required." }),
  privacy: z.enum(["SELF", "EVERYONE", "FRIENDS"]),
})

export const hiddenDetailsSchema = z.object({
  hiddenDetails: z.array(z.string()),
})
