import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { ArrowTooltip } from "@/assets/svg"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef(
  (
    { className, align = "center", sideOffset = 4, children, ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "relative z-50 w-72 overflow-y-visible rounded-md bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          align === "end" && "rounded-r-none",
          align === "start" && "rounded-l-none",
          className
        )}
        {...props}
      >
        {children}
        <ArrowTooltip
          className={cn(
            "absolute -bottom-3 text-background",
            align === "center" && "right-1/2 translate-x-1/2",
            align === "end" && "-right-[1px] scale-x-[-1] scale-y-[1]",
            align === "start" && "-left-[1px]"
          )}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
