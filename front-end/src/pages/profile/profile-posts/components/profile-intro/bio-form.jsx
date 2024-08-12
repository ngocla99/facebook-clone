import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { profileBioSchema } from "@/lib/validations/profile"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { LoadingDots } from "@/components/loading/loading-dots"

export const BioForm = ({ bio, className }) => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {
      bio: "",
    },
  })

  React.useEffect(() => {
    if (!bio) return
    form.reset({ bio })
  }, [bio])

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      setShowForm(false)
    },
  })

  const onSubmit = (data) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({ "details.bio": data.bio })
  }

  if (!showForm && !bio) {
    return (
      <Button variant="secondary" onClick={() => setShowForm(true)}>
        Add bio
      </Button>
    )
  }

  if (!showForm && bio) {
    return (
      <div className="grid gap-4">
        <p className="text-center leading-none">{bio}</p>
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          Edit bio
        </Button>
      </div>
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
        <p className="ml-auto pb-2 pt-1 text-sm leading-none text-muted-foreground">
          {101 - form.watch("bio").length} characters remaining
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <i className="public_icon"></i>
            Public
          </div>
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
        {updateProfileMutation.isPending && (
          <LoadingDots className="absolute inset-0 flex items-center justify-center bg-background opacity-80" />
        )}
      </form>
    </Form>
  )
}
