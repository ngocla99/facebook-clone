import React from "react"
import { validateResetCodeApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { resetCodeSchema } from "@/lib/validations/auth"
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

export const SecurityCode = ({ data, goBack, goNext }) => {
  const navigate = useNavigate()
  const { email } = data
  const [errMessage, setErrMessage] = React.useState()

  const form = useForm({
    resolver: zodResolver(resetCodeSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      code: "",
    },
  })

  const validateResetCodeMutation = useMutation({
    mutationFn: validateResetCodeApi,
    onSuccess: ({ data }) => {
      setErrMessage(null)
      goNext({ ...data })
    },
    onError: (err) => {
      setErrMessage(err.response.data.message)
    },
  })

  React.useEffect(() => {
    if (!form.formState.errors?.code?.message) return
    setErrMessage(form.formState.errors?.code?.message)
  }, [form.formState.errors?.code?.message])

  const onSubmit = ({ code }) => {
    if (validateResetCodeMutation.isPending) return
    validateResetCodeMutation.mutate({ email, code })
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <Card className="w-[500px]">
          <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
            Enter security code
          </CardHeader>
          <CardContent className="grid gap-4 border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
            {errMessage && <MessageBox message={errMessage} />}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="mb-5 text-[17px] leading-[20px]">
                    Please check your emails for a message with your code. Your
                    code is 6 numbers long.
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-5">
                    <FormControl>
                      <Input
                        className="color-[#1d2129] border-[#dddfe2]"
                        placeholder="Enter code"
                        {...field}
                      />
                    </FormControl>
                    <div className="space-y-[10px]">
                      <p className="text-[15px] leading-5">
                        We sent your code to:
                      </p>
                      <p className="text-[13px] leading-4">{email}</p>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-4">
            <a
              className="mr-auto cursor-pointer text-[13px] text-[#1877f2] hover:underline hover:underline-offset-1"
              onClick={goBack}
            >
              Didn't get a code?
            </a>
            <Button
              type="button"
              variant="secondary"
              className="px-5 text-[15px] font-bold"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button className="px-5 text-[15px] font-bold">Continue</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

const MessageBox = ({ message, className }) => {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[3px] border border-[#fa3e3e]",
        className
      )}
    >
      <div className="flex min-w-[42px] items-start justify-center bg-[#fa3e3e] pt-[9px]">
        <img src="icons/warning.png" alt="Warning" width="20" height="20" />
      </div>
      <div className="px-[10px] py-[9px]">
        <p className="text-sm leading-[18px]">{message}</p>
      </div>
    </div>
  )
}
