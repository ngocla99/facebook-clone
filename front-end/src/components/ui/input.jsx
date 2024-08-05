import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:placeholder:text-[#939597] focus:outline-none focus:ring focus:ring-[#e7f3ff] focus:border-[#0866ff] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus:ring-red-100",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
      },
      size: {
        default: "h-[52px] rounded-md px-4 py-[14px] text-lg leading-4",
        sm: "h-10 rounded-md px-3 text-sm",
        lg: "h-14 rounded-md px-4 text-[16px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Input = React.forwardRef(({ className, size, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
