import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const getInitialsName = (user) => {
  if (!user) return ""

  return `${user.first_name?.charAt(0) ?? ""} ${user.last_name?.charAt(0) ?? ""}`
}

export const formatNumber = (number, options = {}) => {
  const { decimals = 0, style = "decimal", notation = "compact" } = options

  return new Intl.NumberFormat("en-US", {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number))
}
