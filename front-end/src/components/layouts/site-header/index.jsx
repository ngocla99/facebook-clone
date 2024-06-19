import { Logo } from "@/svg"
import { Link } from "react-router-dom"

import { AccountSettings } from "./account-settings"
import { AllMenu } from "./all-menu"
import { Messenger } from "./messenger"
import { NavMenu } from "./nav-menu"
import { Notifications } from "./notifications"
import { Search } from "./search"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 grid h-header w-full grid-cols-3 bg-background shadow-header">
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
        <AccountSettings />
      </div>
    </header>
  )
}
