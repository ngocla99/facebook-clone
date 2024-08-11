import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export const Left = ({ className }) => {
  const { pathname } = useLocation()
  const activePath = pathname.split("/")[2]

  return (
    <div className={cn("grid p-2", className)}>
      <div className="flex justify-between px-2 pt-1">
        <h3 className="text-[24px] font-bold">Friends</h3>
        <Button variant="secondary" size="icon" className="size-9">
          <i className="settings_filled_icon"></i>
        </Button>
      </div>
      <div className="mt-2 grid">
        <Button
          variant="ghost"
          size="xl"
          className={cn(
            "flex justify-start gap-3 px-2 text-lg",
            !activePath && "bg-hover after:content-none"
          )}
        >
          <div
            className={cn(
              "grid size-9 place-items-center rounded-full bg-background-secondary",
              !activePath && "bg-primary [&>i]:invert"
            )}
          >
            <i className="friends_home_icon"></i>
          </div>
          Home
        </Button>
        <Link
          to="requests"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "xl",
              className: "flex justify-start gap-3 px-2 text-lg",
            })
          )}
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="friends_requests_icon"></i>
          </div>
          Friend Requests
          <i className="right_icon ml-auto"></i>
        </Link>
        <Button
          variant="ghost"
          size="xl"
          className="flex justify-start gap-3 px-2 text-lg"
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="friends_suggestions_icon"></i>
          </div>
          Suggestions
          <i className="right_icon ml-auto"></i>
        </Button>
        <Button
          variant="ghost"
          size="xl"
          className="flex justify-start gap-3 px-2 text-lg"
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="all_friends_icon"></i>
          </div>
          All friends
          <i className="right_icon ml-auto"></i>
        </Button>
        <Button
          variant="ghost"
          size="xl"
          className={cn(
            "flex justify-start gap-3 px-2 text-lg",
            activePath === "birth_days" && "bg-hover after:content-none"
          )}
        >
          <div
            className={cn(
              "grid size-9 place-items-center rounded-full bg-background-secondary",
              activePath === "birth_days" && "bg-primary [&>i]:invert"
            )}
          >
            <i className="birthdays_icon"></i>
          </div>
          Birth days
        </Button>
        <Button
          variant="ghost"
          size="xl"
          className="flex justify-start gap-3 px-2 text-lg"
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="all_friends_icon"></i>
          </div>
          Custom Lists
          <i className="right_icon ml-auto"></i>
        </Button>
      </div>
    </div>
  )
}
