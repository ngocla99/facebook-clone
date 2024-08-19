import { useSticky } from "@/hooks"
import { Link, useLocation, useParams } from "react-router-dom"

import { cn, getInitialsName } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { tabsTriggerVariants } from "@/components/ui/tabs"
import { Dots } from "@/assets/svg"

export const ProfileMenu = ({ className }) => {
  const { ref, isSticky } = useSticky()
  const { username } = useParams()
  const { data: user } = useProfile(username)
  console.log("🚀 ~ ProfileMenu ~ user:", user)
  const { pathname } = useLocation()
  const paths = pathname.split("/")
  const activePath = paths[paths.length - 1]

  return (
    <div
      ref={ref}
      className="sticky -top-[1px] z-10 -mt-[56px] bg-card pt-[56px] shadow"
    >
      <div className="container flex h-[60px] items-center px-4">
        {isSticky ? (
          <Button
            className="mx-2 h-[56px] gap-3 px-2"
            variant="ghost"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Avatar>
              <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
            </Avatar>
            <p className="text-lg font-semibold">
              {user.firstName + " " + user.lastName}
            </p>
          </Button>
        ) : (
          <>
            <ProfileMenuItem
              to="posts"
              title="Posts"
              data-state={
                activePath === "posts" || activePath === username
                  ? "active"
                  : null
              }
            />
            <ProfileMenuItem
              to="about"
              title="About"
              data-state={activePath === "about" ? "active" : null}
            />
            <ProfileMenuItem to="" title="Friends" disabled />
            <ProfileMenuItem to="" title="Photos" disabled />
            <ProfileMenuItem to="" title="Reels" disabled />
            <ProfileMenuItem to="" title="More" disabled />
          </>
        )}

        <Button variant="secondary" className="ml-auto w-12" disabled>
          <Dots className="size-4" />
        </Button>
      </div>
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
