import { getImagesApi } from "@/api/services/image"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProfilePhotos = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  const { data: photos, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: () =>
      getImagesApi({
        path: `${user.username}/post_images`,
        sort: "desc",
        max: 30,
      }),
    select: (data) => data.resources,
    enabled: !!user,
  })

  if (isLoading) return "Loading.."

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="relative flex items-center justify-between">
          <Link
            to=""
            className="cursor-pointer text-xl font-bold leading-none hover:underline hover:underline-offset-1"
          >
            Photos
          </Link>
          <Link
            to=""
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute -bottom-2 -right-2 rounded-sm px-2 text-lg font-normal text-primary"
            )}
          >
            See all photos
          </Link>
        </div>
        <div className="mt-[22px] grid grid-cols-3 gap-1 overflow-hidden rounded-lg">
          {photos?.length
            ? photos.slice(0, 9).map((itm) => (
                <div
                  key={itm.asset_id}
                  className="relative after:absolute after:inset-0 after:rounded-md after:content-[''] hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]"
                >
                  <img
                    src={itm.url}
                    alt={itm.filename}
                    className="aspect-square border border-border object-cover"
                  />
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  )
}
