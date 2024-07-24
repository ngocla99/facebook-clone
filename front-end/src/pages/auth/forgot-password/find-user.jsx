import React from "react"
import { findUserApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { forgotPasswordSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FindUser = ({ goNext }) => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const [errMessage, setErrMessage] = React.useState()

  const findUserMutation = useMutation({
    mutationFn: findUserApi,
    onSuccess: ({ data }) => {
      setErrMessage(null)
      goNext({ ...data })
    },
    onError: (err) => {
      const code = err.response.data.code

      if (code === "USER_NOT_FOUND") {
        setErrMessage({
          title: "No search results",
          subtitle:
            "Your search did not return any results. Please try again with other information.",
        })
      }
    },
  })

  React.useEffect(() => {
    if (!form.formState.errors?.email) return

    setErrMessage({
      title: "Please fill in at least one field",
      subtitle: form.formState.errors.email.message,
    })
  }, [form.formState.errors])

  const onSubmit = (data) => {
    if (findUserMutation.isPending) return
    findUserMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <Card className="w-[500px]">
          <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
            Find Your Account
          </CardHeader>
          <CardContent className="grid gap-4 border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
            {errMessage && (
              <MessageBox
                title={errMessage.title}
                subtitle={errMessage.subtitle}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="mb-4 text-lg leading-[20px]">
                    Please enter your email address or mobile number to search
                    for your account.
                  </FormDescription>
                  <FormControl>
                    <Input
                      className="color-[#1d2129] border-[#dddfe2]"
                      placeholder="Email address or phone number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-4">
            <Button
              type="button"
              variant="secondary"
              className="px-5 font-bold"
            >
              Cancel
            </Button>
            <Button className="px-5 font-bold">Search</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

const MessageBox = ({ title, subtitle, className }) => {
  return (
    <div3
      className={cn(
        "overflow-hidden border border-[#dd3c10] bg-[#ffebe8] p-3",
        className
      )}
    >
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{subtitle}</p>
    </div3>
  )
}
