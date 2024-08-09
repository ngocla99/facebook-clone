import React from "react"

import { cn } from "@/lib/utils"

import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export const MuiTextarea = React.forwardRef(
  ({ label, className, ...props }, ref) => {
    return (
      <Label className="relative">
        <Textarea
          ref={ref}
          size="lg"
          className={cn(
            "peer min-h-[96px] px-4 pb-[10px] pt-[26px] text-[16px] font-normal hover:border-muted-foreground focus:border-border focus:ring-2 focus:ring-primary focus:ring-offset-2",
            className
          )}
          placeholder=" "
          {...props}
        ></Textarea>
        <span
          data-label={label}
          className="before:pointer-events-none before:absolute before:bottom-0 before:left-4 before:right-2 before:top-0 before:mt-5 before:h-5 before:-translate-y-3.5 before:text-[12px] before:font-normal before:leading-none before:text-muted-foreground before:transition-all before:content-[attr(data-label)] after:absolute after:transition-all peer-placeholder-shown:before:translate-y-0 peer-placeholder-shown:before:text-[16px] peer-focus:before:-translate-y-3.5 peer-focus:before:text-[12px] peer-focus:before:text-primary"
        ></span>
      </Label>
    )
  }
)
