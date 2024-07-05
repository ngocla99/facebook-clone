import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Return } from "@/assets/svg"

import { HeadOnBack, VIEWS } from "../create-post-form"

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

export const PostAudience = ({ setView }) => {
  return (
    <>
      <HeadOnBack title="Post Audience" onBack={() => setView(VIEWS.ROOT)} />
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
      <DialogFooter className="shadow-[0_2px_5px_rgba(0,0,0,0.5)] sm:flex-col sm:space-x-0">
        <div className="flex items-center pt-2">
          <div className="grid size-10 place-items-center rounded-full hover:bg-hover">
            <Checkbox />
          </div>
          <p className="text-[15px] font-semibold">Set as default audience.</p>
        </div>
        <div className="flex justify-end gap-3 p-3">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary"
            onClick={() => setView(VIEWS.ROOT)}
          >
            Cancel
          </Button>
          <Button className="w-[116px] text-[15px]">Done</Button>
        </div>
      </DialogFooter>
    </>
  )
}
