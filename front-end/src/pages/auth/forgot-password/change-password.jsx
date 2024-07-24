import React from "react"
import { changePasswordApi, logInApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { changePasswordSchema } from "@/lib/validations/auth"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/input/password-input"

export const ChangePassword = ({ data, goBack, goNext }) => {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  })

  const [errMessage, setErrMessage] = React.useState()

  const logInMutation = useMutation({
    mutationFn: logInApi,
    onSuccess: ({ data }) => {
      setToken(data.token)
      navigate("/password/change/reason")
    },
    onError: (err) => {},
  })

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      logInMutation.mutate({
        email: data.email,
        password: form.getValues("password"),
      })
    },
    onError: (err) => {},
  })

  React.useEffect(() => {
    setErrMessage(form.formState.errors?.password?.message ?? "")
  }, [form.formState.errors?.password?.message])

  const onSubmit = ({ password }) => {
    if (changePasswordMutation.isPending) return
    changePasswordMutation.mutate({ email: data.email, password })
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <Card className="w-[500px]">
          <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
            Choose a new password
          </CardHeader>
          <CardContent className="grid gap-4 border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="mb-5 text-lg leading-[20px]">
                    Create a new password that is at least 6 characters long. A
                    strong password has a combination of letters, digits and
                    punctuation marks.
                  </FormDescription>
                  <div className="grid grid-cols-[1fr_44px] gap-2">
                    <FormControl>
                      <PasswordInput
                        className="color-[#1d2129] flex-1 border-[#dddfe2]"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <RulePassword />
                  </div>
                </FormItem>
              )}
            />
            {errMessage === "short" && (
              <p className="font-bold text-[orange]">Too short</p>
            )}
            {errMessage === "weak" && (
              <p className="text-muted-foreground">
                Password strength:{" "}
                <span className="font-bold text-[gray]">Weak</span>
              </p>
            )}
            {errMessage === "medium" && (
              <p className="text-muted-foreground">
                Password strength:{" "}
                <span className="font-bold text-[#00f]">Medium</span>
              </p>
            )}
            {errMessage === "" && form.getValues("password") && (
              <p className="text-muted-foreground">
                Password strength:{" "}
                <span className="font-bold text-[green]">Strong</span>
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-4">
            <Button
              type="button"
              variant="secondary"
              className="w-[90px] px-5 font-bold"
              onClick={() => navigate("/")}
            >
              Skip
            </Button>
            <Button className="px-5 font-bold">Continue</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

const RulePassword = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="h-auto text-lg font-bold"
        >
          ?
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-0 font-auth">
        <DialogHeader className="border-b border-border px-4 py-[18px]">
          <DialogTitle className="text-center text-xl font-normal">
            Create a strong password
          </DialogTitle>
        </DialogHeader>
        <div className="mb-4 px-4 py-3">
          <p className="leading-5">
            As you create your password, remember the following:
            <br />
            It <strong>should not</strong> contain your name.
            <br />
            It <strong>should not</strong> contain a common dictionary word.
            <br />
            It <strong>should</strong> contain one or more numbers.
            <br />
            It <strong>should</strong> have both uppercase and lowercase
            characters.
            <br />
            It <strong>should</strong> be at least six characters long.
          </p>
        </div>
        <DialogFooter className="px-4 pb-3">
          <DialogClose asChild>
            <Button className="w-[102px] font-bold">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
