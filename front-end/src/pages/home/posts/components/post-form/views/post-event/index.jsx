import React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { HeadOnBack, VIEWS } from "../../post-form"

export const PostEvent = ({ setView }) => {
  const events = React.useMemo(() => {
    return [
      {
        title: "Work",
        icon: "icons/category-events/work.png",
        onClick: () => {},
      },
      {
        title: "Education",
        icon: "icons/category-events/education.png",
        onClick: () => {},
      },
      {
        title: "Relationship",
        icon: "icons/category-events/relationship.png",
        onClick: () => {},
      },
      {
        title: "Home & Living",
        icon: "icons/category-events/home.png",
        onClick: () => {},
      },
      {
        title: "Family",
        icon: "icons/category-events/family.png",
        onClick: () => {},
      },
      {
        title: "Travel",
        icon: "icons/category-events/travel.png",
        onClick: () => {},
      },
      {
        title: "Interests & Activities",
        icon: "icons/category-events/interest.png",
        onClick: () => {},
      },
      {
        title: "Health & Wellness",
        icon: "icons/category-events/health.png",
        onClick: () => {},
      },
      {
        title: "Milestones & Achievements",
        icon: "icons/category-events/milestone.png",
        onClick: () => {},
      },
      {
        title: "Remembrance",
        icon: "icons/category-events/remembrance.png",
        onClick: () => {},
      },
      {
        title: "Create Your Own",
        icon: "icons/category-events/flag.png",
        onClick: () => {},
      },
    ]
  }, [])

  return (
    <>
      <HeadOnBack
        title="Create life event"
        onBack={() => setView(VIEWS.ROOT)}
      />
      <div className="mt-4 text-center">
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
        <div className="grid grid-cols-4 px-2 py-4">
          {events.map((itm) => (
            <Button
              variant="ghost"
              className="size-[114px] flex-col gap-2 rounded-sm p-2 whitespace-normal"
              onClick={itm.onClick}
            >
              <img src={itm.icon} alt={itm.title} />
              <p className="text-[13px] font-normal leading-4">{itm.title}</p>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
