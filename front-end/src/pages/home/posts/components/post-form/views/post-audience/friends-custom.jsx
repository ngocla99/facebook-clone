import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { HeadOnBack, VIEWS } from "../../post-form"

export const FriendsCustom = ({ setView }) => {
  return (
    <>
      <HeadOnBack
        title="Custom privacy"
        onBack={() => setView(VIEWS.AUDIENCE)}
      />
      <div className="min-h-[440px] p-4">
        <h3 className="p-4 pb-3 text-xl font-bold leading-none">Share with</h3>
        <Input placeholder="These people or lists" />
        <div className="px-4">
          <Separator className="my-5" />
        </div>
        <h3 className="px-4 pb-3 text-xl font-bold leading-none">
          Don't Share with
        </h3>
        <Input placeholder="These people or lists" />
        <p className="mt-2 text-xs leading-4 text-muted-foreground">
          Anyone you include here or have on your restricted list won't be able
          to see this post unless you tag them. We don't let people know when
          you choose to not share something with them.
        </p>
      </div>
      <DialogFooter className="px-4 py-3 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary"
          onClick={() => setView(VIEWS.AUDIENCE)}
        >
          Cancel
        </Button>
        <Button className="w-[170px]">Save Change</Button>
      </DialogFooter>
    </>
  )
}
