import React from "react"
import { useMe } from "@/hooks"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

export const IntroDetailModal = () => {
  const { data: me } = useMe()
  const [showIntroDetailModal, setShowIntroDetailModal] = React.useState(false)
  const { workplace, currentCity, hometown } = me.details

  return (
    <>
      <Button variant="secondary" onClick={() => setShowIntroDetailModal(true)}>
        Edit details
      </Button>
      <Modal
        className="w-auto p-0 sm:w-[700px]"
        showModal={showIntroDetailModal}
        onClose={() => setShowIntroDetailModal(false)}
      >
        <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border">
          <DialogTitle>Edit details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[676px] px-7 py-5">
          <p className="text-muted-foreground">
            Details you select will be{" "}
            <strong className="font-semibold">Public</strong> and appear at the
            top of your profile.
          </p>
          <div className="mt-[30px] grid gap-5">
            <h3 className="text-lg font-semibold leading-none">Pronouns</h3>
            <IntroLink to="" title="Add pronouns" />
          </div>
          <div className="mt-[30px] grid gap-5">
            <h3 className="text-lg font-semibold leading-none">Work</h3>
            {workplace ? (
              workplace.map((itm, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Switch id={`workplace-${idx}`} />
                  <Label
                    htmlFor={`workplace-${idx}`}
                    className="text-base font-normal"
                  >
                    {!itm.isCurrent && itm.position && "Former "}
                    {itm.position ||
                      (itm.isCurrent ? "Works" : "Worked")} at {itm.company}
                  </Label>
                  <Link to="" className="ml-auto grid place-content-center">
                    <i className="edit_icon_20 filter-primary-icon"></i>
                  </Link>
                </div>
              ))
            ) : (
              <IntroLink to="" title="Add current city" />
            )}
            <IntroLink to="" title="Add a workplace" />
          </div>
          <div className="mt-[30px] grid gap-5">
            <h3 className="text-lg font-semibold leading-none">Education</h3>
            <IntroLink to="" title="Add high school" />
            <IntroLink to="" title="Add college" />
          </div>
          <div className="mt-[30px] grid gap-5">
            <h3 className="text-lg font-semibold leading-none">Current city</h3>
            {currentCity ? (
              <div className="flex items-center gap-3">
                <Switch id="currentCity" />
                <Label htmlFor="currentCity" className="text-base font-normal">
                  Lives in {currentCity.name}
                </Label>
                <Link to="" className="ml-auto grid place-content-center">
                  <i className="edit_icon_20 filter-primary-icon"></i>
                </Link>
              </div>
            ) : (
              <IntroLink to="" title="Add current city" />
            )}
          </div>
          <div className="mt-[30px] grid gap-5">
            <h3 className="text-lg font-semibold leading-none">Hometown</h3>
            {hometown ? (
              <div className="flex items-center gap-3">
                <Switch id="hometown" />
                <Label htmlFor="hometown" className="text-base font-normal">
                  From {hometown.name}
                </Label>
                <Link to="" className="ml-auto">
                  <i className="edit_icon_20 filter-primary-icon grid place-content-center"></i>
                </Link>
              </div>
            ) : (
              <IntroLink to="" title="Add hometown" />
            )}
          </div>
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Relationship
          </h3>
          <IntroLink to="" title="Add a relationship status" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Joined Facebook
          </h3>
          <div className="mt-5 flex items-center gap-3">
            <Switch />
            <p className="">Joined September 2023</p>
          </div>
        </ScrollArea>
        <DialogFooter className="border-t border-border p-4">
          <div className="flex w-full justify-between">
            <Button variant="deemphasized" className="bg-transparent">
              Update Your Information
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowIntroDetailModal(false)}
              >
                Cancel
              </Button>
              <Button className="w-[112px]">Save</Button>
            </div>
          </div>
        </DialogFooter>
      </Modal>
    </>
  )
}

const IntroLink = ({ to, title, className }) => {
  return (
    <div className={cn("group flex items-center gap-3", className)}>
      <i className="rounded_plus_icon filter-accent"></i>
      <Link
        to={to}
        className="text-primary group-hover:underline group-hover:underline-offset-2"
      >
        {title}
      </Link>
    </div>
  )
}
