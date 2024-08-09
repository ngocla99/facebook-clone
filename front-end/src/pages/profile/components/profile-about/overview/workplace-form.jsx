import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { workPlaceSchema } from "@/lib/validations/about"
import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
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

export const WorkplaceForm = ({ className }) => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = React.useState(false)
  const { username } = useParams()
  const { data: user } = useProfile(username)

  const form = useForm({
    resolver: zodResolver(workPlaceSchema),
    defaultValues: {
      company: "",
      position: "",
      city: "",
      startDate: null,
      endDate: null,
      description: "",
      isCurrent: true,
      privacy: "EVERYONE",
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
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
    console.log("🚀 ~ onSubmit ~ data:", data)
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({ "details.workplace": data })
  }

  const workplace = user.details.workplace[0]
  console.log("🚀 ~ WorkplaceForm ~ workplace:", workplace)

  if (!showForm && workplace) {
    return (
      <div className="flex items-center justify-center gap-3 pt-4">
        <img
          src="/icons/profile/workplace.png"
          alt="Work place"
          className="filter-secondary-icon self-start pt-1"
        />
        <div className="flex-1 ">
          <p className="">
            {workplace.position} at <strong>{workplace.company}</strong>
          </p>
          <p className="text-sm leading-none text-muted-foreground">
            Starting on {workplace.startDate.day} {workplace.startDate.month},{" "}
            {workplace.startDate.year}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="">
          {workplace.privacy === "EVERYONE" && (
            <img
              src="/icons/16x16/public.png"
              alt="Public"
              className="filter-secondary-icon"
            />
          )}
          {workplace.privacy === "FRIENDS" && (
            <img
              src="/icons/16x16/friends.png"
              alt="Friends"
              className="filter-secondary-icon"
            />
          )}
          {workplace.privacy === "SELF" && (
            <img
              src="/icons/16x16/private.png"
              alt="Only me"
              className="filter-secondary-icon"
            />
          )}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="size-9 text-muted-foreground"
        >
          <Dots />
        </Button>
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
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          console.log(err)
        })}
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
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <PrivacyModal data={field.value} onSave={field.onChange} />
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
            <Button
            // disabled={!form.formState.isDirty || !form.formState.isValid}
            >
              Save
            </Button>
          </div>
        </div>
        {/* {updateProfileMutation.isPending && (
          <LoadingDots className="absolute inset-0 flex items-center justify-center bg-background opacity-80" />
        )} */}
      </form>
    </Form>
  )
}
