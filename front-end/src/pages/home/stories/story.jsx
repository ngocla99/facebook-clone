import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export const Story = ({ story, className }) => {
  return (
    <Card
      className={cn(
        "group grid w-[140px] overflow-hidden hover:brightness-90",
        className
      )}
    >
      <CardContent className="relative flex flex-col p-0 ">
        <img
          className="h-full object-cover transition-transform group-hover:scale-[1.02]"
          src={story.image}
        />
        <div className="absolute left-3 top-3 drop-shadow-xl">
          <Avatar className="h-12 w-12 border-4 border-primary">
            <AvatarImage
              className="object-cover"
              src={story.profilePicture}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-[2px] size-3 rounded-full border-2 border-card bg-positive"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <div className="overlay-story aspect-[3]" />
          <div className="bg-[rgba(0,0,0,0.35)] px-3 pb-3">
            <p className="line-clamp-2 text-sm font-semibold leading-none text-white">
              {story.profileName}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
