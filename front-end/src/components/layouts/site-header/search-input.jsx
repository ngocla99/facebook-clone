import React from "react"
import { Search } from "@/assets/svg"

import { cn } from "@/lib/utils"

export const SearchInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label className="flex items-center rounded-[50px] bg-background-comment pl-3">
      <Search className="text-[#65676b]" />
      <input
        ref={ref}
        type="text"
        placeholder="Search Facebook"
        className={cn(
          "flex w-full border-none bg-transparent px-2 pb-[9px] pt-[7px] outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </label>
  )
})

SearchInput.displayName = "SearchInput"
