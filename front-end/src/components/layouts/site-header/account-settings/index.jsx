import React from "react"
import { getMeApi } from "@/api/services/auth"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ViewBase } from "./view-base"
import { ViewDisplay } from "./view-display"
import { ViewFbLanguage } from "./view-fb-language"
import { ViewKeyboard } from "./view-keyboard"
import { ViewLanguage } from "./view-language"
import { ViewSettings } from "./view-settings"
import { ViewSupport } from "./view-support"

export const VIEWS = {
  BASE: "base",
  SETTINGS: "Settings & privacy",
  SUPPORT: "Help & support",
  DISPLAY: "Display & accessibility",
  LANGUAGE: "Language",
  FB_LANGUAGE: "Facebook language",
  KEYBOARD: "Keyboard",
}

const ViewRoot = ({ setView, children }) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { setView })
        }

        return child
      })}
    </>
  )
}

const View = () => {
  const [view, setView] = React.useState(VIEWS.BASE)

  const component = () => {
    switch (view) {
      case VIEWS.BASE:
        return <ViewBase />
      case VIEWS.SETTINGS:
        return <ViewSettings />
      case VIEWS.DISPLAY:
        return <ViewDisplay />
      case VIEWS.LANGUAGE:
        return <ViewLanguage />
      case VIEWS.FB_LANGUAGE:
        return <ViewFbLanguage />
      case VIEWS.SUPPORT:
        return <ViewSupport />
      case VIEWS.KEYBOARD:
        return <ViewKeyboard />
    }
  }

  return <ViewRoot setView={setView}>{component()}</ViewRoot>
}

export const AccountSettings = () => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])

  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <div className="h-10 w-10">
            <TooltipTrigger>
              <Avatar>
                <AvatarImage src={user.picture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent sideOffset={9}>Account</TooltipContent>
          </div>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-[360px] p-0 shadow-3xl">
        <View />
      </PopoverContent>
    </Popover>
  )
}
