import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const Left = ({ className }) => {
  const { pathname } = useLocation()
  const activePath = pathname.split("/")[2]

  return (
    <div className={cn("grid p-2", className)}>
      <div className="flex justify-between px-2 pt-1 flex-wrap">
        <h3 className="text-[20px] sm:text-[24px] font-bold">Friends</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="icon" className="size-9">
              <i className="settings_filled_icon"></i>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            alignOffset={-12}
            className="grid w-[344px] p-2 shadow-2xl z-20"
          >
            <div className="mt-2 px-2">
              <h3 className="text-lg font-medium">Notification settings</h3>
              <p className="text-sm text-muted-foreground">
                You can manage how you are notified about Friends updates.
              </p>
              <Separator className="my-3" />
            </div>
            <Label
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "xl",
                  className: "justify-start gap-3 px-2 text-base",
                })
              )}
            >
              <div className="grid size-9 place-content-center rounded-full bg-secondary">
                <i className="show_dots"></i>
              </div>
              <p className="">Show notification dots</p>
              <Switch className="ml-auto" disabled />
            </Label>
          </PopoverContent>
        </Popover>
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
          <span className="hidden sm:inline">Home</span>
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
          <span className="hidden sm:inline">Friend Requests</span>
          <i className="right_icon ml-auto"></i>
        </Link>
        <Link
          to="suggestions"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "xl",
              className: "flex justify-start gap-3 px-2 text-lg",
            })
          )}
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="friends_suggestions_icon"></i>
          </div>
          <span className="hidden sm:inline">Suggestions</span>
          <i className="right_icon ml-auto"></i>
        </Link>
        <Link
          to="list"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "xl",
              className: "flex justify-start gap-3 px-2 text-lg",
            })
          )}
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="all_friends_icon"></i>
          </div>
          <span className="hidden sm:inline">All friends</span>
          <i className="right_icon ml-auto"></i>
        </Link>
        <Button
          variant="ghost"
          size="xl"
          className={cn(
            "flex justify-start gap-3 px-2 text-lg",
            activePath === "birth_days" && "bg-hover after:content-none"
          )}
          disabled
        >
          <div
            className={cn(
              "grid size-9 place-items-center rounded-full bg-background-secondary",
              activePath === "birth_days" && "bg-primary [&>i]:invert"
            )}
          >
            <i className="birthdays_icon"></i>
          </div>
          <span className="hidden sm:inline">Birth days</span>
        </Button>
        <Button
          variant="ghost"
          size="xl"
          className="flex justify-start gap-3 px-2 text-lg"
          disabled
        >
          <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
            <i className="all_friends_icon"></i>
          </div>
          <span className="hidden sm:inline">Custom Lists</span>
          <i className="right_icon ml-auto"></i>
        </Button>
      </div>
    </div>
  )
}
