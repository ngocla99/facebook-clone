import { getImagesApi } from "@/api/services/image"
import { useProfileUser } from "@/stores"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProfileFriends = ({ className }) => {
  const { user } = useProfileUser()

  const { data: photos, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: () =>
      getImagesApi({
        path: `${user.username}/post_images`,
        sort: "desc",
        max: 9,
      }),
    select: ({ data }) => data.resources,
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
            Friends
          </Link>
          <Button
            variant="ghost"
            className="absolute -bottom-2 -right-2 rounded-sm px-2 text-lg font-normal text-primary"
          >
            See all friends
          </Button>
        </div>
        <div className="mt-[22px] grid grid-cols-3 gap-3">
          {photos?.length &&
            photos.slice(0, 9).map((itm) => (
              <div key={itm.asset_id}>
                <div className="relative after:absolute after:inset-0 after:rounded-md after:content-[''] hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]">
                  <img
                    src={itm.url}
                    alt={itm.filename}
                    className="aspect-square rounded-lg border border-border object-cover"
                  />
                </div>
                <p className="mt-1 text-sm font-semibold">Nemo</p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
