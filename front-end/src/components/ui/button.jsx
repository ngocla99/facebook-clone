import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:bg-secondary disabled:text-[#BCC4C0] disabled:pointer-events-none active:scale-[0.96] after:content-[''] after:rounded-md after:inset-0 after:absolute",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]",
        deemphasized:
          "bg-[#EBF5FF] text-[#0064D1] hover:after:bg-hover active:after:bg-[rgba(25,110,255,0.15)]",
        white:
          "bg-white text-primary-foreground hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]",
        ghost:
          "bg-transparent text-secondary-foreground hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)] active:scale-1 disabled:bg-transparent disabled:opacity-50",
        link: "text-primary underline-offset-2 hover:underline active:scale-1 hover:after:bg-transparent",
      },
      size: {
        xl: "h-[52px] px-4 font-medium",
        lg: "h-12 rounded-md px-4",
        default: "h-9 rounded-md px-3 font-semibold",
        sm: "h-8 rounded-md text-sm",
        icon: "h-7 w-7 p-0 rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        // if onClick is passed, it's a "button" type, otherwise it's being used in a form, hence "submit"
        type={props.onClick ? "button" : "submit"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
