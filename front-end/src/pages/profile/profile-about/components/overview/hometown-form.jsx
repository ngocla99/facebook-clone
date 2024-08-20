import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { hometownSchema } from "@/lib/validations/about"
import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { confirm } from "@/components/confirm"
import { LoadingDot } from "@/components/loading/loading-dot"
import { Dots } from "@/assets/svg"

import { FormInput } from "../form-input"
import { PrivacyModal } from "../privacy-modal"

const initHometown = {
  name: "",
  privacy: "EVERYONE",
}

export const HometownForm = ({ className }) => {
  const queryClient = useQueryClient()
  const { username } = useParams()
  const { data: user } = useProfile(username)
  const [showForm, setShowForm] = React.useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false)
  const hometown = user.details?.hometown

  const form = useForm({
    resolver: zodResolver(hometownSchema),
    defaultValues: initHometown,
  })
  const privacy = form.watch("privacy")

  React.useEffect(() => {
    if (!hometown) return form.reset(initHometown)
    form.reset(hometown)
  }, [showForm])

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      form.reset()
      setShowForm(false)
    },
  })

  const onSubmit = (data) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({
      "details.hometown": data,
    })
  }

  const handleDeleteHometown = () => {
    confirm({
      title: "Are you sure?",
      description:
        "Are you sure you want to remove this hometown from your profile?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => {
        if (updateProfileMutation.isPending) return
        updateProfileMutation.mutate({ "details.hometown": null })
      },
    })
  }

  const handleChangePrivacy = (privacy) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({ "details.hometown.privacy": privacy })
  }

  if (!showForm && hometown) {
    return (
      <div className="flex items-center justify-center gap-3">
        <img
          src="/icons/profile/mark.png"
          alt="Work place"
          className="filter-secondary-icon"
        />
        <div className="flex-1">
          <p className="">
            From <strong className="font-semibold">{hometown.name}</strong>
          </p>
        </div>

        {updateProfileMutation.isPending ? (
          <LoadingDot className="mx-[10px]" />
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPrivacyModal(true)}
          >
            {hometown.privacy === "EVERYONE" && (
              <img
                src="/icons/16x16/public.png"
                alt="Public"
                className="filter-secondary-icon"
              />
            )}
            {hometown.privacy === "FRIENDS" && (
              <img
                src="/icons/16x16/friends.png"
                alt="Friends"
                className="filter-secondary-icon"
              />
            )}
            {hometown.privacy === "SELF" && (
              <img
                src="/icons/16x16/private.png"
                alt="Only me"
                className="filter-secondary-icon"
              />
            )}
          </Button>
        )}
        <PrivacyModal
          privacyModal={{
            data: hometown.privacy,
            isOpen: showPrivacyModal,
            onClose: () => setShowPrivacyModal(false),
          }}
          onSave={handleChangePrivacy}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-9 text-muted-foreground"
            >
              <Dots />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="grid p-2 shadow-2xl drop-shadow"
          >
            <Button
              className="justify-start gap-3 px-2"
              variant="ghost"
              onClick={() => setShowForm(true)}
            >
              <i className="edit_outline_icon_20"></i>
              Edit hometown
            </Button>
            <Button
              className="justify-start gap-3 px-2"
              variant="ghost"
              onClick={handleDeleteHometown}
            >
              <i className="trash_icon_20"></i>
              Delete hometown
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  if (!showForm) {
    return (
      <button
        className="group flex h-9 cursor-pointer items-center gap-3"
        onClick={() => setShowForm(true)}
      >
        <i className="rounded_plus_icon_24 filter-accent"></i>
        <p className="font-medium text-primary group-hover:underline group-hover:underline-offset-2">
          Add hometown
        </p>
      </button>
    )
  }

  return (
    <Form {...form}>
      <form
        className={cn("relative grid", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          control={form.control}
          name="name"
          label="Hometown"
          disabled={updateProfileMutation.isPending}
        />
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            className="gap-1.5"
            onClick={() => setShowPrivacyModal(true)}
          >
            {privacy === "EVERYONE" && (
              <>
                <img
                  src="/icons/12x12/public.png"
                  alt="Public"
                  className="filter-secondary-icon"
                />
                Public
              </>
            )}
            {privacy === "FRIENDS" && (
              <>
                <img
                  src="/icons/12x12/friends.png"
                  alt="Friends"
                  className="filter-secondary-icon"
                />
                Friends
              </>
            )}
            {privacy === "SELF" && (
              <>
                <img
                  src="/icons/12x12/private.png"
                  alt="Only me"
                  className="filter-secondary-icon"
                />
                Only me
              </>
            )}
          </Button>
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <PrivacyModal
                privacyModal={{
                  isOpen: showPrivacyModal,
                  data: field.value,
                  onClose: () => setShowPrivacyModal(false),
                }}
                onSave={field.onChange}
              />
            )}
          />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowForm(false)
                form.reset()
              }}
              disabled={updateProfileMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              disabled={!form.formState.isDirty || !form.formState.isValid}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
