import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { cn, convertNullStrings } from "@/lib/utils"
import { workPlaceSchema } from "@/lib/validations/about"
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

import { FormCheckbox } from "../form-checkbox"
import { FormInput } from "../form-input"
import { FormSelect } from "../form-select"
import { FormTextarea } from "../form-textarea"
import { PrivacyModal } from "../privacy-modal"

const yearOptions = Array.from(
  new Array(26),
  (val, index) => new Date().getFullYear() - index
)

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function getDays(year, month) {
  return new Date(year, month, 0).getDate()
}

const initWorkplace = {
  company: "",
  position: "",
  city: "",
  startDate: null,
  endDate: null,
  description: "",
  isCurrent: true,
  privacy: "EVERYONE",
}

export const WorkplaceForm = ({ className }) => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = React.useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false)
  const { username } = useParams()
  const { data: user } = useProfile(username)
  const workplace = user.details?.workplace?.[0]

  const form = useForm({
    resolver: zodResolver(workPlaceSchema),
    defaultValues: initWorkplace,
  })
  const privacy = form.watch("privacy")

  React.useEffect(() => {
    if (!workplace) return form.reset(initWorkplace)
    form.reset(workplace)
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

  React.useEffect(() => {
    setDatesValue("startDate")
  }, [form.getValues("startDate.year"), form.getValues("startDate.month")])

  React.useEffect(() => {
    setDatesValue("endDate")
  }, [form.getValues("endDate.year"), form.getValues("endDate.month")])

  const startDayOptions = React.useMemo(() => {
    return getDaysArray("startDate").map((itm) => ({ value: itm, label: itm }))
  }, [form.getValues("startDate.year"), form.getValues("startDate.month")])

  const endDayOptions = React.useMemo(() => {
    return getDaysArray("endDate").map((itm) => ({ value: itm, label: itm }))
  }, [form.getValues("endDate.year"), form.getValues("endDate.month")])

  function getDaysArray(field) {
    const year = form.getValues(`${field}.year`)
    const month = form.getValues(`${field}.month`)

    if (!year || !month || year === "null" || month === "null") {
      return []
    }

    return Array.from(
      new Array(getDays(year, month)),
      (val, index) => 1 + index
    )
  }

  const setDatesValue = (field) => {
    if (form.getValues(`${field}.year`) === "null") {
      form.setValue(`${field}.month`, "null")
    }
    if (form.getValues(`${field}.month`) === "null") {
      form.setValue(`${field}.day`, "null")
      // check existence of day in that month
    } else {
      const daysArr = getDaysArray(field)
      if (
        form.getValues(`${field}.day`) &&
        form.getValues(`${field}.day`) !== "null" &&
        !daysArr.includes(+form.getValues(`${field}.day`))
      ) {
        form.setValue(`${field}.day`, daysArr[daysArr.length - 1])
      }
    }
  }

  const onSubmit = (data) => {
    if (updateProfileMutation.isPending) return
    let workplace = { ...data }
    if (data.isCurrent && data.endDate) workplace = { ...data, endDate: null }

    updateProfileMutation.mutate({
      "details.workplace": convertNullStrings(workplace),
    })
  }

  const onError = (error) => {
    if (error.company) {
      return confirm({
        title: "Invalid Employer",
        description: error.company.message,
        confirmText: "OK",
      })
    }

    if (error.timeRange) {
      return confirm({
        title: "Invalid End Date",
        description: error.timeRange.message,
        confirmText: "OK",
      })
    }
  }

  const handleDeleteWorkplace = () => {
    confirm({
      title: "Are you sure?",
      description:
        "Are you sure you want to remove this workplace from your profile?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => {
        if (updateProfileMutation.isPending) return
        updateProfileMutation.mutate({ "details.workplace": [] })
      },
    })
  }

  const handleChangePrivacy = (privacy) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({ "details.workplace.0.privacy": privacy })
  }

  if (!showForm && workplace) {
    return (
      <div className="flex items-center justify-center gap-3 pt-4">
        <img
          src="/icons/category/profile/workplace.png"
          alt="Work place"
          className="filter-secondary-icon self-start pt-1"
        />
        <div className="flex-1 ">
          <p className="">
            {!workplace.isCurrent && workplace.position && "Former "}
            {workplace.position ||
              (workplace.isCurrent ? "Works" : "Worked")}{" "}
            at <strong className="font-semibold">{workplace.company}</strong>
          </p>
          {workplace.startDate.year && (
            <TextDate start={workplace.startDate} end={workplace.endDate} />
          )}
        </div>

        {updateProfileMutation.isPending ? (
          <LoadingDot className="mx-[10px]" />
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPrivacyModal(true)}
          >
            {workplace.privacy === "EVERYONE" && (
              <img
                src="/icons/size/16/public.png"
                alt="Public"
                className="filter-secondary-icon"
              />
            )}
            {workplace.privacy === "FRIENDS" && (
              <img
                src="/icons/size/16/friends.png"
                alt="Friends"
                className="filter-secondary-icon"
              />
            )}
            {workplace.privacy === "SELF" && (
              <img
                src="/icons/size/16/private.png"
                alt="Only me"
                className="filter-secondary-icon"
              />
            )}
          </Button>
        )}
        <PrivacyModal
          privacyModal={{
            data: workplace.privacy,
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
              disabled
            >
              <i className="lifeEvent_2_icon"></i>
              See life event
            </Button>
            <Button
              className="justify-start gap-3 px-2"
              variant="ghost"
              onClick={() => setShowForm(true)}
            >
              <i className="edit_outline_icon_20"></i>
              Edit Workplace
            </Button>
            <Button
              className="justify-start gap-3 px-2"
              variant="ghost"
              onClick={handleDeleteWorkplace}
            >
              <i className="trash_icon_20"></i>
              Delete Workplace
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
          Add a workplace
        </p>
      </button>
    )
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-3", className)}
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <FormInput control={form.control} name="company" label="Company" />
        <FormInput control={form.control} name="position" label="Position" />
        <FormInput control={form.control} name="city" label="City/Town" />
        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
        />

        <p className="font-semibold">Time Period</p>
        <FormCheckbox
          control={form.control}
          name="isCurrent"
          label="I currently work here"
        />

        <div className="flex items-center gap-2">
          {form.watch("isWorkNow") && <p>From</p>}
          <FormSelect
            control={form.control}
            name="startDate.year"
            label="Year"
            options={yearOptions.map((itm) => ({ value: itm, label: itm }))}
          />

          <FormSelect
            control={form.control}
            name="startDate.month"
            label="Month"
            options={monthOptions.map((itm, idx) => ({
              value: idx + 1,
              label: itm,
            }))}
            hidden={
              !form.watch("startDate.year") ||
              form.watch("startDate.year") === "null"
            }
          />
          <FormSelect
            control={form.control}
            name="startDate.day"
            label="Day"
            options={startDayOptions}
            hidden={
              !form.watch("startDate.month") ||
              form.watch("startDate.month") === "null"
            }
          />

          {!form.watch("isCurrent") && (
            <>
              <p>to</p>
              <FormSelect
                control={form.control}
                name="endDate.year"
                label="Year"
                options={yearOptions.map((itm) => ({ value: itm, label: itm }))}
              />

              <FormSelect
                control={form.control}
                name="endDate.month"
                label="Month"
                options={monthOptions.map((itm, idx) => ({
                  value: idx + 1,
                  label: itm,
                }))}
                hidden={
                  !form.watch("endDate.year") ||
                  form.watch("endDate.year") === "null"
                }
              />

              <FormSelect
                control={form.control}
                name="endDate.day"
                label="Day"
                options={endDayOptions}
                hidden={
                  !form.watch("endDate.month") ||
                  form.watch("endDate.month") === "null"
                }
              />
            </>
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            className="gap-1.5"
            onClick={() => setShowPrivacyModal(true)}
          >
            {privacy === "EVERYONE" && (
              <>
                <img
                  src="/icons/size/12/public.png"
                  alt="Public"
                  className="filter-secondary-icon"
                />
                Public
              </>
            )}
            {privacy === "FRIENDS" && (
              <>
                <img
                  src="/icons/size/12/friends.png"
                  alt="Friends"
                  className="filter-secondary-icon"
                />
                Friends
              </>
            )}
            {privacy === "SELF" && (
              <>
                <img
                  src="/icons/size/12/private.png"
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
            >
              Cancel
            </Button>
            <Button disabled={!form.formState.isValid}>Save</Button>
          </div>
        </div>
        {/* {updateProfileMutation.isPending && (
          <LoadingDots className="absolute inset-0 flex items-center justify-center bg-background opacity-80" />
        )} */}
      </form>
    </Form>
  )
}

const TextDate = ({ start, end, className }) => {
  const { year: yearStart, month: monthStart, day: dayStart } = start

  if (end && end?.year) {
    const { year: yearEnd, month: monthEnd, day: dayEnd } = end
    return (
      <p
        className={cn("text-sm leading-none text-muted-foreground", className)}
      >
        {yearStart && !monthStart && !dayStart && `${yearStart}`}
        {yearStart &&
          monthStart &&
          !dayStart &&
          `${monthOptions[monthStart]} ${yearStart}`}
        {yearStart &&
          monthStart &&
          dayStart &&
          `${monthOptions[monthStart]} ${dayStart}, ${yearStart}`}
        {" to "}
        {yearEnd && !monthEnd && !dayEnd && `${yearEnd}`}
        {yearEnd &&
          monthEnd &&
          !dayEnd &&
          `${monthOptions[monthEnd]} ${yearEnd}`}
        {yearEnd &&
          monthEnd &&
          dayEnd &&
          `${monthOptions[monthEnd]} ${dayEnd}, ${yearEnd}`}
      </p>
    )
  }

  return (
    <p className={cn("text-sm leading-none text-muted-foreground", className)}>
      {yearStart && !monthStart && !dayStart && `Starting in ${yearStart}`}
      {yearStart &&
        monthStart &&
        !dayStart &&
        `Starting in ${monthOptions[monthStart]} ${yearStart}`}
      {yearStart &&
        monthStart &&
        dayStart &&
        `Starting on ${monthOptions[monthStart]} ${dayStart}, ${yearStart}`}
    </p>
  )
}
