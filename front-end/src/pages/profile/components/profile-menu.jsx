import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { tabsTriggerVariants } from "@/components/ui/tabs"
import { Dots } from "@/assets/svg"

export const ProfileMenu = ({ className }) => {
  return (
    <div className={cn("flex items-center px-16", className)}>
      <ProfileMenuItem to="posts" title="Posts" data-state="active" />
      <ProfileMenuItem to="" title="About" disabled={true} />
      <ProfileMenuItem to="" title="Friends" disabled />
      <ProfileMenuItem to="" title="Photos" disabled />
      <ProfileMenuItem to="" title="Reels" disabled />
      <ProfileMenuItem to="" title="More" disabled />
      <Button variant="secondary" className="ml-auto w-12">
        <Dots className="size-4" />
      </Button>
    </div>
  )
}

const ProfileMenuItem = ({ to, title, ...props }) => {
  return (
    <Link to={to} className={tabsTriggerVariants({ size: "lg" })} {...props}>
      {title}
      <div className="absolute bottom-1 left-0 right-0 top-1 rounded-lg bg-hover opacity-0 group-hover:opacity-100 group-data-[state=active]:bg-transparent"></div>
    </Link>
  )
}
