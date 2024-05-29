import {
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Market,
  Watch,
} from "@/svg"
import { NavLink } from "react-router-dom"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const mainNav = [
  {
    title: "Home",
    href: "/",
    Icon: Home,
    IconActive: HomeActive,
  },
  {
    title: "Video",
    href: "/video",
    Icon: Watch,
    IconActive: Watch,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    Icon: Market,
    IconActive: Market,
  },
  {
    title: "Group",
    href: "/group",
    Icon: Friends,
    IconActive: FriendsActive,
  },
  {
    title: "Gaming",
    href: "/gaming",
    Icon: Gaming,
    IconActive: Gaming,
  },
]

export const NavMenu = () => {
  return (
    <div className="flex items-stretch gap-2">
      {mainNav.map(({ title, href, Icon, IconActive }) => (
        <NavLink
          to={href}
          key={href}
          className="group relative flex min-w-[50px] flex-1 items-center justify-center"
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
                  <Icon />
                )}
                <div className="bg-hover absolute inset-x-0 inset-y-1 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" />
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
