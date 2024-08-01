import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export const UploadProfileCover = ({ user, className }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-bl-lg rounded-br-lg bg-background-comment hover:bg-hover",
        className
      )}
    >
      <div className="pt-[38%]"></div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)] px-5 py-[22px]">
        {!user.isVisitor && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="mx-3 gap-2 bg-white font-semibold hover:bg-background-comment"
                variant="secondary"
              >
                <i className="camera_filled_icon"></i>
                <p className="hidden lg:block">Add cover photo</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="grid p-2 shadow-2xl drop-shadow"
            >
              <Button variant="ghost" className="justify-start px-2 leading-5">
                <i className="photo_icon mr-3"></i>
                Choose cover photo
              </Button>
              <Button variant="ghost" className="justify-start px-2 leading-5">
                <i className="upload_icon_20 mr-3"></i>
                Upload photo
              </Button>
              <Button variant="ghost" className="justify-start px-2 leading-5">
                <i className="drag_icon mr-3"></i>
                Reposition
              </Button>
              <div className="mx-2">
                <Separator className="my-1" />
              </div>
              <Button variant="ghost" className="justify-start px-2 leading-5">
                <i className="trash_icon_20 mr-3"></i>
                Remove
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}
