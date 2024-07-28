import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Dots } from "@/assets/svg"

export const PostActionsOther = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <Dots className="filter-secondary-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={12}
        className="grid w-[344px] p-2 shadow-xl drop-shadow"
      >
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
          disabled
        >
          <i className="save_icon filter-primary-icon pt-2"></i>
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Save post</p>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              Add this to your saved items.
            </p>
          </div>
        </Button>
        <div className="mx-2">
          <Separator className="my-2"></Separator>
        </div>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="turnOnNotifications_icon filter-primary-icon"></i>
          <p>Turn on notifications for this post</p>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="embed_icon filter-primary-icon"></i>
          <p>Embed</p>
        </Button>
        <div className="mx-2">
          <Separator className="my-2"></Separator>
        </div>
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
          disabled
        >
          <img src="icons/hide.png" alt="Hide" />
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Hide post</p>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              See fewer posts like this.
            </p>
          </div>
        </Button>
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
          disabled
        >
          <img src="icons/time.png" alt="Hide" />
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">
              Snooze {user.firstName + " " + user.lastName} for 30 days
            </p>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              Temporarily stop seeing posts.
            </p>
          </div>
        </Button>
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
          disabled
        >
          <img src="icons/hideAll.png" alt="Hide" />
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">
              Unfollow {user.firstName + " " + user.lastName}
            </p>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              Stop seeing posts from this Page
            </p>
          </div>
        </Button>
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
          disabled
        >
          <img src="icons/reportFill.png" alt="Hide" />
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Report post</p>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              We won't let {user.firstName + " " + user.lastName} know who
              reported this.
            </p>
          </div>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
