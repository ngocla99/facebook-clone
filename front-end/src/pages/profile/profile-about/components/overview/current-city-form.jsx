import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { currentCitySchema } from "@/lib/validations/about"
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

const initCurrentCity = {
  name: "",
  privacy: "EVERYONE",
}

export const CurrentCityForm = ({ className }) => {
  const queryClient = useQueryClient()
  const { username } = useParams()
  const { data: user } = useProfile(username)
  const [showForm, setShowForm] = React.useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false)
  const currentCity = user.details.currentCity

  const form = useForm({
    resolver: zodResolver(currentCitySchema),
    defaultValues: initCurrentCity,
  })
  const privacy = form.watch("privacy")

  React.useEffect(() => {
    if (!currentCity) return form.reset(initCurrentCity)
    form.reset(currentCity)
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
      "details.currentCity": data,
    })
  }

  const handleDeleteCurrentCity = () => {
    confirm({
      title: "Are you sure?",
      description:
        "Are you sure you want to remove this city from your profile?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => {
        if (updateProfileMutation.isPending) return
        updateProfileMutation.mutate({ "details.currentCity": null })
      },
    })
  }

  const handleChangePrivacy = (privacy) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({ "details.currentCity.privacy": privacy })
  }

  if (!showForm && currentCity) {
    return (
      <div className="flex items-center justify-center gap-3">
        <img
          src="/icons/profile/home.png"
          alt="Work place"
          className="filter-secondary-icon"
        />
        <div className="flex-1">
          <p className="">
            Lives {" "}
            <strong className="font-semibold">{currentCity.name}</strong>
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
            {currentCity.privacy === "EVERYONE" && (
              <img
                src="/icons/16x16/public.png"
                alt="Public"
                className="filter-secondary-icon"
              />
            )}
            {currentCity.privacy === "FRIENDS" && (
              <img
                src="/icons/16x16/friends.png"
                alt="Friends"
                className="filter-secondary-icon"
              />
            )}
            {currentCity.privacy === "SELF" && (
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
            data: currentCity.privacy,
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
              Edit current city
            </Button>
            <Button
              className="justify-start gap-3 px-2"
              variant="ghost"
              onClick={handleDeleteCurrentCity}
            >
              <i className="trash_icon_20"></i>
              Delete current city
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
          Add current city
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
          label="Current City"
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
