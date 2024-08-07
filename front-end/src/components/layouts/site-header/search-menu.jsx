import React from "react"
import { X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/input/search-input"
import { Return } from "@/assets/svg"

export const SearchMenu = React.forwardRef(({ onBack }, ref) => {
  const inputRef = React.useRef()

  React.useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 h-[500px] w-80 transform-none rounded-lg rounded-tl-none bg-card p-0 shadow-2xl"
    >
      <div className="grid h-14 grid-cols-[auto_1fr] items-center gap-2 px-4">
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full p-0"
          onClick={onBack}
        >
          <Return className="text-[#65676b]" />
        </Button>
        <SearchInput
          placeholder="Search Facebook"
          ref={inputRef}
          className="h-10"
        />
      </div>
      <div className="p-2">
        <div className="mb-2 flex h-[21px] items-center justify-between px-2">
          <p className="text-lg font-semibold">Recent</p>
          <Button
            variant="ghost"
            className="mr-[-6px] h-9 rounded-sm px-2 font-normal text-[#0064d1] hover:text-[#0064d1]"
          >
            Edit
          </Button>
        </div>
        <RecentItem />
        <RecentItem />
        <RecentItem />
      </div>
    </div>
  )
})

SearchMenu.displayName = "SearchMenu"

const RecentItem = () => {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-hover">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-[10px]">
        <p className="font-semibold">Phan Lan Anh</p>
        <span className="text-sm text-muted-foreground">Friend</span>
      </div>
      <Button variant="ghost" size="icon">
        <X size={13} className="text-muted-foreground" />
      </Button>
    </div>
  )
}
