import React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const AddToMobile = ({ className }) => {
  const [addPhotoToMobile, setAddPhotoToMobile] = React.useState(false)
  return (
    <div
      className={cn("bg-card-flat flex items-center rounded-lg p-2", className)}
    >
      <div className={cn("absolute", !addPhotoToMobile && "hidden")}>
        <img
          src="gif/loading.gif"
          alt=""
          draggable="false"
          className="size-12"
        />
      </div>
      <div
        className={cn(
          "mx-1 grid size-10 place-items-center rounded-full bg-background-secondary",
          addPhotoToMobile && "bg-primary"
        )}
      >
        <i className={cn("phone_icon", addPhotoToMobile && "invert")}></i>
      </div>
      <div className="flex-1 text-left">
        <p className="p-1 text-[13px]">
          {!addPhotoToMobile
            ? "Add photos and videos from your mobile device."
            : "Tap the notification on your mobile device to add photos and videos."}
        </p>
      </div>
      {!addPhotoToMobile ? (
        <Button
          variant="secondary"
          className="mx-1"
          onClick={() => setAddPhotoToMobile(true)}
        >
          Add
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="mx-1"
          onClick={() => setAddPhotoToMobile(false)}
        >
          Cancel
        </Button>
      )}
    </div>
  )
}
