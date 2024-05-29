import React from "react"

import { useClickOutside } from "@/hooks/use-click-outside"

import { SearchInput } from "./search-input"
import { SearchMenu } from "./search-menu"

export const Search = ({ className }) => {
  const [isShowRecent, setIsShowRecent] = React.useState(false)
  const menuRef = React.useRef(null)

  useClickOutside(menuRef, () => setIsShowRecent(false))

  return (
    <div className={className}>
      <SearchInput onClick={() => setIsShowRecent(true)} />
      {isShowRecent && <SearchMenu ref={menuRef} />}
    </div>
  )
}
