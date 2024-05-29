import { Logo } from "@/svg"
import { Link } from "react-router-dom"

import { Account } from "./account"
import { AllMenu } from "./all-menu"
import { Messenger } from "./messenger"
import { NavMenu } from "./nav-menu"
import { Notifications } from "./notifications"
import { Search } from "./search"

export const Header = () => {
  return (
    <header className="fixed top-0 grid h-header w-full grid-cols-3 bg-background shadow-header">
      <div className="flex w-[320px] items-center gap-3 px-4">
        <Link to="/" className="">
          <Logo />
        </Link>
        <Search className="flex-1" />
      </div>
      <NavMenu />
      <div className="mr-4 flex items-center justify-end gap-2">
        <AllMenu />
        <Messenger />
        <Notifications />
        <Account />
      </div>
    </header>
  )
}
