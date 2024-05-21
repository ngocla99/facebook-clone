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
      <div className="ml-4 flex items-center gap-3">
        <Link to="/" className="">
          <Logo />
        </Link>
        <Search />
      </div>
      <NavMenu />
      <div className="flex items-center justify-end gap-2">
        <AllMenu />
        <Notifications />
        <Messenger />
        <Account />
      </div>
    </header>
  )
}
