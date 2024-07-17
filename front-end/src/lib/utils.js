import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

/**
 * Gets the initials from a user's name.
 * @param {Object} user - The user object containing first and last name.
 * @returns {string} - The initials of the user.
 */
export const getInitialsName = (user) => {
  if (!user) return ""

  return `${user.firstName?.charAt(0) ?? ""} ${user.lastName?.charAt(0) ?? ""}`
}

/**
 * Formats a number according to the specified options.
 * @param {number} number - The number to format.
 * @param {Object} [options={}] - Formatting options.
 * @param {number} [options.decimals=0] - Number of decimal places.
 * @param {string} [options.style="decimal"] - The formatting style (e.g., "decimal", "currency").
 * @param {string} [options.notation="compact"] - The notation style (e.g., "standard", "compact").
 * @returns {string} - The formatted number as a string.
 */
export const formatNumber = (number, options = {}) => {
  const { decimals = 0, style = "decimal", notation = "compact" } = options

  return new Intl.NumberFormat("en-US", {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number))
}

/**
 * Filters out objects with duplicate keys from an array.
 * @param {Array} arr - The array of objects to be filtered.
 * @param {string} key - The key to check for duplicates.
 * @returns {Array} - A new array with duplicates removed based on the specified key.
 */
export const filterDuplicatesByKey = (arr, key) => {
  const seen = new Set()
  return arr.filter((item) => {
    const duplicate = seen.has(item[key])
    seen.add(item[key])
    return !duplicate
  })
}
