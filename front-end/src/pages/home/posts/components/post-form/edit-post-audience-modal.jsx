import React from "react"
import { updatePostApi } from "@/api/services/post"
import { usePostEditAudienceModal } from "@/stores/use-post-edit-audience-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { audiencePostSchema } from "@/lib/validations/post"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

import { optionsAudience } from "./views/post-audience"

export const EditPostAudienceModal = () => {
  const queryClient = useQueryClient()
  const postEditAudienceModal = usePostEditAudienceModal()

  const form = useForm({
    resolver: zodResolver(audiencePostSchema),
    defaultValues: {
      audience: "EVERYONE",
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      form.reset()
      postEditAudienceModal.onClose()
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  React.useEffect(() => {
    if (!postEditAudienceModal?.post) return
    form.reset(
      {
        audience: postEditAudienceModal.post.audience,
      },
      { keepDefaultValues: true }
    )
  }, [postEditAudienceModal.post])

  const onSubmit = (data) => {
    if (updatePostMutation.isPending) return
    updatePostMutation.mutate({ ...data, id: postEditAudienceModal.post._id })
  }

  return (
    <Modal
      className="w-auto max-w-none overflow-hidden p-0 sm:w-[548px]"
      showModal={postEditAudienceModal.isOpen}
      onClose={() => postEditAudienceModal.onClose()}
      onInteractOutside={(e) => {
        if (updatePostMutation.isPending) e.preventDefault()
      }}
    >
      <DialogHeader className="flex-rows relative items-center space-y-0 border-b border-border px-4 py-3 text-center">
        <DialogTitle className="leading-9">Select audience</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <ScrollArea className="h-[476px]">
                    <RadioGroup
                      defaultValue={form.getValues("audience")}
                      className="gap-0 px-2 pb-2 pt-3"
                      onValueChange={field.onChange}
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
                          <div className="grid flex-1">
                            <p className="text-[17px] font-medium leading-5">
                              {itm.title}
                            </p>
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
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter className="shadow-[0_2px_5px_rgba(0,0,0,0.5)] sm:flex-col sm:space-x-0">
            <div className="flex justify-end gap-3 p-3">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
                onClick={() => postEditAudienceModal.onClose()}
              >
                Cancel
              </Button>
              <Button className="w-[116px]">Done</Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  )
}
