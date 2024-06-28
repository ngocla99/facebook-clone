import React from "react"
import { useClickOutside } from "@/hooks"
import { Search as SearchIcon } from "@/assets/svg"

import { SearchMenu } from "./search-menu"

export const Search = ({ className }) => {
  const [isShowRecent, setIsShowRecent] = React.useState(false)
  const menuRef = React.useRef(null)

  useClickOutside(menuRef, () => setIsShowRecent(false))

  return (
    <div className={className}>
      <label className="flex h-10 w-10 items-center rounded-[50px] bg-background-comment pl-3 xl:h-auto xl:w-auto">
        <SearchIcon className="text-[#65676b]" />
        <input
          type="text"
          placeholder="Search Facebook"
          className="hidden w-full border-none bg-transparent px-2 pb-[9px] pt-[7px] outline-none placeholder:text-muted-foreground xl:flex"
          onClick={() => setIsShowRecent(true)}
        />
      </label>
      {isShowRecent && (
        <SearchMenu ref={menuRef} onBack={() => setIsShowRecent(false)} />
      )}
    </div>
  )
}
