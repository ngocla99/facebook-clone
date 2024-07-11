import { Link } from "react-router-dom"

import { Logo } from "@/assets/svg"

import { AccountSettings } from "./account-settings"
import { AllMenu } from "./all-menu"
import { Messenger } from "./messenger"
import { NavMenu } from "./nav-menu"
import { Notifications } from "./notifications"
import { Search } from "./search"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 grid h-header w-full grid-cols-[112px_1fr_204px] bg-background shadow-header sm:grid-cols-[204px_1fr_204px] xl:grid-cols-[320px_1fr_320px]">
      <div className="flex items-center gap-3 px-4">
        <Link to="/" className="">
          <Logo className="text-primary" />
        </Link>
        <Search className="flex-1" />
      </div>
      <NavMenu />
      <div className="flex items-center justify-end gap-2 pl-1 pr-4">
        <AllMenu />
        <Messenger />
        <Notifications />
        <AccountSettings />
      </div>
    </header>
  )
}
