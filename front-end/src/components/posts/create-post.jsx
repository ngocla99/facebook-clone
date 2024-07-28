import { usePostCreateModal } from "@/stores"
import { useQueryClient } from "@tanstack/react-query"

import { getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Feeling, LiveVideo, Photo } from "@/assets/svg"

/**
 * TODO:
 * 1. Change color of text by background color
 * 2. Add tag friend, feeling, checkin, gif, life event feature
 * 3. Add API create post
 * 4. Add search, pagination for GIF API
 * 5. Reload data still exists
 */

export const CreatePost = () => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])
  const postCreateModal = usePostCreateModal()

  return (
    <Card>
      <CardContent className="px-4 pb-[10px] pt-3">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.username} />
            <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            className="active:scale-1 min-h-10 flex-1 justify-start rounded-[20px] bg-background-comment px-3 py-2 text-lg font-normal text-muted-foreground after:rounded-[20px]"
            onClick={() => postCreateModal.onOpen({ openBy: null })}
          >
            What's on your mind, {user.firstName}?
          </Button>
        </div>
        <Separator className="mb-2 mt-3" />
        <div className="grid grid-cols-3">
          <Button variant="ghost" className="h-10 gap-2" disabled={true}>
            <LiveVideo className="text-[#f3425f]" />
            <p className="text-muted-foreground">Live video</p>
          </Button>
          <Button
            variant="ghost"
            className="h-10 gap-2"
            onClick={() => postCreateModal.onOpen({ openBy: "photo" })}
          >
            <Photo className="text-[#4bbf67]" />
            <p className="text-muted-foreground">Photo/video</p>
          </Button>
          <Button
            variant="ghost"
            className="h-10 gap-2"
            onClick={() => postCreateModal.onOpen({ openBy: "feeling" })}
          >
            <Feeling className="text-[#f7b928]" />
            <p className="text-muted-foreground">
              Feeling/activity
            </p>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
