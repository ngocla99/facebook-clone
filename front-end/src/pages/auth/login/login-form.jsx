import React from "react"
import { logInApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { loginSchema } from "@/lib/validations/auth"
import { useAuth } from "@/providers/auth-provider"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/button/loading-button"
import { PasswordInput } from "@/components/input/password-input"

export const LoginForm = () => {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [errorRes, setErrorRes] = React.useState()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const logInMutation = useMutation({
    mutationFn: logInApi,
    onSuccess: ({ data }) => {
      setToken(data.token)
      navigate("/")
    },
    onError: (err) => {
      console.log("🚀 ~ SignInForm ~ err:", err)
      setErrorRes(err.response.data.message)
    },
  })

  const onSubmit = (data) => {
    if (logInMutation.isPending) return
    logInMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        {errorRes && (
          <div className="mt-3 overflow-hidden border border-[#dd3c10] bg-[#ffebe8] px-[3px] py-[7px] text-center">
            <p className="text-sm">{errorRes}</p>
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="color-[#1d2129] border-[#dddfe2]"
                  placeholder="Email address or phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  className="border-[#dddfe2]"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          size="lg"
          className="text-xl font-bold"
          loading={logInMutation.isPending}
        >
          Log in
          <span className="sr-only">Log in</span>
        </LoadingButton>
      </form>
    </Form>
  )
}
