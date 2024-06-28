import React from "react"
import { ArrowDown1, ArrowUp } from "@/assets/svg"
import { Link } from "react-router-dom"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { InfoFooter } from "@/components/layouts/info-footer"

export const SidebarNav = ({ className }) => {
  const [showMoreFeature, setShowMoreFeature] = React.useState(false)
  const [showMoreShortcut, setShowMoreShortcut] = React.useState(false)

  return (
    <div className={className}>
      <ScrollArea
        className="h-[calc(100vh-56px)]"
        classNameViewport="[&>div]:relative [&>div]:h-full [&>div]:pb-[64px]"
      >
        <div className="mt-4 grid px-2">
          <LinkItem>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Nemo</p>
          </LinkItem>
          {siteConfig.leftMenu.slice(0, 5).map((link, i) => (
            <LinkItem key={i}>
              <img src={`/left/${link.img}.png`} alt={link.text} />
              <p>{link.text}</p>
            </LinkItem>
          ))}
          {showMoreFeature && (
            <>
              {siteConfig.leftMenu.slice(5, 18).map((link, i) => (
                <LinkItem key={i}>
                  <img src={`/left/${link.img}.png`} alt={link.text} />
                  <p>{link.text}</p>
                </LinkItem>
              ))}
            </>
          )}
          <LinkItem onClick={() => setShowMoreFeature((prev) => !prev)}>
            <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
              {!showMoreFeature ? <ArrowDown1 /> : <ArrowUp />}
            </div>
            {!showMoreFeature ? <p>See more</p> : <p>See less</p>}
          </LinkItem>
          <div className="mx-2">
            <Separator className="my-2" />
          </div>
          <div className="group grid">
            <div className="mx-2 flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-muted-foreground">
                Your shortcuts
              </h3>
              <Button
                variant="ghost"
                className="h-9 rounded-sm px-2 text-[15px] font-normal text-[#0064d1] opacity-0 hover:text-[#0064d1] group-hover:opacity-100"
              >
                Edit
              </Button>
            </div>
            {siteConfig.shortcutMenu.map((link, i) => (
              <LinkItem key={i}>
                <img
                  className="h-9 w-9 rounded-lg object-cover"
                  src={`/images/${link.img}.png`}
                  alt={link.text}
                />
                <p>{link.text}</p>
              </LinkItem>
            ))}
            <LinkItem onClick={() => setShowMoreShortcut((prev) => !prev)}>
              <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
                {!showMoreShortcut ? <ArrowDown1 /> : <ArrowUp />}
              </div>
              {!showMoreShortcut ? <p>See more</p> : <p>See less</p>}
            </LinkItem>
          </div>
        </div>
        <InfoFooter className="absolute bottom-0 p-4" />
      </ScrollArea>
    </div>
  )
}

const LinkItem = ({ className, href, children, ...props }) => {
  const [left, right] = children
  return (
    <Button
      variant="ghost"
      size="xl"
      className={cn("justify-start gap-3 px-2 text-left", className)}
      asChild
      {...props}
    >
      <Link to={href}>
        {left}
        {right}
      </Link>
    </Button>
  )
}
