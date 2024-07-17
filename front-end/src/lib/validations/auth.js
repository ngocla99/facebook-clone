import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string({ required_error: "Password is required." }),
  // .min(8, {
  //   message: "Password must be at least 8 characters long",
  // })
  // .max(100)
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
  //   message:
  //     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  // }),
})

export const signUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required." })
      .trim()
      .min(1, {
        message: "What's your name?",
      })
      .min(2, {
        message: "First name must be between 2 and 16 characters.",
      })
      .max(16, {
        message: "First name must be between 2 and 16 characters.",
      })
      .regex(/^[aA-zZ]+$/, {
        message: "Number and special characters are not allowed.",
      }),
    lastName: z
      .string({ required_error: "Surname is required." })
      .trim()
      .min(1, {
        message: "What's your name?",
      })
      .min(2, {
        message: "Surname must be between 2 and 16 characters.",
      })
      .max(16, {
        message: "Surname must be between 2 and 16 characters.",
      })
      .regex(/^[aA-zZ]+$/, {
        message: "Number and special characters are not allowed.",
      }),
    email: z
      .string()
      .min(1, {
        message:
          "You'll use this when you log in and if you ever need to reset your password",
      })
      .email({
        message: "Please enter a valid email address.",
      }),
    password: z
      .string({ required_error: "Password is required." })
      .min(1, {
        message:
          "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)",
      })
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(36, {
        message: "Password can't be more than 36 characters.",
      }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
    //   "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character"
    // ),
    bYear: z.string(),
    bMonth: z.string(),
    bDay: z.string(),
    gender: z.string().min(1, {
      message: "Please choose a gender. You can change who can see this later.",
    }),
  })
  .refine(
    (data) => {
      const today = new Date()
      let age = today.getFullYear() - data.bYear
      const monthDiff = today.getMonth() - (data.bMonth - 1)
      const dayDiff = today.getDate() - data.bDay

      // Adjust age if the current date is before the birth date
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
      }
      return age >= 14 && age <= 70
    },
    {
      message:
        "It looks like you're entered the wrong info. Please make sure that you use your real date of birth",
      path: ["birthDate"],
    }
  )

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, {
    message: "Fill in at least one field to search for your account",
  }),
})

export const resetCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .refine((val) => !isNaN(val), {
      message:
        "It looks like you've entered some letters. Your code is 6 numbers long.",
    })
    .superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a code.",
          fatal: true,
        })
        return z.NEVER
      }
      if (val.length === 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You only entered one number. Please check your code and try again.`,
          fatal: true,
        })
      }
      if (val.length > 1 && val.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You only entered ${val.length} number. Please check your code and try again.`,
          fatal: true,
        })
        return z.NEVER
      }
      if (val.length === 6) return true
      if (val.length > 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You've entered more than six numbers. Please check your code and try again.`,
          fatal: true,
        })
      }
    }),
})

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "short",
    })
    .superRefine((password, ctx) => {
      const uppercaseRegex = /[A-Z]/
      const lowercaseRegex = /[a-z]/
      const numberRegex = /[0-9]/
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

      const uppercaseValid = uppercaseRegex.test(password)
      const lowercaseValid = lowercaseRegex.test(password)
      const numberValid = numberRegex.test(password)
      const specialCharValid = specialCharRegex.test(password)
      const lengthValid = password.length >= 8

      if (
        (uppercaseValid && numberValid && lengthValid) ||
        (uppercaseValid && specialCharValid && lengthValid) ||
        (uppercaseValid && specialCharValid && numberValid) ||
        (lowercaseValid && specialCharValid && numberValid && lengthValid)
      ) {
        return true
      }

      if (
        (numberValid && lowercaseValid) ||
        (uppercaseValid && lowercaseValid) ||
        (uppercaseValid && numberValid && !lengthValid) ||
        (uppercaseValid && specialCharValid && !lengthValid) ||
        (lowercaseValid && numberValid && lengthValid)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "medium",
          fatal: true,
        })
        return z.NEVER
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "weak",
        fatal: true,
      })
    }),
})
