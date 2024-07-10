import { Separator } from "@/components/ui/separator"

import { HeadOnBack, VIEWS } from "../create-post-form"

export const PostEvent = ({ setView }) => {
  return (
    <>
      <HeadOnBack
        title="Create life event"
        onBack={() => setView(VIEWS.ROOT)}
      />
      <div className="text-center">
        <img
          src="images/life-event.png"
          alt="Life event"
          className="h-[150px] w-[548px] max-w-none object-cover"
        />
        <h3 className="text-xl font-bold leading-6">Life event</h3>
        <p className="mt-1 text-[13px] font-semibold leading-4 text-muted-foreground">
          Share and remember important moments from your life.
        </p>
      </div>
      <div className="mx-4">
        <Separator className="my-10" />
      </div>
      <div className="text-center">
        <h4 className="text-[15px] font-semibold uppercase">
          Select a category
        </h4>
        <div className="grid grid-cols-4"></div>
      </div>
    </>
  )
}
