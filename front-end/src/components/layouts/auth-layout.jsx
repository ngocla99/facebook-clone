import { Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"

import { LoginFooter } from "./login-footer"

export const AuthLayout = ({ className }) => {
  return (
    <div className={cn("font-auth", className)}>
      <Outlet />
      <div className="pt-5">
        <LoginFooter className="mx-10 lg:mx-auto lg:w-[980px]" />
      </div>
    </div>
  )
}
