import { Button } from "@/components/ui/button"

import { HeadOnBack, VIEWS } from "../post-form"

export const PostMore = ({ setView }) => {
  return (
    <>
      <HeadOnBack title="Add to your post" onBack={() => setView(VIEWS.ROOT)} />
      <div className="grid grid-cols-2 gap-2 p-2">
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
        >
          <img src="/icons/photo.png" alt="Photo" className="size-6" />
          <p className="text-lg">Photo/video</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          onClick={() => setView(VIEWS.TAG)}
        >
          <img src="/icons/tagFriend.png" alt="Tag Friend" className="size-6" />
          <p className="text-lg">Tag people</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          onClick={() => setView(VIEWS.FEELING)}
        >
          <img src="/icons/feeling.png" alt="Feeling" className="size-6" />
          <p className="text-lg">Feeling/activity</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          onClick={() => setView(VIEWS.LOCATION)}
        >
          <img src="/icons/map.png" alt="Map" className="size-6" />
          <p className="text-lg">Check in</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          onClick={() => setView(VIEWS.GIF)}
        >
          <img src="/icons/gif.png" alt="Gif" className="size-6" />
          <p className="text-lg">GIF</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          disabled={true}
          onClick={() => {}}
        >
          <img
            src="/icons/live-video.png"
            alt="Live video"
            className="size-6"
          />
          <p className="text-lg">Live video</p>
        </Button>
        <Button
          className="h-[44px] justify-start gap-3 px-2 text-left"
          variant="ghost"
          onClick={() => setView(VIEWS.EVENTS)}
        >
          <img src="/icons/flag.png" alt="Life event" className="size-6" />
          <p className="text-lg">Life event</p>
        </Button>
      </div>
    </>
  )
}
