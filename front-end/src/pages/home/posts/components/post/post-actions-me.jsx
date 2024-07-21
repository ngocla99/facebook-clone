import { usePostEditModal } from "@/stores"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Dots } from "@/assets/svg"

export const PostActionsMe = ({ onEdit }) => {
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
          disabled
          className="h-auto items-start justify-start gap-3 p-2 text-left"
        >
          <i className="save_icon filter-primary-icon pt-2"></i>
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Save post</p>
            <p className="text-xs font-normal leading-none text-muted-foreground">
              Add this to your saved items.
            </p>
          </div>
        </Button>
        <div className="mx-2">
          <Separator className="my-2"></Separator>
        </div>
        <Button
          variant="ghost"
          className="justify-start gap-3 px-2"
          onClick={onEdit}
        >
          <i className="edit_icon_20 filter-primary-icon"></i>
          <p>Edit post</p>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 px-2">
          <i className="setting_icon filter-primary-icon"></i>
          <p>Edit audience</p>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="turnOffNotifications_icon filter-primary-icon"></i>
          <p>Turn off notifications for this post</p>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="fb_language_icon filter-primary-icon"></i>
          <p>Turn on translations</p>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="date_icon filter-primary-icon"></i>
          <p>Edit date</p>
        </Button>
        <div className="mx-2">
          <Separator className="my-2"></Separator>
        </div>
        <Button variant="ghost" className="justify-start gap-3 px-2" disabled>
          <i className="archive_icon filter-primary-icon"></i>
          <p>Move to archive</p>
        </Button>
        <Button
          variant="ghost"
          className="h-auto items-start justify-start gap-3 p-2 text-left"
        >
          <i className="delete_icon filter-primary-icon"></i>
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Move to trash</p>
            <p className="text-xs font-normal leading-none text-muted-foreground">
              Items in your trash are deleted after 30 days.
            </p>
          </div>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
