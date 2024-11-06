import React from "react"
import { useMe } from "@/hooks"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import useMeasure from "react-use-measure"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
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

const ViewRoot = ({ view, setView, children }) => {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={view}
        initial={{ x: "110%", opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: "-110%", opacity: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { setView })
          }

          return child
        })}
      </motion.div>
    </AnimatePresence>
  )
}

const View = () => {
  const [view, setView] = React.useState(VIEWS.BASE)
  const [ref, bounds] = useMeasure()

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

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <motion.div animate={{ height: bounds.height }}>
        <div ref={ref}>
          <ViewRoot view={view} setView={setView}>
            {component()}
          </ViewRoot>
        </div>
      </motion.div>
    </MotionConfig>
  )
}

export const AccountSettings = () => {
  const { data: me } = useMe()

  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" }),
              "size-10 bg-white active:scale-[0.96]"
            )}
          >
            <Avatar>
              <AvatarImage src={me.picture} alt={me.username} />
              <AvatarFallback>{getInitialsName(me)}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent sideOffset={9}>Account</TooltipContent>
      </Tooltip>
      <PopoverContent className="overflow-hidden p-0 shadow-3xl min-[375px]:w-[360px]">
        <View />
      </PopoverContent>
    </Popover>
  )
}
