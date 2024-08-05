import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[60px] w-full font-medium resize-none placeholder:text-muted-foreground rounded-md border focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent px-3 py-2 shadow-sm border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        secondary:
          "bg-background-comment hover:bg-gradient-to-b hover:from-[rgba(0,0,0,0.05)] hover:to-[rgba(0,0,0,0.05)] px-3 py-2 border-separator focus-visible:outline-none focus-visible:border-primary focus-visible:bg-transparent focus-visible:placeholder:text-[#bfc4ca]",
      },
      size: {
        lg: "h-12 rounded-md px-4",
        default: "h-9 rounded-md px-3 font-semibold",
        sm: "h-8 rounded-md text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Textarea = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
