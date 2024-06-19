import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"
import { CircleDotIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const radioItemVariants = cva(
  "aspect-square rounded-full border shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[#1C1E1E] text-primary aria-checked:border-primary aria-checked:border-2",
        secondary: "border-secondary",
      },
      size: { lg: "", default: "h-5 w-5 min-w-5", sm: "h-3 w-3" },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
const circleDotVariants = cva("", {
  variants: {
    variant: {
      default: "fill-primary",
    },
    size: {
      default: "h-3 w-3",
      sm: "h-2 w-2 ",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          radioItemVariants({ variant, size, className }),
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <CircleDotIcon className={cn(circleDotVariants({ variant, size }))} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    )
  }
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
