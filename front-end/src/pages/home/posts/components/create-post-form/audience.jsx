import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Return } from "@/assets/svg"

import { VIEWS } from "."

const optionsAudience = [
  {
    key: "public",
    title: "Public",
    description: "Anyone on or off Facebook",
    imgSrc: "icons/24x24/public.png",
  },
  {
    key: "friends",
    title: "Friends",
    description: "Your friends on Facebook",
    imgSrc: "icons/24x24/friends.png",
  },
  {
    key: "friends-except",
    title: "Friends except...",
    description: "Don't show to some friends",
    imgSrc: "icons/24x24/friends-except.png",
  },
  {
    key: "specific-friends",
    title: "Specific friends",
    description: "Only show to some friends",
    imgSrc: "icons/24x24/friend.png",
  },
  {
    key: "private",
    title: "Only me",
    imgSrc: "icons/24x24/private.png",
  },
  {
    key: "custom",
    title: "Custom",
    description: "Include and exclude friends and lists",
    imgSrc: "icons/24x24/setting.png",
  },
  {
    key: "close-friends",
    title: "Close friends",
    description: "Your custom list",
    imgSrc: "icons/24x24/close-friends.png",
  },
]

export const Audience = ({ setView }) => {
  return (
    <>
      <DialogHeader className="flex-rows relative items-center space-y-0 border-b border-border px-4 py-3 text-center">
        <Button
          variant="secondary"
          className="absolute left-4 top-3 w-9 rounded-full p-0"
          onClick={() => setView(VIEWS.ROOT)}
        >
          <Return className="text-[#65676b]" />
        </Button>
        <DialogTitle className="leading-9">Post Audience</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[470px]">
        <div className="p-4">
          <h3 className="text-[17px] font-semibold">Who can see your post?</h3>
          <p className="mt-1 text-[15px] leading-5 text-muted-foreground">
            Your post will show up in Feed, on your profile and in search
            results.
          </p>
          <p className="mt-3 text-[15px] leading-5 text-muted-foreground">
            Your default audience is set to{" "}
            <span className="font-semibold">Only me</span>, but you can change
            the audience of this specific post.
          </p>
        </div>
        <RadioGroup defaultValue="option-one" className="gap-0 px-2 pb-2">
          {optionsAudience.map((itm) => (
            <Label
              key={itm.key}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-auto justify-start gap-4 p-2"
              )}
              htmlFor={itm.key}
            >
              <div className="grid size-[60px] place-items-center rounded-full bg-secondary">
                <img src={itm.imgSrc} alt={itm.key} />
              </div>
              <div className="grid flex-1">
                <p className="text-[17px] font-medium leading-5">{itm.title}</p>
                {itm.description && (
                  <span className="text-[15px] font-normal text-muted-foreground">
                    {itm.description}
                  </span>
                )}
              </div>
              <RadioGroupItem value={itm.key} id={itm.key} />
            </Label>
          ))}
        </RadioGroup>
      </ScrollArea>
      <DialogFooter className="shadow-[0_2px_5px_rgba(0,0,0,0.5)] sm:flex-col">
        <div className="flex items-center p-2">
          <Button variant="ghost" size="icon" className="size-10">
            Check
          </Button>
          <p className="text-[15px] font-semibold">Set as default audience.</p>
        </div>
        <div className="flex justify-end gap-3 p-3">
          <Button variant="ghost" className="text-primary hover:text-primary">
            Cancel
          </Button>
          <Button className="w-[116px] text-[15px]">Done</Button>
        </div>
      </DialogFooter>
    </>
  )
}
