import React from "react"

import { cn } from "@/lib/utils"
import { Search } from "@/assets/svg"

export const SearchInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label className="flex items-center rounded-[50px] bg-background-comment pl-3">
      <Search className="text-muted-foreground" />
      <input
        ref={ref}
        type="text"
        className={cn(
          "flex w-full border-none bg-transparent px-2 pb-[9px] pt-[7px] leading-5 outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </label>
  )
})

SearchInput.displayName = "SearchInput"
