import React from "react"
import { useMediaQuery } from "@/hooks"
import {
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Market,
  More,
  Watch,
} from "@/svg"
import { NavLink } from "react-router-dom"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
]

export const NavMenu = () => {
  const isTablet = useMediaQuery("(max-width:1100px)")
  const [navList, setNavList] = React.useState([])

  React.useEffect(() => {
    if (!isTablet) {
      setNavList([
        ...mainNav,
        {
          title: "Gaming",
          href: "/gaming",
          Icon: Gaming,
          IconActive: Gaming,
        },
      ])
    } else {
      setNavList([
        ...mainNav,
        {
          title: "More",
          href: "/more",
          Icon: More,
          IconActive: More,
        },
      ])
    }
  }, [isTablet])

  return (
    <div className="flex items-stretch justify-center gap-2">
      {navList.map(({ title, href, Icon, IconActive }) => (
        <NavLink
          to={href}
          key={href}
          className="group relative flex min-w-[50px] max-w-[calc(15vw-55px)] flex-1 items-center justify-center lg:max-w-[112px] xl:max-w-[130px]"
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
                <div className="absolute inset-x-0 inset-y-1 rounded-lg bg-hover opacity-0 transition-opacity group-hover:opacity-100" />
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
