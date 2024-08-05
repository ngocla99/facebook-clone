import React from "react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"

export const IntroDetailModal = () => {
  const [showIntroDetailModal, setShowIntroDetailModal] = React.useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setShowIntroDetailModal(true)}>
        Edit details
      </Button>
      <Modal
        className="w-auto p-0 drop-shadow sm:w-[700px]"
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
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Pronouns
          </h3>
          <IntroLink to="" title="Add pronouns" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">Work</h3>
          <IntroLink to="" title="Add a workplace" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Education
          </h3>
          <IntroLink to="" title="Add high school" className="mt-5" />
          <IntroLink to="" title="Add college" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Current city
          </h3>
          <IntroLink to="" title="Add current city" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Hometown
          </h3>
          <IntroLink to="" title="Add hometown" className="mt-5" />
          <h3 className="mt-[30px] text-lg font-semibold leading-none">
            Relationship
          </h3>
          <IntroLink to="" title="Add a relationship status" className="mt-5" />
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
