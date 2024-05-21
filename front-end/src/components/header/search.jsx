import { Search as SearchIcon } from "@/svg"

import { cn } from "@/lib/utils"

export const Search = ({ className, ...props }) => {
  return (
    <div className="bg-background-comment flex items-center rounded-[50px] pl-3">
      <SearchIcon className="text-[#65676b]" />
      <input
        type="text"
        placeholder="Search Facebook"
        className={cn(
          "flex w-full border-none bg-transparent px-2 pb-[9px] pt-[7px] outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
}
