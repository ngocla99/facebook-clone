import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Market,
  More,
  Watch,
} from "@/assets/svg"

const mainNav = [
  {
    key: "home",
    title: "Home",
    href: "/",
    Icon: Home,
    IconActive: HomeActive,
  },
  {
    key: "video",
    title: "Video",
    href: "/video",
    Icon: Watch,
    IconActive: Watch,
  },
  {
    key: "marketplace",
    title: "Marketplace",
    href: "/marketplace",
    Icon: Market,
    IconActive: Market,
  },
  {
    key: "group",
    title: "Group",
    href: "/group",
    Icon: Friends,
    IconActive: FriendsActive,
  },
  {
    key: "gaming",
    title: "Gaming",
    href: "/gaming",
    Icon: Gaming,
    IconActive: Gaming,
  },
  {
    key: "more",
    title: "More",
    href: "/more",
    Icon: More,
    IconActive: More,
  },
]

export const NavMenu = () => {
  return (
    <div className="flex items-stretch justify-start gap-2 min-[710px]:justify-center">
      {mainNav.map(({ key, title, href, Icon, IconActive }) => (
        <NavLink
          to={href}
          key={href}
          className={cn(
            "group relative hidden min-w-[50px] max-w-[calc(15vw-55px)] flex-1 items-center justify-center min-[710px]:flex lg:max-w-[112px] xl:max-w-[130px]",
            key === "more" && "flex lg:hidden",
            key === "gaming" && "min-[710px]:hidden lg:flex"
          )}
        >
          {({ isActive }) => (
            <Tooltip>
              <TooltipTrigger>
                {isActive ? (
                  <>
                    <IconActive className="text-[#1b74e4]" />
                    <div className="absolute bottom-0 left-[2px] right-[2px] h-[3px] bg-primary" />
                  </>
                ) : (
                  <Icon className="text-muted-foreground" />
                )}
                <div className="absolute inset-x-0 inset-y-1 rounded-lg bg-hover opacity-0 transition-all group-hover:opacity-100 group-active:bg-[rgba(0,0,0,0.1)]" />
              </TooltipTrigger>
              <TooltipContent sideOffset={16}>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </NavLink>
      ))}
    </div>
  )
}
