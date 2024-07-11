import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const getInitialsName = (user) => {
  if (!user) return ""

  return `${user.first_name?.charAt(0) ?? ""} ${user.last_name?.charAt(0) ?? ""}`
}
