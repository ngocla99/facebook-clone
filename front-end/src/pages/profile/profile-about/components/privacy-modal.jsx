import React from "react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { optionsAudience } from "@/components/posts/components/post-form/views/post-audience"

export const PrivacyModal = ({ privacyModal, onSave }) => {
  const [privacy, setPrivacy] = React.useState(privacyModal.data)

  return (
    <Modal
      className="w-auto max-w-none overflow-hidden p-0 sm:w-[548px]"
      showModal={privacyModal.isOpen}
      onClose={privacyModal.onClose}
    >
      <DialogHeader className="flex-rows relative items-center space-y-0 border-b border-border px-4 py-3 text-center">
        <DialogTitle className="leading-9">Select audience</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[476px]">
        <RadioGroup
          defaultValue={privacy}
          className="gap-0 px-2 pb-2 pt-3"
          onValueChange={(value) => setPrivacy(value)}
        >
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
              <div className="grid flex-1 gap-1.5">
                <p className="text-lg font-medium leading-none">{itm.title}</p>
                {itm.description && (
                  <span className="font-normal text-muted-foreground">
                    {itm.description}
                  </span>
                )}
              </div>
              <RadioGroupItem
                value={itm.value}
                id={itm.key}
                disabled={!!itm.disabled}
              />
            </Label>
          ))}
        </RadioGroup>
      </ScrollArea>

      <DialogFooter className="shadow-[0_2px_5px_rgba(0,0,0,0.5)] sm:flex-col sm:space-x-0">
        <div className="flex justify-end gap-3 p-3">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary"
            onClick={privacyModal.onClose}
          >
            Cancel
          </Button>
          <Button
            className="w-[116px]"
            onClick={() => {
              onSave(privacy)
              privacyModal.onClose()
            }}
          >
            Done
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  )
}
