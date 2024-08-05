import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { profileBioSchema } from "@/lib/validations/profile"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { LoadingDots } from "@/components/loading/loading-dots"

export const HighSchoolForm = ({ className }) => {
  const [showForm, setShowForm] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {
      bio: "",
    },
  })

  const onSubmit = () => {}

  if (!showForm) {
    return (
      <button
        className="group flex h-9 cursor-pointer items-center gap-3"
        onClick={() => setShowForm(true)}
      >
        <i className="rounded_plus_icon_24 filter-accent"></i>
        <p className="font-medium text-primary group-hover:underline group-hover:underline-offset-2">
          Add high school
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
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  variant="secondary"
                  placeholder="Describe who you are"
                  className="h-[78px] text-center"
                  autoFocus
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <Button variant="secondary" className="gap-1.5">
            <img
              src="/icons/12x12/public.png"
              alt=""
              className="filter-secondary-icon"
            />
            Public
          </Button>
          <div className="flex gap-1">
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
              disabled={!form.formState.isDirty || !form.formState.isValid}
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
